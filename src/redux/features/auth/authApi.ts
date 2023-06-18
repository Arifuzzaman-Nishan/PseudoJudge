import { SignupState } from "@/app/signup/page";
import { apiSlice } from "../api/apiSlice";
import { IAuthState } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation<IAuthState, SignupState & { role?: string }>({
      query: (signupData) => ({
        url: "/auth/signup",
        method: "POST",
        body: signupData,
      }),
    }),
    login: builder.mutation<IAuthState, { email: string; password: string }>({
      query: (loginData) => ({
        url: "/auth/login",
        method: "POST",
        body: loginData,
      }),
    }),
  }),
});

export const { useSignupMutation, useLoginMutation } = authApi;
