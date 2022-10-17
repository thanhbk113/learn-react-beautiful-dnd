import React, { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Column from "./Column";
import initialData from "./initialData";

const App = () => {
  const [state, setState] = useState(initialData);

  const onDragEnd = (result: DropResult) => {};

  return (
    <DragDropContext
      onDragStart={(i) => console.log("dragstart:", i)}
      onDragUpdate={(i) => console.log("dragupdate:", i)}
      onDragEnd={(i) => console.log("dragend:", i)}
    >
      {state.columnOrder.map((columnId) => {
        const column = state.columns[columnId as keyof typeof state.columns];
        const tasks = column.taskIds.map(
          (taskId) => state.tasks[taskId as keyof typeof state.tasks]
        );

        return <Column key={column.id} column={column} tasks={tasks} />;
      })}
    </DragDropContext>
  );
};

export default App;
