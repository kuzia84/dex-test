import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./redux/store";

const initialState: { active: boolean } = {
  active: false,
};

const sidebarStateSlise = createSlice({
  name: "sidebarState",
  initialState,
  reducers: {
    reset: (state) => initialState,
    setSidebrSate: (state, action) => {
      state.active = action.payload;
    },
  },
});

export const { setSidebrSate } = sidebarStateSlise.actions;
export const selectSidebrSate = (state: RootState) => state.sidebarState.active;

export const sidebarStateReducer = sidebarStateSlise.reducer;
