import { ChangeEvent, FC, useEffect, useRef } from 'react'
import styled from 'styled-components'
import useAutosizeTextArea from '../utilities/hooks/useAutoResizeTextArea'



interface TextAreaProps {
  content: string,
  placeholder?: string,
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void,
  onSubmit?:(e: React.KeyboardEvent) => void,
}


const TextArea: FC<TextAreaProps> = ({content, onChange, placeholder, onSubmit}) => {

  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  
  useAutosizeTextArea(textAreaRef.current, content)

  useEffect(() => {
    textAreaRef.current?.focus();

  }, [])


  return (
    <InputField
        placeholder={placeholder}
        ref={textAreaRef}
        rows={1}
        value={content}
        onChange={onChange}
        onKeyDown={onSubmit}
      />
  )
}

export default TextArea


const InputField = styled.textarea`
  border: none;
  border-radius: 0.5rem;
  background-color: rgb(255, 255, 255);
  color: black;
  padding: 0.5rem 1rem;
  box-shadow: 2px 4px 8px rgb(0, 0, 0, 0.25);
  resize: none;
  width: 100%;
`;

