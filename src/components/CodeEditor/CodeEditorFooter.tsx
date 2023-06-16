import React, { ChangeEvent, useState } from "react";
import Modal from "../Shared/Modal/Modal";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useCodeCompileMutation } from "@/redux/features/code/codeApi";
import { setStdin } from "@/redux/features/code/codeSlice";
import Button from "../Shared/Button/Button";

const CodeEditorFooter = () => {
  const codeInfo = useAppSelector((state) => state.codeCompileReducer);
  const dispatch = useAppDispatch();

  const [codeCompile, { data, error, isLoading, isSuccess }] =
    useCodeCompileMutation();

  if (isSuccess) {
    console.log("Code compile successData is ", data);
  }

  if (isLoading) {
    console.log("Code compile loading");
  }

  const handleRun = () => {
    console.log("codeInfo is ", codeInfo);
    // codeCompile({
    //   code: codeInfo.code as string,
    //   stdin: codeInfo.stdin,
    //   lang: codeInfo.lang,
    //   username: codeInfo.username,
    // });
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setStdin(e?.target?.value));
  };

  return (
    <div className="flex justify-between items-center bg-gray-300 p-3">
      <Modal modalTitle="input" btnName="CustomInput">
        <textarea
          className="w-full h-full py-3 px-4 block border border-gray-200 rounded-md text-sm text-gray-600"
          rows={5}
          spellCheck="false"
          value={codeInfo.stdin}
          onChange={handleChange}
        ></textarea>
      </Modal>
      <div className="flex items-center w-full justify-end">
        <Button btnColor="green" onClick={handleRun}>
          Run Input
        </Button>

        <Button btnColor="blue" className="ml-5">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default CodeEditorFooter;
