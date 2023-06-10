import {FC} from 'react'
import {styled} from 'styled-components'

type ButtonProps = {
  textOnHover?: string
  children: string
  
}

const Container = styled.button`
  width: fit-content;
  background-color: transparent;
  border: none;
  
  &:hover::after {
    content: " New task";
  }
  transition: content 0.1ms ease-in;
`

const Button: FC<ButtonProps> = ({children}) => {

  function handleNewTask():void {
    
  }

  return (
    <Container onClick={handleNewTask}>
      {children}
    </Container>
  )
}

export default Button
