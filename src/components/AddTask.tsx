import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { useAppDispatch } from "../app/hooks";
import { addTask, Column } from "../app/feature/dnd/kanbanSlice";
import TextArea from "./TextArea";

const AddTask: FC<AddTaskProps> = ({ children, column }) => {
  const [isAddingTask, setIsAddingTask] = useState<boolean>(false);
  const [taskDescription, setTaskDescription] = useState<string>("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    handleResize(); // Call the handleResize function initially
    window.addEventListener("resize", handleResize); // Add event listener for window resize

    return () => {
      window.removeEventListener("resize", handleResize); // Clean up the event listener on component unmount
    };
  }, []);

  function handleResize(): void {
    const textarea = textAreaRef.current;
    if (textarea) {
      const textareaWidth = textarea.offsetWidth;
      const fontSize = parseInt(
        getComputedStyle(textarea).fontSize || "16px",
        10
      );
      const cols = Math.floor(textareaWidth / fontSize);
      textarea.cols = cols;

      const lines = textarea.value.split("\n").length;
      textarea.rows = lines > 2 ? lines + 1 : 2;
    }
  }

  function handleNewTask(): void {
    setIsAddingTask(true);
  }

  function handleDescriptionChange(e: ChangeEvent<HTMLTextAreaElement>): void {
    setTaskDescription(e.target.value);
  }

  function handleInputSubmit(e: React.KeyboardEvent): void {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      dispatch(addTask({ taskDescription, column }));
      setTaskDescription("");
      setIsAddingTask(false);
    } else if (e.key === 'Escape'){
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

const InputField = styled.textarea`
  border: none;
  border-radius: 0.5rem;
  background-color: rgb(255, 255, 255);
  color: black;
  margin: 1rem 0;
  padding: 0.5rem 1rem;
  box-shadow: 2px 4px 8px rgb(0, 0, 0, 0.25);
  resize: none;
`;

const Button = styled.button`
  width: fit-content;
  background-color: transparent;
  border: none;

  &:hover::after {
    content: " New task";
  }
  transition: content 0.1ms ease-in;
`;

{
  /* <InputField
          type="text"
          wrap="soft"
          placeholder="Set task description and submit with '⌘(Ctrl) + Enter'"
          ref={textAreaRef}
          value={taskDescription}
          onChange={handleDescriptionChange}
          onKeyDown={handleInputSubmit}
        /> */
}
