import { BASE_API_URL } from "@/utils/constant/baseApiUrl";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const groups = {
  useGetGroupsQuery: () => {
    const url = `${BASE_API_URL}/group/findAll`;
    return useQuery({
      queryKey: ["groups"],
      queryFn: () => fetch(url).then((res) => res.json()),
      keepPreviousData: true,
    });
  },
  useCreateGroupMutation: () => {
    const url = `${BASE_API_URL}/group/create`;
    const queryClient = useQueryClient();

    return useMutation({
      mutationKey: ["createGroup"],
      mutationFn: (data: any) =>
        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }).then((res) => res.json()),
      onSuccess: () => {
        console.log("onSuccess");
        queryClient.invalidateQueries({
          queryKey: ["groups"],
        });
      },
    });
  },
};

export const { useGetGroupsQuery, useCreateGroupMutation } = groups;
