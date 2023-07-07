import { BASE_API_URL } from "@/utils/constant/baseApiUrl";
import { useQuery } from "@tanstack/react-query";

const problem = {
  useGetProblemsQuery: ({
    query,
    page,
    limit,
  }: {
    query?: string;
    page: number;
    limit: number;
  }) => {
    let url = `${BASE_API_URL}/problem?page=${page}&limit=${limit}`;

    if (!!query) {
      url += `&query=${query}`;
    }

    return useQuery({
      queryKey: ["problems", url],
      queryFn: () => fetch(url).then((res) => res.json()),
      keepPreviousData: true,
    });
  },
  useGetProblemDetailsQuery: ({ problemId }: { problemId: string }) => {
    const url = `${BASE_API_URL}/problem/findOneWithDetails/${problemId}`;

    return useQuery({
      queryKey: ["problemDetails", url],
      queryFn: () => fetch(url).then((res) => res.json()),
      keepPreviousData: true,
    });
  },
};

export const { useGetProblemsQuery, useGetProblemDetailsQuery } = problem;
