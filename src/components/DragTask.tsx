import { ChangeEvent, FC, useState } from "react";
import { styled } from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { Task } from "../initialData";
import EditIcon from "../assets/icons/EditIcon";
import DeleteIcon from "../assets/icons/DeleteIcon";
import { useAppDispatch } from "../app/hooks";
import TextArea from "./TextArea";
import { editTask } from "../app/feature/dnd/kanbanSlice";

const DragTask: FC<TaskProps> = ({ task, index }) => {
  const dispatch = useAppDispatch();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newContent, setNewContent] = useState<string>("");

  function handleTaskDescriptionChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setNewContent(e.target.value);
  }

  function handleEditingMode() {
    if (isEditing) {
    }

    setNewContent(task.content);
    setIsEditing(true);
  }

  function handleEditingSubmit(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      dispatch(editTask({ newContent, task}));
      setIsEditing(false);
    } else if (e.key === 'Escape'){
      e.preventDefault();
      setIsEditing(false);
    }
  }

  return (
    <Draggable isDragDisabled={isEditing} draggableId={task.id} index={index}>
      {(provided, snapshot) =>
        isEditing ? (
          <Container
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            $isDragging={snapshot.isDragging}
          >
            <TextArea
              content={newContent}
              onChange={handleTaskDescriptionChange}
              onSubmit={handleEditingSubmit}
            />
            <ControlButtons>
              <IconButton>
                <EditIcon theme="light" />
              </IconButton>
              <IconButton>
                <DeleteIcon theme="light" />
              </IconButton>
            </ControlButtons>
          </Container>
        ) : (
          <Container
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            $isDragging={snapshot.isDragging}
          >
            <p>{task.content}</p>
            <ControlButtons id="id">
              <IconButton onClick={handleEditingMode}>
                <EditIcon theme="light" />
              </IconButton>
              <IconButton>
                <DeleteIcon theme="light" />
              </IconButton>
            </ControlButtons>
          </Container>
        )
      }
    </Draggable>
  );
};

export default DragTask;

const Container = styled.div`
  position: relative;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  border: 1px solid black;
  border-radius: 0.5rem;
  box-shadow: 2px 4px 8px rgb(0, 0, 0, 0.25);
  width: 100%;
  background-color: ${(props) => (props.$isDragging ? "skyblue" : "wheat")};
  transition: background-color 0.1s ease;
  &:last-child {
    margin-bottom: 0;
  }
  &:hover div {
    opacity: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-content: center;
    transition: opacity 0.4s ease;
  }
`;

const ControlButtons = styled.div`
  position: absolute;
  top: -50%;
  right: 0px;
  opacity: 0;
  display: none;
  gap: 8px;
`;

const IconButton = styled.button`
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
`;

type TaskProps = {
  task: Task;
  index: number;
};
