import ProblemFC from "@/components/Problem";
import { BASE_API_URL } from "@/utils/constant/baseApiUrl";
import getQueryClient from "@/utils/reduxQuerySetup/reactQuery/getQueryClient";
import { Hydrate, dehydrate } from "@tanstack/react-query";

async function pdfBase64(url: string) {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString("base64");

  return base64;
}

async function getProblemDetails(url: string) {
  const res = await fetch(url, {
    method: "GET",
    cache: "no-cache",
  });

  const data = await res.json();
  if (data.ojName === "UVA") {
    data.base64 = await pdfBase64(data.problemDetails.pdfUrl);
  }

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
