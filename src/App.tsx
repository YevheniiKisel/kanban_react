import { FC, memo, useMemo } from "react";
import DragColumn from "./components/DragColumn";
import { Column, Task } from "./feature/dnd/kanbanSlice";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { onDragEnd } from "./feature/dnd/kanbanSlice";

const App: FC = () => {
  const dispatch = useAppDispatch();
  const {columnOrder, columns, tasks} = useAppSelector((state) => state.kanban);

  function handleDragEnd(result: DropResult):void{
    dispatch(onDragEnd(result));
  }

  return (
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
  padding-left: 200px;
  padding-right: 200px;
`;
