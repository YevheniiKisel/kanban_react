//Libraries
import { ChangeEvent, FC, useState } from "react";
import { styled } from "styled-components";
import { Draggable } from "react-beautiful-dnd";
//Components
import TextArea from "./TextArea";
//Hooks, actions
import { useAppDispatch } from "../app/hooks";
import { deleteTask, editTask } from "../app/feature/dnd/kanbanSlice";
//Types
import { Task } from "../app/feature/dnd/kanbanSlice";
//Assets
import EditIcon from "../assets/icons/EditIcon";
import DeleteIcon from "../assets/icons/DeleteIcon";
import CancelIcon from "../assets/icons/CancelIcon";
import SubmitIcon from "../assets/icons/SubmitIcon";

const DragTask: FC<TaskProps> = ({ task, index, columnId, columnTitle }) => {
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

  function handleKeyboardSubmit(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      dispatch(editTask({ newContent, task }));
      setIsEditing(false);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setIsEditing(false);
    }
  }

  function handleMouseSubmit(e: React.MouseEvent) {
    e.preventDefault();
    dispatch(editTask({ newContent, task }));
    setIsEditing(false);
  }

  function handleDeleteTask() {
    dispatch(deleteTask({ taskId: task.id, columnId: columnId }));
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
            $columnTitle={columnTitle}
          >
            <TextArea
              content={newContent}
              onChange={handleTaskDescriptionChange}
              onSubmit={handleKeyboardSubmit}
            />
            <ControlButtons>
              <IconButton $theme="light" onClick={handleMouseSubmit}>
                <SubmitIcon />
              </IconButton>
              <IconButton $theme="light" onClick={() => setIsEditing(false)}>
                <CancelIcon />
              </IconButton>
            </ControlButtons>
          </Container>
        ) : (
          <Container
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            $isDragging={snapshot.isDragging}
            $columnTitle={columnTitle}
          >
            <StyledParagraph>{task.content}</StyledParagraph>
            <ControlButtons id="id">
              <IconButton onClick={handleEditingMode} $theme="dark">
                <EditIcon />
              </IconButton>
              <IconButton onClick={handleDeleteTask} $theme="dark">
                <DeleteIcon />
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
  width: 100%;
  background-color: ${(props) => {
    switch (props.$columnTitle) {
      case "To do":
        return "#FF6B6B";
      case "In progress":
        return "#FFD93D";
      case "Complete":
        return "#6BCB77";
      default:
        return "#FFFFFF";
    }
  }};
  transition: all 0.1s ease;
  &:last-child {
    margin-bottom: 1.5rem;
  }
  &:hover {
    box-shadow: -8px 8px 0px 0px #000;
    translate: 8px -8px;
  }
`;

const ControlButtons = styled.div`
  position: static;
  opacity: 1;
  display: flex;
  flex-direction: row;
  justify-content: end;
  gap: 8px;
  margin: 8px 0;
`;

const IconButton = styled.button`
  border: none;
  border-radius: 50%;
  display: flex;
  width: 2rem;
  height: 2rem;
  padding: 0.5rem;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  background-color: ${(props) => (props.$theme === "light" ? "#FFF" : "#000")};
  cursor: pointer;
  transition: scale 0.1s;
  &:hover {
    scale: 1.1;
  }
`;

const StyledParagraph = styled.p`
  white-space: pre-wrap;
`;

type TaskProps = {
  task: Task;
  index: number;
  columnId: string;
  columnTitle: string;
};
