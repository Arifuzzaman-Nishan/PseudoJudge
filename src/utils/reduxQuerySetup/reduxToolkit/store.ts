import { configureStore } from "@reduxjs/toolkit";
import codeReducer from "../../../features/code/codeSlice";

export const store = configureStore({
  reducer: {
    codeReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
