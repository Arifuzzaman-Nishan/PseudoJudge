"use client";

import React, { FC, useEffect } from "react";
import ProblemStatement from "./ProblemStatement";
import CodeEditor from "../CodeEditor/CodeEditor";
import { useGetProblemDetailsQuery } from "@/features/problem/problemApi";

const ProblemFC = ({ id }: { id: string }) => {
  const { data, isLoading, isError, isSuccess } = useGetProblemDetailsQuery({
    problemId: id,
  });

  let content = <></>;

  // useEffect(() => {
  //   if (isSuccess) {
  //     const {
  //       problemDetails: { limit },
  //     } = data;
  //     dispatch(
  //       setCodeInfo({
  //         stdin: data.problemDetails.sampleDataset.sampleInput,
  //         username: "nishan",
  //         lang: "cpp",
  //         memorylimit: parseInt(limit.memoryLimit.replace("MB").trim()),
  //         timelimit: parseInt(limit.timeLimit.replace("seconds").trim()),
  //         problemId: data._id,
  //         userId: "lskfslfs",
  //       })
  //     );
  //   }
  // }, [isSuccess, data, dispatch]);

  if (isSuccess) {
    console.log("success data is ", data);

    content = <ProblemStatement problem={data} />;
  }

  return (
    <div className="h-full overflow-hidden w-full xl:flex">
      <section className="left__section p-8 xl:w-[60%]">
        <div className="overflow-x-hidden overflow-y-auto">
          {isLoading ? <Loader /> : content}
        </div>
      </section>
      <section className="right__section flex-1">
        <CodeEditor />
      </section>
    </div>
  );
};

export default ProblemFC;

const Loader: FC<any> = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-400"></div>
    </div>
  );
};
