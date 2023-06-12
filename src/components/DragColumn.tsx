import { FC, memo, useMemo } from "react";
import { Task, Column } from "../initialData";
import { styled } from "styled-components";
import DragTask from "./DragTask";
import { Droppable, Draggable } from "react-beautiful-dnd";
import AddTask from "./AddTask";

const DragColumn: FC<DragColumnProps> = ({ column, tasks, index }) => {
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <Container
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <Title>{column.title}</Title>
          <Droppable droppableId={column.id} type="task">
            {(provided, snapshot) => (
              <TaskList
                ref={provided.innerRef}
                {...provided.droppableProps}
                $isDraggingOver={snapshot.isDraggingOver}
              >
                <InnerList tasks={tasks} />
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
          <AddTask column={column}>+</AddTask>
        </Container>
      )}
    </Draggable>
  );
};

const InnerList: FC<{ tasks: Task[] }> = memo(({ tasks }) => {
  
  const mappedTasks = useMemo(() => {
    return (
      tasks.map((task, index) => {
        return <DragTask key={task.id} task={task} index={index} />
      })
    )
  }, [tasks])
  
  return (
    <>{mappedTasks}</>
  )

});


export default DragColumn;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  flex: 1 1 00px;
  align-content: center;
  justify-content: space-between;
  background-color: grey;
  margin: 1rem;
  border: 1px solid black;
  width: fit-content;
  padding: 1rem;
`;
const Title = styled.h3`
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  padding: 1rem 2rem;
  width: 100%;

`;
const TaskList = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;
  flex-direction: column;
  justify-content: start;
  align-content: center;
  text-align: start;
  background-color: ${(props) => (props.$isDraggingOver ? "green" : "inherit")};
  transition: background-color 0.2s ease-in-out;
  min-height: 200px;
`;

type DragColumnProps = {
  column: Column;
  tasks: Task[];
  index: number;
};
