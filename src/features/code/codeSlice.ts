import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  code: "#include<bits/stdc++.h>\r\nusing namespace std;\r\n \r\nint main() {\r\n \r\n    /**\r\n     *\r\n     * Welcome to PseudoJudge! \uD83D\uDE03\uD83C\uDF89\uD83D\uDE80\r\n     * Code your solution here\r\n     *\r\n     */\r\n \r\n    return 0;\r\n}",
};

const code = createSlice({
  name: "code",
  initialState,
  reducers: {
    setCode: (state, action) => {
      state.code = action.payload;
    },
  },
});

export const { setCode } = code.actions;
export default code.reducer;
