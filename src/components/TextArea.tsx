import { ChangeEvent, FC, useEffect, useRef } from "react";
import styled from "styled-components";
import useAutosizeTextArea from "../utilities/hooks/useAutoResizeTextArea";

interface TextAreaProps {
  content: string;
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit?: (e: React.KeyboardEvent) => void;
}

const TextArea: FC<TextAreaProps> = ({
  content,
  onChange,
  placeholder,
  onSubmit,
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(textAreaRef.current, content);

  useEffect(() => {
    if (textAreaRef.current) {
      const textArea = textAreaRef.current;
      textArea.focus();
      // We need to reset the height momentarily to get the correct scrollHeight for the textarea
      textArea.style.height = "0px";
      const scrollHeight = textArea.scrollHeight;

      // We then set the height directly, outside of the render loop
      // Trying to set this with state or a ref will product an incorrect value.
      textArea.style.height = scrollHeight + "px";
    }
  }, []);

  return (
    <InputField
      placeholder={placeholder}
      ref={textAreaRef}
      rows={1}
      value={content}
      onChange={onChange}
      onKeyDown={onSubmit}
    />
  );
};

export default TextArea;

const InputField = styled.textarea`
  border: 1px solid black;
  border-radius: 0.5rem;
  background-color: rgb(255, 255, 255);
  color: black;
  padding: 0.5rem 1rem;
  resize: none;
  width: 100%;
`;
