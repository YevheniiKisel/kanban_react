import { FC, useState } from "react";
import DragColumn from "./components/DragColumn";
import { initialData } from "./initialData";
import { Data } from "./initialData";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const App: FC = () => {
  const [data, setData] = useState<Data>(initialData);

  //Task of that handler is to put a draggable element into right position inside dropped column's property "tasksIds" in order to implement tasks' sequince change
  function onDragEnd(result: DropResult): void {
    const { draggableId, source, destination } = result;
    console.log(
      `draggableId: ${draggableId}, source: ${source}, destination: ${destination}`
    );
    //Check if destination isn't null or undefined (dropped to nowhere)
    if (!destination) {
      return;
    }

    //Check if droppable element didn't set to a previous position inside the same column
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    //Get a droppable column object for mutation without direct state change
    const column = data.columns[source.droppableId];
    const newTasksIds = Array.from(column.taskIds);

    //Swich place of dragged element, and update column obejct
    newTasksIds.splice(source.index, 1);
    newTasksIds.splice(destination.index, 0, draggableId);
    const newColumn = {
      ...column,
      taskIds: newTasksIds,
    };

    //Update state
    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [newColumn.id]: newColumn,
      },
    };

    setData(newState);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {data.columnOrder.map((columnId) => {
        const column = data.columns[columnId];
        const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

        return <DragColumn key={columnId} column={column} tasks={tasks} />;
      })}
    </DragDropContext>
  );
};

export default App;
