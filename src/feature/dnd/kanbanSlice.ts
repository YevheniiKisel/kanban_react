import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: KanbanState = {
  tasks: {},
  columns: {},
  columnOrder: [],
  availableTaskId: 1,
  availableColumnId: 1
}

const kanbanSlice = createSlice({
  name: 'dnd',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<{id:string, content:string}>):void {
      state.tasks[`task-${state.availableTaskId}`] = action.payload;
      state.availableTaskId++;
      
    },
    /* editTask(state, action):void {
      //TODO
      console.log('Editing a task!')
      state

    },
    deleteTask(state, action):void {
      //TODO
      console.log('Deleting a task!')
      state

    }, */
    /* addColumn(state, action):void{
      //Optional Todo
    },
    editColumn(state, action):void{
      //Optional Todo
    },
    deleteColumn(state, action):void{
      //Optional Todo
    }, */

  }
});

export const {addTask, editTask, deleteTask } = kanbanSlice.actions;

export default kanbanSlice.reducer;

export type KanbanState = {
  tasks: Record<string, Task>,
  columns: Record<string, Column>,
  columnOrder: string[] ,
  availableTaskId: number,
  availableColumnId: number
}

export type Task = {
  id: string;
  content: string;
};

export type Column = {
  id: string;
  title: string;
  taskIds: string[];
};


