"use client";

import React, { FC, useEffect, useRef, useState } from "react";
import ProblemStatement from "./ProblemStatement";
import CodeEditor from "../CodeEditor/CodeEditor";
import { useGetProblemDetailsQuery } from "@/features/problem/problemApi";
import { Tabs } from "antd";

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

  const onChange = (key: string) => {
    console.log(key);
  };

  if (isSuccess) {
    console.log("success data is ", data);

    content =
      data?.ojName === "LOJ" ? (
        <ProblemStatement problem={data} />
      ) : (
        <UvaProblemStatement problem={data} />
      );
  }

  const items = [
    {
      key: "1",
      label: `Problem`,
      children: (
        <div className="overflow-x-hidden overflow-y-auto">
          {isLoading ? <Loader /> : content}
        </div>
      ),
    },
    {
      key: "2",
      label: `Submissions`,
      children: <h1>Code Submission</h1>,
    },
  ];

  return (
    <div className="h-full overflow-hidden w-full xl:flex">
      <section className="left__section p-8 xl:w-[60%]">
        <Tabs defaultActiveKey="1" items={items} centered onChange={onChange} />
        ;
      </section>
      <section className="right__section flex-1">
        <CodeEditor />
      </section>
    </div>
  );
};

export default ProblemFC;

const UvaProblemStatement: FC<{ problem?: any }> = ({ problem }) => {
  const fileUrl = `data:application/pdf;base64,${problem?.base64}`;

  return (
    <div>
      <PDFViewer base64String={fileUrl} />
    </div>
  );
};

function PDFViewer({ base64String }: { base64String: string }) {
  return (
    <iframe src={base64String} style={{ width: "100%", height: "90vh" }}>
      Your browser does not support iframes.
    </iframe>
  );
}

const Loader: FC<any> = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-400"></div>
    </div>
  );
};
