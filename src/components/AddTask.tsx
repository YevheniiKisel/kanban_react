import { ChangeEvent, FC, useState } from "react";
import { styled } from "styled-components";
import { useAppDispatch } from "../app/hooks";
import { addTask, Column } from "../app/feature/dnd/kanbanSlice";
import TextArea from "./TextArea";

const AddTask: FC<AddTaskProps> = ({ children, column }) => {
  const [isAddingTask, setIsAddingTask] = useState<boolean>(false);
  const [taskDescription, setTaskDescription] = useState<string>("");
  const dispatch = useAppDispatch();

  function handleNewTask(): void {
    setIsAddingTask(true);
  }

  function handleDescriptionChange(e: ChangeEvent<HTMLTextAreaElement>): void {
    setTaskDescription(e.target.value);
  }

  function handleInputSubmit(e: React.KeyboardEvent): void {
    //Post task on Command + Enter
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      dispatch(addTask({ taskDescription, column }));
      setTaskDescription("");
      setIsAddingTask(false);
    } 
    //Undo new task adding mode
    else if (e.key === 'Escape'){
      e.preventDefault();
      setIsAddingTask(false);
    }
  }

  return (
    <>
      {isAddingTask ? (
        <TextArea
          content={taskDescription}
          placeholder="To submit: '⌘(Ctrl) + Enter'"
          onChange={handleDescriptionChange}
          onSubmit={handleInputSubmit}
        />
      ) : (
        <Button onClick={handleNewTask}>{children}</Button>
      )}
    </>
  );
};

export default AddTask;

type AddTaskProps = {
  column: Column;
  children: string;
};

const Button = styled.button`
  font-size: large;
  width: fit-content;
  background-color: transparent;
  border: none;
  cursor: pointer;
  &:hover::after {
    content: " New task";
  }
  transition: content 0.1ms ease-in;
`;
