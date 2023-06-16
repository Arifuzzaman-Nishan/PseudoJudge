import { FC } from "react";
import ClipBoard from "./Clipboard";

const SampleInputOutput: FC<any> = ({ sampleInput, sampleOutput }) => {
  const formattedTestInput = sampleInput
    ?.split("\n")
    .map((line: any, index: number) => (
      <>
        <span className="pl-3" key={index}>
          {line}
        </span>
        <br />
      </>
    ));
  const formattedTestOutput = sampleOutput
    ?.split("\n")
    .map((line: any, index: number) => (
      <>
        <span key={index}>{line}</span>
        <br />
      </>
    ));
  return (
    <div className="sample">
      <h4 className="mb-5">Sample</h4>
      <div className="sample__datasets px-8">
        <table className="table-auto w-full divide-x divide-gray-200">
          <thead>
            <tr className="border text-center text-gray-600 font-semibold text-lg">
              <th className="px-4 py-2 relative">Input</th>
              <th className="px-4 py-2 relative">Output</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border">
              <td className="border-r  relative">
                <div className="input__datasets">
                  <p className="whitespace-pre-wrap">{formattedTestInput}</p>
                </div>
                <ClipBoard text={sampleInput} />
              </td>
              <td className="align-top relative">
                <div className="output__datasets">
                  <p className="whitespace-pre-wrap ">{formattedTestOutput}</p>
                </div>
                <ClipBoard text={sampleOutput} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SampleInputOutput;
