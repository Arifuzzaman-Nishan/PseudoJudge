import { BASE_API_URL } from "@/utils/constant/baseApiUrl";
import { useMutation } from "@tanstack/react-query";

const auth = {
  useLoginMutation: () => {
    const url = `${BASE_API_URL}/auth/login`;
    return useMutation({
      mutationKey: ["login"],
      mutationFn: (data: any) =>
        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }).then((res) => res.json()),
    });
  },
  useSignupMutation: () => {
    const url = `${BASE_API_URL}/auth/signup`;
    return useMutation({
      mutationKey: ["signup"],
      mutationFn: (data: any) =>
        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }).then((res) => res.json()),
    });
  },
};

export const { useLoginMutation, useSignupMutation } = auth;
