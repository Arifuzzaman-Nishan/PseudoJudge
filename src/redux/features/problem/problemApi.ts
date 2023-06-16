import { apiSlice } from "../api/apiSlice";

type ProblemDetailsParams = {
  ojName: string;
  problemId: string;
};

export const problemApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProblems: builder.query<any, { pageIndex: number; pageSize: number }>({
      query: ({ pageIndex, pageSize }) => ({
        url: `/problem?page=${pageIndex}&limit=${pageSize}`,
        method: "GET",
      }),
      providesTags: ["Problems"],
    }),
    getProblemWithDetails: builder.query<any, ProblemDetailsParams>({
      query: ({ ojName, problemId }) => ({
        url: `/problem/findOneWithDetails?ojName=${ojName}&problemId=${problemId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetProblemsQuery, useGetProblemWithDetailsQuery } =
  problemApi;
