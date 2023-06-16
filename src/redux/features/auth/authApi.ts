import { SignupState } from "@/app/signup/page";
import { apiSlice } from "../api/apiSlice";
import { IAuthState } from "./authSlice";

export const codeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation<IAuthState, SignupState & { role: string }>({
      query: (signupData) => ({
        url: "/auth/signup",
        method: "POST",
        body: signupData,
      }),
    }),
  }),
});
