import { FC, memo, useMemo } from "react";
import DragColumn from "./components/DragColumn";
import { Column, Task } from "./app/feature/dnd/kanbanSlice";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { onDragEnd } from "./app/feature/dnd/kanbanSlice";

const App: FC = () => {
  const dispatch = useAppDispatch();
  const {columnOrder, columns, tasks} = useAppSelector((state) => state.kanban);

  function handleDragEnd(result: DropResult):void{
    dispatch(onDragEnd(result));
  }

  return (
    <Wrapper>
    <Title>Kanban canvas</Title>
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided) => (
          <Container {...provided.droppableProps} ref={provided.innerRef}>
            {columnOrder.map((columnId, index) => {
              const column = columns[columnId];
              return (
                <InnerList
                  key={columnId}
                  column={column}
                  tasksMap={tasks}
                  index={index}
                />
              );
            })}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
    </Wrapper>
  );
};

export default App;

const InnerList: FC<InnerListProps> = memo(({ column, tasksMap, index }) => {
  const mappedColumns = useMemo(() => {
    const tasks: Task[] = column.taskIds.map((taskId) => tasksMap[taskId]);
    return <DragColumn key={column.id} column={column} tasks={tasks} index={index} />;
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
  flex-wrap: nowrap;
  flex: 1 1 260px;
  justify-content: center;
  padding-left: 100px;
  padding-right: 100px;
`;

const Title = styled.h1`
  color: #000;
font-size: 4.5rem;
font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
font-style: normal;
font-weight: 400;
line-height: normal;
padding: 1rem 0;
text-align: center;

`

const Wrapper = styled.div`
  min-height: 100vh;
  height: auto;
  width: 100%;
  background: linear-gradient(180deg, #6DA9FF 61.10%, rgba(77, 150, 255, 0.91) 100%);
  scroll-behavior: smooth;
  
  `
  