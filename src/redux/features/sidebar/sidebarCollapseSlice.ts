import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SidebarCollapseState = {
  collapsed: boolean;
};

const initialState: SidebarCollapseState = {
  collapsed: false,
};

export const sidebarCollapse = createSlice({
  name: "sidebarCollapse",
  initialState,
  reducers: {
    toggleSidebarCollapse: (state, action: PayloadAction<boolean>) => {
      state.collapsed = action.payload;
    },
  },
});

export const { toggleSidebarCollapse } = sidebarCollapse.actions;
export default sidebarCollapse.reducer;
