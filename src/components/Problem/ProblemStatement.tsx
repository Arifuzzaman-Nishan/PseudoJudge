import Image from "next/image";
import React, { FC } from "react";
import SampleInputOutput from "./SampleInputOutput";

const ProblemStatement: FC<any> = ({ problem }) => {
  const { title, ojName, ojUrl, problemDetails } = problem;

  const { description, sampleDataset, limit, imageUrl } = problemDetails;

  const { problemDesc, inputDesc, outputDesc } = description;
  const { sampleInput, sampleOutput } = sampleDataset;

  const { timeLimit, memoryLimit } = limit;

  // const formattedTestInput = sampleInput
  //   ?.split("\n")
  //   .map((line: any, index: number) => <p key={index}>{line}</p>);
  // const formattedTestOutput = sampleOutput
  //   ?.split("\n")
  //   .map((line: any, index: number) => <p key={index}>{line}</p>);

  return (
    <section className="prose prose-lg max-w-none md:prose-xl prose-p:text-gray-600 ">
      <h2 className="text-center mb-6">{title}</h2>
      <dd className="flex flex-wrap text-sm font-medium leading-6 text-gray-500 md:text-base">
        <div>
          <span className="mx-2">Timelimit: {timeLimit}</span>
        </div>
        <div>
          <span className="mx-2">Memorylimit: {memoryLimit}</span>
        </div>
      </dd>
      {/* <div className="flex space-x-3 mt-5">
        <h5>Statement</h5>
        <h5>Submissions</h5>
        <h5>Leaderboard</h5>
        <h5>Stats</h5>
        <h5>Tutorial</h5>
      </div> */}
      {imageUrl && (
        <div className="flex justify-center">
          <Image src={imageUrl} alt={ojName} width={400} height={400} />
        </div>
      )}

      <article className="main__problemdesc">
        <div className="pb__desc">
          <p className="">{problemDesc}</p>
        </div>
        <div className="input">
          <h4>Input</h4>
          <p>{inputDesc}</p>
        </div>
        <div className="output">
          <h4>Output</h4>
          <p>{outputDesc}</p>
        </div>

        <SampleInputOutput
          sampleInput={sampleInput}
          sampleOutput={sampleOutput}
        />
      </article>
    </section>
  );
};
export default ProblemStatement;
