import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ICodeInfo {
  userId: string;
  problemId: string;
  timelimit: number;
  memorylimit: number;
  username: string;
  lang: "cpp";
  stdin: string;
  code?: string;
}

const initialState: ICodeInfo = {
  userId: "",
  problemId: "",
  timelimit: 1,
  memorylimit: 256,
  username: "nishan",
  lang: "cpp",
  stdin: "",
  code: "#include<bits/stdc++.h>\r\nusing namespace std;\r\n \r\nint main() {\r\n \r\n    /**\r\n     *\r\n     * Welcome to PseudoJudge! \uD83D\uDE03\uD83C\uDF89\uD83D\uDE80\r\n     * Code your solution here\r\n     *\r\n     */\r\n \r\n    return 0;\r\n}",
};

export const codeCompile = createSlice({
  name: "codeCompile",
  initialState,
  reducers: {
    setCode: (state, action: PayloadAction<string>) => {
      state.code = action.payload;
    },
    setCodeInfo: (state, action: PayloadAction<ICodeInfo>) => {
      for (const [key, value] of Object.entries(action.payload)) {
        if (key in state) {
          state[key as keyof ICodeInfo] = value as never;
        }
      }
    },
    setStdin: (state, action: PayloadAction<string>) => {
      state.stdin = action.payload;
    },
  },
});

export const { setCode, setCodeInfo, setStdin } = codeCompile.actions;
export default codeCompile.reducer;
