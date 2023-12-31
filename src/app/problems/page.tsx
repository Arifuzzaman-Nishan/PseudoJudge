import ProblemsFC from "@/components/Problems";
import { BASE_API_URL } from "@/utils/constant/baseApiUrl";
import getQueryClient from "@/utils/reduxQuerySetup/reactQuery/getQueryClient";
import { Hydrate, dehydrate } from "@tanstack/react-query";

const pageIndex = 1;
const limit = 2;
const query = "";

async function getProblems(url: string) {
  const res = await fetch(url, {
    cache: "no-cache",
  });
  const data = await res.json();
  return data;
}

export default async function Problems() {
  let url = `${BASE_API_URL}/problem?page=${pageIndex}&limit=${limit}`;

  if (!!query) {
    url += `&query=${query}`;
  }

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["problems", url], () => getProblems(url));

  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <ProblemsFC />
    </Hydrate>
  );
}
