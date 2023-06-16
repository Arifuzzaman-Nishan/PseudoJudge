"use client";

import { useGetProblemWithDetailsQuery } from "@/redux/features/problem/problemApi";
import { useSearchParams } from "next/navigation";
import React, { FC, useEffect, useState } from "react";
import ProblemStatement from "@/components/Problem/ProblemStatement";
import CodeEditor from "@/components/CodeEditor/CodeEditor";
import { useAppDispatch } from "@/redux/hooks";
import { setCodeInfo } from "@/redux/features/code/codeSlice";

function Problem() {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();

  const ojName = searchParams.get("ojName");
  const problemId = searchParams.get("problemId");

  const { data, isLoading, isError, isSuccess } = useGetProblemWithDetailsQuery(
    {
      ojName: ojName as string,
      problemId: problemId as string,
    },
    {
      // Skip making the API request if either ojName or problemId is not available
      skip: !(ojName && problemId),
    }
  );

  let content = <></>;

  useEffect(() => {
    if (isSuccess) {
      const {
        problemDetails: { limit },
      } = data;
      dispatch(
        setCodeInfo({
          stdin: data.problemDetails.sampleDataset.sampleInput,
          username: "nishan",
          lang: "cpp",
          memorylimit: parseInt(limit.memoryLimit.replace("MB").trim()),
          timelimit: parseInt(limit.timeLimit.replace("seconds").trim()),
          problemId: data._id,
          userId: "lskfslfs",
        })
      );
    }
  }, [isSuccess, data, dispatch]);

  if (isSuccess) {
    console.log("success data is ", data);

    content = <ProblemStatement problem={data} />;
  }

  return (
    <div className="h-full overflow-hidden w-full lg:flex">
      <section className="left__section p-8 w-[60%]">
        <div className="overflow-x-hidden overflow-y-auto">
          {isLoading ? <Loader /> : content}
        </div>
      </section>
      <section className="right__section flex-1">
        <CodeEditor />
      </section>
    </div>
  );
}

export default Problem;

const Loader: FC<any> = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-400"></div>
    </div>
  );
};
