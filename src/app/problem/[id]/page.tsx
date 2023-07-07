import ProblemFC from "@/components/Problem";
import { BASE_API_URL } from "@/utils/constant/baseApiUrl";
import getQueryClient from "@/utils/reduxQuerySetup/reactQuery/getQueryClient";
import { Hydrate, dehydrate } from "@tanstack/react-query";

async function getProblemDetails(url: string) {
  const res = await fetch(url, {
    method: "GET",
    cache: "no-cache",
  });
  const data = await res.json();
  console.log("problem details data is ", data);
  return data;
}

export default async function page({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  const url = `${BASE_API_URL}/problem/findOneWithDetails/${id}`;

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["problemDetails", url], () =>
    getProblemDetails(url)
  );
  const dehydratedState = dehydrate(queryClient);
  return (
    <Hydrate state={dehydratedState}>
      <ProblemFC id={id} />
    </Hydrate>
  );
}
