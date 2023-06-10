import { configureStore } from "@reduxjs/toolkit";
import kanbanReducer from '../feature/dnd/kanbanSlice';

export const store = configureStore({
  reducer: {
    kanban: kanbanReducer
  }
});




export type AppDispatch = typeof store.dispatch ;
export type RootState = ReturnType<typeof store.getState>;
