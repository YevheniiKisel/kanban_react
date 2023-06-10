import { configureStore } from "@reduxjs/toolkit";
import kanbanReducer from '../feature/dnd/kanbanSlice';
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from 'redux-persist';

//Configure persist
const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, kanbanReducer);



export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store)



export type AppDispatch = typeof store.dispatch ;
export type RootState = ReturnType<typeof store.getState>;
