import React, { useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";

const listItem = [
  {
    id: "1",
    name: "Study Spanich",
  },
  {
    id: "2",
    name: "Workout",
  },
  {
    id: "3",
    name: "Film Youtobe",
  },
  {
    id: "4",
    name: "Grocery Shop",
  },
];

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  padding: 10,
  margin: `0px 50px 15px 50px`,
  background: isDragging ? "#4a2975" : "white",
  color: isDragging ? "white" : "black",
  border: `1px solid block`,
  borderRadius: `5px`,

  ...draggableStyle,
});

function App() {
  const [todo, setTodo] = useState(listItem);
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    console.log("source", source, "-", "destination", destination);

    if (!destination) return; //if item not drag or drop do nothing

    const items = Array.from(todo); //copy array todo

    setTodo(items); //set new state

    const [newOrder] = items.splice(source.index, 1); //add new element from destination source

    console.log("newOrder", newOrder);
    items.splice(destination.index, 0, newOrder);
    console.log("items_finally", items);
  };
  return (
    <div className="App">
      <h1>Drag and Drop</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="todo">
          {(provided) => (
            <div
              className="todo"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {todo.map(({ id, name }, index) => (
                <Draggable key={id} draggableId={id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      {name}
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default App;
