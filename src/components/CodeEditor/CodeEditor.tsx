import React from "react";
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night";
import { langs } from "@uiw/codemirror-extensions-langs";
import ReactCodeMirror from "@uiw/react-codemirror";
import { EditorView } from "@codemirror/view";
import CodeEditorHeader from "./CodeEditorHeader";
import CodeEditorFooter from "./CodeEditorFooter";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setCode } from "@/redux/features/code/codeSlice";

const CodeEditor: React.FC<any> = () => {
  const code = useAppSelector((state) => state.codeCompileReducer.code);
  const dispatch = useAppDispatch();
  const onChange = React.useCallback(
    (value: any, viewUpdate: any) => {
      dispatch(setCode(value));
    },
    [dispatch]
  );

  return (
    <>
      <CodeEditorHeader />
      <ReactCodeMirror
        minHeight="60vh"
        width="100%"
        value={code}
        theme={tokyoNight}
        extensions={[langs.cpp(), EditorView.lineWrapping]}
        onChange={onChange}
        autoCorrect="false"
        spellCheck="false"
        className="text-lg 2xl:text-xl"
      />
      <CodeEditorFooter />
    </>
  );
};

export default CodeEditor;
