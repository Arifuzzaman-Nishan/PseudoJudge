import { apiSlice } from "../api/apiSlice";

interface ICodeCompile {
  username: string;
  code: string;
  stdin: string;
  lang: string;
}

export const codeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    codeCompile: builder.mutation<{ output: string }, ICodeCompile>({
      query: (codeData) => ({
        url: "/code/compile",
        method: "POST",
        body: codeData,
      }),
    }),
    // getProblemWithDetails: builder.query<any, ProblemDetailsParams>({
    //   query: ({ ojName, problemId }) => ({
    //     url: `/problem/findOneWithDetails?ojName=${ojName}&problemId=${problemId}`,
    //     method: "GET",
    //   }),
    // }),
  }),
});

export const { useCodeCompileMutation } = codeApi;
