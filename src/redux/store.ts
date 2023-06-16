import { configureStore } from "@reduxjs/toolkit";
import sidebarCollapseReducer from "./features/sidebar/sidebarCollapseSlice";
import { apiSlice } from "./features/api/apiSlice";
import codeCompileReducer from "./features/code/codeSlice";
import authReducer from "./features/auth/authSlice";

export const store = configureStore({
  reducer: {
    sidebarCollapseReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    codeCompileReducer,
    authReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
