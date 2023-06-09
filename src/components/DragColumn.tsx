import { FC } from "react";
import { Task, Column } from "../initialData";
import { styled } from "styled-components";
import DragTask from "./Task";
import { Droppable } from "react-beautiful-dnd";

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
  padding: 1rem;
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
  justify-content: space-between;
  align-content: center;
  text-align: start;
`;

type DragColumnProps = {
  column: Column;
  tasks: Task[];
};

const DragColumn: FC<DragColumnProps> = ({ column, tasks }) => {
  return (
    <Container>
      <Title>{column.title}</Title>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <TaskList ref={provided.innerRef} {...provided.droppableProps}>
            {tasks.map((task, index) => {
              return (
                <DragTask
                  key={task.id}
                  task = {task}
                  index={index}
                />
              );
            })}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </Container>
  );
};

export default DragColumn;
