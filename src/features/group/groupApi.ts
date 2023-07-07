import { BASE_API_URL } from "@/utils/constant/baseApiUrl";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const group = {
  useGroupDetailsQuery: (groupId: string) => {
    const url = `${BASE_API_URL}/group/findOne/${groupId}`;

    return useQuery({
      queryKey: ["group", groupId],
      queryFn: () => fetch(url).then((res) => res.json()),
    });
  },
  useUserAddedMutation: () => {
    const queryClient = useQueryClient();

    const url = `${BASE_API_URL}/group/usersAdded`;
    return useMutation({
      mutationKey: ["userAdded"],
      mutationFn: (userInfo: any) =>
        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userInfo),
        }).then((res) => res.json()),
      onSuccess: (data: any) => {
        const userInUrl = `${BASE_API_URL}/user/findAll?group=in&groupId=${data.groupId}`;

        console.log("success data is ", data);

        const userNotInUrl = `${BASE_API_URL}/user/findAll?group=notIn&groupId=undefined`;

        queryClient.invalidateQueries(["users", userNotInUrl]);
        queryClient.invalidateQueries(["users", userInUrl]);
      },
    });
  },
};

export const { useGroupDetailsQuery, useUserAddedMutation } = group;
