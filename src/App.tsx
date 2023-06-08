import { FC, useState } from "react"
import DragColumn from "./components/DragColumn";
import {initialData} from './initialData';
import {Task, Column, Data} from './initialData'



const App: FC = () => {
  const [data, setData] = useState<Data>(initialData);

  return (
    <>
      {data.columnOrder.map((columnId) => {
        const column = data.columns[columnId];
        const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

        return (
          < DragColumn key={columnId} column={column} tasks={tasks}/>
        );
      })}
    </>
  )
}

export default App;
