import React, { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Column from "./Column";
import initialData from "./initialData";

const App = () => {
  const [state, setState] = useState(initialData);

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    console.log("source:", source, "destination:", destination);

    if (!destination) {
      return; // dropped outside the list
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return; // dropped in the same place
    }

    const start = // get the column where the drag started
      state.columns[source.droppableId as keyof typeof state.columns];
    console.log("cloumn start", start);
    const finish = // get the column where the drag ended
      state.columns[destination.droppableId as keyof typeof state.columns];
    console.log("cloumn finish", finish);

    if (start === finish) {
      // if the drag started and ended in the same column
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1); // remove the task from its original position
      newTaskIds.splice(destination.index, 0, draggableId); // insert the task in its new position

      const newColumn = {
        // create a new column object
        ...start, // copy the properties of the original column
        taskIds: newTaskIds, // replace the taskIds array with the new one
      };

      const newState = {
        // create a new state object
        ...state, // copy the properties of the original state
        columns: {
          ...state.columns, // copy the properties of the original columns object
          [newColumn.id]: newColumn, // replace the column with the new one
        },
      };

      setState(newState); // update the state

      return;
    }

    // if the drag started and ended in different columns
    const startTaskIds = Array.from(start.taskIds); // create a new array with the taskIds of the column where the drag started
    startTaskIds.splice(source.index, 1); // remove the task from its original position
    const newStart = {
      // create a new column object
      ...start, // copy the properties of the original column
      taskIds: startTaskIds, // replace the taskIds array with the new one
    };

    const finishTaskIds = Array.from(finish.taskIds); // create a new array with the taskIds of the column where the drag ended
    finishTaskIds.splice(destination.index, 0, draggableId); // insert the task in its new position
    const newFinish = {
      // create a new column object
      ...finish, // copy the properties of the original column
      taskIds: finishTaskIds, // replace the taskIds array with the new one
    };

    const newState = {
      // create a new state object
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart, // replace the column where the drag started with the new one
        [newFinish.id]: newFinish, // replace the column where the drag ended with the new one
      },
    };

    setState(newState);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div
        style={{
          display: "flex",
        }}
      >
        {state.columnOrder.map((columnId) => {
          const column = state.columns[columnId as keyof typeof state.columns];
          const tasks = column.taskIds.map(
            (taskId) => state.tasks[taskId as keyof typeof state.tasks]
          );

          return <Column key={column.id} column={column} tasks={tasks} />;
        })}
      </div>
    </DragDropContext>
  );
};

export default App;
