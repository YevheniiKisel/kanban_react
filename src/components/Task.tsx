import { FC } from "react";
import { styled } from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { Task } from "../initialData";

const DragTask: FC<TaskProps> = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Container
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          $isDragging={snapshot.isDragging}
        >
          {task.content}
        </Container>
      )}
    </Draggable>
  );
};

export default DragTask;


const Container = styled.div`
  padding: 1rem 2rem;
  margin-bottom: 1rem;
  border: 1px solid black;
  background-color: ${(props) => (props.$isDragging ? "skyblue" : "wheat")};
  transition: background-color 0.1s ease;
  &:last-child {
    margin-bottom: 0;
  }
`;

type TaskProps = {
  task: Task;
  index: number;
};
