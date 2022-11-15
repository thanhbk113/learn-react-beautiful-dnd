import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import Task from "./Task";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgray;
  border-radius: 2px;
  width: 220px;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div<{ isDraggingOver: boolean }>`
  padding: 8px;
  background-color: ${(props) => (props.isDraggingOver ? "skyblue" : "white")};
  flex-grow: 1;
  min-height: 100px;
`;

type ColumnProps = {
  column: {
    id: string;
    title: string;
    taskIds: string[];
  };
  tasks: {
    id: string;
    content: string;
  }[];
};

const Column = (props: ColumnProps) => {
  return (
    <Container>
      {
        <div>
          <Title>{props.column.title}</Title>
          <Droppable droppableId={props.column.id}>
            {(provided, snapshot) => {
              return (
                <TaskList
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  {props.tasks.map((task: any) => {
                    const index = props.column.taskIds.indexOf(task.id);
                    return (
                      <div key={index}>
                        <Task key={task.id} task={task} index={index} />
                      </div>
                    );
                  })}
                  {provided.placeholder}
                </TaskList>
              );
            }}
          </Droppable>
        </div>
      }
    </Container>
  );
};

export default Column;
