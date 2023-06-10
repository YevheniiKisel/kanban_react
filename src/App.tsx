import { FC, memo, useMemo, useState } from "react";
import DragColumn from "./components/DragColumn";
import { Column, initialData, Task } from "./initialData";
import { Data } from "./initialData";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const App: FC = () => {
  const [data, setData] = useState<Data>(initialData);

  //Task of that handler is to put a draggable element into right position inside dropped column's property "tasksIds" in order to implement tasks' sequince change
  function onDragEnd(result: DropResult): void {
    const { draggableId, source, destination, type } = result;

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

    //If user dragging columns
    if (type === "column") {
      //Get a columnOrder array from state without direct manipulation on state
      const newColumnArray = Array.from(data.columnOrder);
      //Delete element from it's start position
      newColumnArray.splice(source.index, 1);
      //Paste element at it's end position
      newColumnArray.splice(destination.index, 0, draggableId);

      //Cast a new updated state
      const newState = {
        ...data,
        columnOrder: newColumnArray,
      };

      //Update a state
      setData(newState);
    } else if (type === "task") {
      //Get a start column and finish column objects for manipulation without direct state change
      const columnStart = data.columns[source.droppableId];
      const columnFinish = data.columns[destination.droppableId];

      //If DND has accureed in the same column ->
      if (columnStart === columnFinish) {
        const newTasksIds = Array.from(columnFinish.taskIds);

        //Swich place of dragged element, and update column obejct
        newTasksIds.splice(source.index, 1);
        newTasksIds.splice(destination.index, 0, draggableId);
        const newColumn = {
          ...columnFinish,
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
        return;
      } else {
        const columnStartTasksIds = Array.from(columnStart.taskIds);
        const columnFinishTasksIds = Array.from(columnFinish.taskIds);

        //Get dragged element from start column object and move it inside finish column object
        columnStartTasksIds.splice(source.index, 1);
        columnFinishTasksIds.splice(destination.index, 0, draggableId);

        //Generate a new objects to update startColumn and finishColumn
        const newColumnStart = {
          ...columnStart,
          taskIds: columnStartTasksIds,
        };
        const newColumnFinish = {
          ...columnFinish,
          taskIds: columnFinishTasksIds,
        };

        //Construct an object for state update
        const newState = {
          ...data,
          columns: {
            ...data.columns,
            [newColumnStart.id]: newColumnStart,
            [newColumnFinish.id]: newColumnFinish,
          },
        };

        //Update state
        setData(newState);
        return;
      }
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided) => (
          <Container {...provided.droppableProps} ref={provided.innerRef}>
            {data.columnOrder.map((columnId, index) => {
              const column = data.columns[columnId];

              return (
                <InnerList
                  key={columnId}
                  column={column}
                  tasksMap={data.tasks}
                  index={index}
                />
              );
            })}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default App;

const InnerList: FC<InnerListProps> = memo(({ column, tasksMap, index }) => {
  const mappedColumns = useMemo(() => {
    const tasks: Task[] = column.taskIds.map((taskId) => tasksMap[taskId]);
    return <DragColumn column={column} tasks={tasks} index={index} />;
  }, [column, tasksMap, index]);

  return <>{mappedColumns}</>;
});

interface InnerListProps {
  column: Column;
  tasksMap: Record<string, Task>;
  index: number;
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;
