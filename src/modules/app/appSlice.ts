import { createSlice } from "@reduxjs/toolkit";
import { IAppState } from "../../api/dto/components.g";
import { fetchDeleteItemById } from "./appThunk";

const initialState: IAppState = {
  sidebarShow: false,
  deleteIsLoading: true,
  deleteFetchResult: {
    name: "",
  },
  deleteErrors: null,
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
  extraReducers: (builder) => {
    builder.addCase(fetchDeleteItemById.pending, (state) => {
      state.deleteIsLoading = true;
    });
    builder.addCase(fetchDeleteItemById.fulfilled, (state, action) => {
      state.deleteIsLoading = false;
      state.deleteFetchResult = action.payload;
    });
    builder.addCase(fetchDeleteItemById.rejected, (state, action) => {
      state.deleteIsLoading = false;
      state.deleteErrors = action.error;
    });
  },
});

export const { setSidebrSate } = appSlise.actions;

export const appReducer = appSlise.reducer;
