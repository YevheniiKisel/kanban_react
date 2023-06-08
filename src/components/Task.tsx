import { FC } from "react"
import {styled} from "styled-components"

const Container = styled.div`
  padding: 1rem 2rem;
  
  border-top: 1px solid black ;
  &:first-child {
    margin-top: 0;
  }
`

type TaskProps = {
  content: string
}

const DragTask: FC<TaskProps> = ({content}) => {
  return (
    <Container>
      {content}
    </Container>
  )
}

export default DragTask;
