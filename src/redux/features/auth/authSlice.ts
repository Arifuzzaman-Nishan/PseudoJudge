import { Action, PayloadAction, createSlice } from "@reduxjs/toolkit";

export enum Role {
  USER = "user",
  ADMIN = "admin",
}

export interface IAuthState {
  _id: string;
  username: string;
  email: string;
  token: {
    access_token: string;
  };
  role: Role;
}

const initialState = {
  _id: "",
  username: "",
  email: "",
  token: {
    access_token: "",
  },
  role: Role.USER,
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginResult: (state, action: PayloadAction<IAuthState>) => {
      state = { ...action.payload };
    },
  },
});

export const { loginResult } = auth.actions;
export default auth.reducer;
