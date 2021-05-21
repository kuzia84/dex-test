import { createSlice } from "@reduxjs/toolkit";
import { IAppState } from "../../api/dto/components.g";

const initialState: IAppState = {
  sidebarShow: false,
};

const appSlise = createSlice({
  name: "sidebarState",
  initialState,
  reducers: {
    reset: (state) => initialState,
    setSidebrSate: (state, action) => {
      state.sidebarShow = action.payload;
    },
  },
});

export const { setSidebrSate } = appSlise.actions;

export const appReducer = appSlise.reducer;
