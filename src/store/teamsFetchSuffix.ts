import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFetchSuffix } from "../Interfaces/interfaces";
import { RootState } from "./store";

const initialState: IFetchSuffix = {
  searchText: "",
  pageNumber: 1,
  pageSize: 6,
};

const teamsFetchSuffixSlise = createSlice({
  name: "teamsFetchSuffix",
  initialState,
  reducers: {
    resetSuffix: (state) => initialState,
    setSearchText: (state, action: PayloadAction<string>) => {
      state.pageNumber = 1;
      state.searchText = action.payload;
    },
    setPageNumber: (state, action: PayloadAction<number>) => {
      state.pageNumber = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageNumber = 1;
      state.pageSize = action.payload;
    },
  },
});

export const {
  resetSuffix,
  setSearchText,
  setPageNumber,
  setPageSize,
} = teamsFetchSuffixSlise.actions;
export const selectTeamsFetchSuffix = (state: RootState) =>
  state.teamsFetchSuffix;

export const teamsFetchSuffixReducer = teamsFetchSuffixSlise.reducer;
