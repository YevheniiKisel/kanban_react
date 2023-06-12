import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { useAppDispatch } from "../app/hooks";
import { addTask, Column } from "../feature/dnd/kanbanSlice";

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
  }, [InputField]);

  function handleResize(): void {
    const textarea = textAreaRef.current;
    if (textarea) {
      const textareaWidth = textarea.offsetWidth;
      const fontSize = parseInt(
        getComputedStyle(textarea).fontSize || "16px",
        10
      );
      const cols = Math.floor(textareaWidth / fontSize);
      console.log(cols);
      textarea.cols = cols;
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
      dispatch(addTask({taskDescription, column}));
      setTaskDescription("");
      setIsAddingTask(false);
    }
  }

  return (
    <>
      {isAddingTask ? (
        <InputField
          type="text"
          wrap="soft"
          placeholder="Set task description and submit with '⌘(Ctrl) + Enter'"
          ref={textAreaRef}
          value={taskDescription}
          onChange={handleDescriptionChange}
          onKeyDown={handleInputSubmit}
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

/*

import { IStyledComponent, styled } from "styled-components";
import { FC, useEffect, useState, useRef } from "react";
import { TaskState } from "../App";
import TasksContainer from "./TasksContainer";
import * as React from "react";
import { StyledComponentProps } from "styled-components/dist/types";

interface KanbanFieldProps {
  name: string;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, container: string) => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
  onTaskAdd: (content: string, container: string) => void;
  onTaskChange: (taskId: string, newContent: string) => void
  tasks: TaskState[];
}

const KanbanField: FC<KanbanFieldProps> = ({
  name,
  onDragOver,
  onDrop,
  onDragStart,
  onTaskAdd,
  tasks,
}) => {
  const [header, setHeader] = useState<string>("");
  const [bgColor, setBgColor] = useState<number>(0);
  const [isAddingTask, setIsAddingTask] = useState<boolean>(false);
  const [taskDescription, setTaskDescription] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const formattedName = name
      .replace(/-/g, " ")
      .replace(/\b\w/g, (match) => match.toUpperCase());
    setHeader(formattedName);
    if (bgColor === 0) {
      setBgColor(randomHue());
    }
    handleResize(); // Call the handleResize function initially
    window.addEventListener("resize", handleResize); // Add event listener for window resize

    return () => {
      window.removeEventListener("resize", handleResize); // Clean up the event listener on component unmount
    };

  }, [name, bgColor]);


  function randomHue(): number {
    const colorValue = Math.floor(((Math.random() * 360) / 30 + 1) * 30);
    return colorValue;
  }

  function handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement>): void {
    setTaskDescription(e.target.value);
    const textareaMaxSize = e.target.cols * e.target.rows;
    if(textareaMaxSize <= taskDescription.length){
      e.target.rows += 1;
    }
  }

  function handleInputSubmit(e: React.KeyboardEvent): void {
    if (e.key === "Enter") {
      onTaskAdd(taskDescription, name);
      setTaskDescription("");
      setIsAddingTask(false);
    }
  }

  function handleResize(): void {
    const textarea = textareaRef.current;
    if (textarea) {
      const textareaWidth = textarea.offsetWidth;
      const fontSize = parseInt(getComputedStyle(textarea).fontSize || "16px", 10);
      const cols = Math.floor(textareaWidth / fontSize);
      console.log(cols);
      textarea.cols = cols;
      
    }
  }

  return (
    <Container
      $color={bgColor}
      onDragOver={onDragOver}
      onDrop={(e: React.DragEvent<HTMLDivElement>) => onDrop(e, name)}
    >
      <h1>{header}</h1>
      <TasksContainer fieldName={name} onDragStart={onDragStart} tasks={tasks} />
      {isAddingTask ? (
        <InputField
          name="task-description"
          id="task-input"
          wrap="soft"
          placeholder="new task description"
          value={taskDescription}
          onChange={handleInputChange}
          onKeyDown={handleInputSubmit}
          ref={textareaRef}
        />
      ) : (
        <IconButton onClick={() => setIsAddingTask(true)}>+</IconButton>
      )}
    </Container>
  );
};

export default KanbanField;

const Container = styled.div<{ $color: number }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: center;
  text-align: center;
  flex-wrap: wrap;
  background-color: ${(props) => `hsl(${props.$color}, 25%, 75%)`};
  width: 25%;
  padding: 1rem 2rem;
  box-shadow: inset 4px 4px 16px rgba(0, 0, 0, 0.3);
  border-radius: 1rem;
`;

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

const IconButton = styled.button`
  border: none;
  background-color: transparent;
  color: grey;
  text-align: start;
  &:hover::after {
    content: " New Task";
  }
`;

*/
