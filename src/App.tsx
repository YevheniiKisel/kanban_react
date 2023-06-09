import { FC, useState } from "react"
import DragColumn from "./components/DragColumn";
import {initialData} from './initialData';
import { Data} from './initialData'
import {DragDropContext, DropResult, OnDragEndResponder} from 'react-beautiful-dnd'




const App: FC = () => {
  const [data, setData] = useState<Data>(initialData);

  function onDragEnd(result: DropResult):void {

  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {data.columnOrder.map((columnId) => {
        const column = data.columns[columnId];
        const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

        return (
          < DragColumn key={columnId} column={column} tasks={tasks}/>
        );
      })}
    </DragDropContext>
  )
}

export default App;
