//Libraries
import { FC, memo, useEffect, useMemo, useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { styled } from "styled-components";
//Components
import DragTask from "./DragTask";
import AddTask from "./AddTask";
//Types
import { Task, Column } from "../app/feature/dnd/kanbanSlice";

const DragColumn: FC<DragColumnProps> = ({ column, tasks, index }) => {
  const [taskCount, setTaskCount] = useState<number>(0);
  useEffect(() => {
    setTaskCount(() => {
      return column.taskIds.length;
    });
  }, [column]);

  return (
    //temporary disabled drag feature for columns. Change isDragDisable prop to false
    <Draggable draggableId={column.id} index={index} isDragDisabled={true}>
      {(provided) => (
        <Container
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <Title>
            {column.title}
            <span> | {taskCount}</span>
          </Title>
          <Droppable droppableId={column.id} type="task">
            {(provided, snapshot) => (
              <TaskList
                ref={provided.innerRef}
                {...provided.droppableProps}
                $isDraggingOver={snapshot.isDraggingOver}
              >
                <InnerList tasks={tasks} column={column} />
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

export default DragColumn;

const InnerList: FC<{ tasks: Task[]; column: Column }> = memo(
  ({ tasks, column }) => {
    const mappedTasks = useMemo(() => {
      return tasks.map((task, index) => {
        return (
          <DragTask
            key={task.id}
            task={task}
            index={index}
            columnId={column.id}
            columnTitle={column.title}
          />
        );
      });
    }, [tasks]);

    return <>{mappedTasks}</>;
  }
);

type DragColumnProps = {
  column: Column;
  tasks: Task[];
  index: number;
};

type TaskListProps = {
  $isDraggingOver: boolean
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  flex: 1 1 260px;
  align-content: center;
  justify-content: space-between;
  border: 2px solid black;
  width: fit-content;
  padding: 1rem;
  margin: 1rem;
`;

const Title = styled.h3`
  font-size: 24px;
  font-weight: 600;
  text-align: start;
  padding: 1rem 2rem;
  width: 100%;
  border-bottom: 1px solid black;
  margin-bottom: 1rem;
  & span {
    font-weight: 300;
  }
`;

const TaskList = styled.div<TaskListProps>`
  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;
  flex-direction: column;
  justify-content: start;
  align-content: center;
  text-align: start;
  border: ${(props) => (props.$isDraggingOver ? "1px dashed black" : "none")};
  transition: background-color 0.2s ease-in-out;
  min-height: 200px;
`;
