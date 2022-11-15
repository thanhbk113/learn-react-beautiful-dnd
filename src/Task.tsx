import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Container = styled.div<{ isDragging: boolean }>`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  background-color: ${(props) => (props.isDragging ? "lightgreen" : "white")};
  display: flex;
`;

type TaskProps = {
  task: {
    id: string;
    content: string;
  };
  index: number;
};

const Hander = styled.div`
  width: 20px;
  height: 20px;
  background-color: orange;
  border-radius: 4px;
  margin-right: 8px;
`;

const Task = (props: TaskProps) => {
  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided, snapshot) => {
        return (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <Hander {...provided.dragHandleProps} />
            {props.task.content}
          </Container>
        );
      }}
    </Draggable>
  );
};

export default Task;
