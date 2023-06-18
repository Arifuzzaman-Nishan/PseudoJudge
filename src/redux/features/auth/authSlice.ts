import { PayloadAction, createSlice } from "@reduxjs/toolkit";

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

const storedDataString = localStorage.getItem("auth");
let storedData: IAuthState | null = null;

// Parse the stored data if it exists
if (storedDataString) {
  storedData = JSON.parse(storedDataString) as IAuthState;
}

const initialState: IAuthState = {
  _id: storedData?._id || "",
  username: storedData?.username || "",
  email: storedData?.email || "",
  token: {
    access_token: storedData?.token?.access_token || "",
  },
  role: storedData?.role || Role.USER,
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginResult: (state, action: PayloadAction<IAuthState>) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { loginResult } = auth.actions;
export default auth.reducer;
