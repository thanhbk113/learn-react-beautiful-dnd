import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
`;

type TaskProps = {
  task: {
    id: string;
    content: string;
  };
  index: number;
};

const Task = (props: TaskProps) => {
  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {props.task.content}
        </Container>
      )}
    </Draggable>
  );
};

export default Task;
