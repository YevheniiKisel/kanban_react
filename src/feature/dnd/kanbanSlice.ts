import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { DropResult } from "react-beautiful-dnd";

const initialState: KanbanState = {
  tasks: {},
  columns: {
    "column-1": {
      id: "column-1",
      title: "To-do",
      taskIds: [],
    },
    "column-2": {
      id: "column-2",
      title: "In progress",
      taskIds: [],
    },
    "column-3": {
      id: "column-3",
      title: "Complete",
      taskIds: [],
    },
  },
  columnOrder: ["column-1", "column-2", "column-3"],
  availableTaskId: 1,
  availableColumnId: 1,
};

const kanbanSlice = createSlice({
  name: "kanban",
  initialState,
  reducers: {
    addTask(
      state,
      action: PayloadAction<AddTaskPayload>
    ): void {
      // Cast update tasks state
      const taskId = `task-${state.availableTaskId}`;
      const newTask = {
        id: taskId,
        content: action.payload.taskDescription,
      };
      const updatedTasks = {
        ...state.tasks,
        [taskId]: newTask,
      };

      // Cast update columns state
      const columnId = action.payload.column.id;
      const column = state.columns[columnId];
      console.log(column);
      const updatedColumn = {
        ...column,
        taskIds: [...column.taskIds, taskId],
      };
      const updatedColumns = {
        ...state.columns,
        [columnId]: updatedColumn,
      };

      //Update Redux state

      state.tasks = updatedTasks;
      state.columns = updatedColumns;
      state.availableTaskId++;
    },
    editTask(state, action): void {
      //TODO
      console.log("Editing a task!");
      state;
    },
    deleteTask(state, action): void {
      //TODO
      console.log("Deleting a task!");
      state;
    },
    /* addColumn(state, action):void{
      //Optional Todo
    },
    editColumn(state, action):void{
      //Optional Todo
    },
    deleteColumn(state, action):void{
      //Optional Todo
    }, */
    onDragEnd(state, action: PayloadAction<DropResult>): void {
      const { draggableId, source, destination, type } = action.payload;

      //Check if destination isn't null or undefined (dropped to nowhere)
      if (!destination) {
        return;
      }

      //Check if droppable element didn't set to a previous position inside the same column
      if (
        source.droppableId === destination.droppableId &&
        source.index === destination.index
      ) {
        return;
      }

      //If user dragging columns
      if (type === "column") {
        //Get a columnOrder array from state without direct manipulation on state
        const newColumnArray = Array.from(state.columnOrder);
        //Delete element from it's start position
        newColumnArray.splice(source.index, 1);
        //Paste element at it's end position
        newColumnArray.splice(destination.index, 0, draggableId);

        //Update a state
        state.columnOrder = newColumnArray;
      } else if (type === "task") {
        //Get a start column and finish column objects for manipulation without direct state change
        const columnStart = state.columns[source.droppableId];
        const columnFinish = state.columns[destination.droppableId];

        //If DND has accureed in the same column ->
        if (columnStart === columnFinish) {
          const newTasksIds = Array.from(columnFinish.taskIds);

          //Swich place of dragged element, and update column obejct
          newTasksIds.splice(source.index, 1);
          newTasksIds.splice(destination.index, 0, draggableId);
          const newColumn = {
            ...columnFinish,
            taskIds: newTasksIds,
          };

          //Update state
          state.columns[newColumn.id] = newColumn;
          return;

        } else {
          const columnStartTasksIds = Array.from(columnStart.taskIds);
          const columnFinishTasksIds = Array.from(columnFinish.taskIds);

          //Get dragged element from start column object and move it inside finish column object
          columnStartTasksIds.splice(source.index, 1);
          columnFinishTasksIds.splice(destination.index, 0, draggableId);

          //Generate a new objects to update startColumn and finishColumn
          const newColumnStart = {
            ...columnStart,
            taskIds: columnStartTasksIds,
          };
          const newColumnFinish = {
            ...columnFinish,
            taskIds: columnFinishTasksIds,
          };

          //Update state
          state.columns[newColumnStart.id] = newColumnStart;
          state.columns[newColumnFinish.id] = newColumnFinish;
          return;
        }
      }
    },
  },
});

export const { addTask, editTask, deleteTask, onDragEnd } = kanbanSlice.actions;

export default kanbanSlice.reducer;

export type KanbanState = {
  tasks: Record<string, Task>;
  columns: Record<string, Column>;
  columnOrder: string[];
  availableTaskId: number;
  availableColumnId: number;
};

export type Task = {
  id: string;
  content: string;
};

export type Column = {
  id: string;
  title: string;
  taskIds: string[];
};

type AddTaskPayload = {
  taskDescription: string,
  column: Column
}