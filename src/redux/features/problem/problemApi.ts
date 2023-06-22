import { apiSlice } from "../api/apiSlice";

type ProblemDetailsParams = {
  ojName: string;
  problemId: string;
};

type Problems = {
  pageIndex: number;
  pageSize: number;
  query?: string;
};

export const problemApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProblems: builder.query<any, Problems>({
      query: ({ pageIndex, pageSize, query }) => {
        let url = `/problem?page=${pageIndex}&limit=${pageSize}`;
        if (!!query) {
          url += `&query=${query}`;
        }
        return {
          url: url,
          method: "GET",
        };
      },
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
