import { FC } from 'react'
import {Task, Column} from '../initialData'
import {styled} from "styled-components"
import DragTask from './Task';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
  justify-content: space-between;
  background-color: aliceblue;
  margin: 1rem;
  border: 1px solid black;
  width: fit-content;
`;
const Title = styled.h3`
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  margin: 1rem 2rem;
`;
const TaskList = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-around;
  align-content: center;
  text-align: start;
`;


type DragColumnProps = {
  column: Column,
  tasks: Task[]
}


const DragColumn: FC<DragColumnProps> = ({column, tasks}) => {
  return (
    <Container>
      <Title>{column.title}</Title>
      <TaskList>
        {tasks.map((task) => {
          return (
            <DragTask key={task.id} content={task.content}  />
          )
        })}
      </TaskList>
    </Container>
  )
}

export default DragColumn
