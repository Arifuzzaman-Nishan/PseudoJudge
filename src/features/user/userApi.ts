import { BASE_API_URL } from "@/utils/constant/baseApiUrl";
import { useQuery } from "@tanstack/react-query";

const user = {
  useUsersQuery: (group: string, groupId?: string) => {
    const url = `${BASE_API_URL}/user/findAll?group=${group}&groupId=${groupId}`;

    return useQuery({
      queryKey: ["users", url],
      queryFn: () => fetch(url).then((res) => res.json()),
    });
  },
};

export const { useUsersQuery } = user;
