import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFetchSuffix } from "../Interfaces/interfaces";
import { RootState } from "./store";

const initialState: IFetchSuffix = {
  searchText: "",
  pageNumber: 1,
  pageSize: 6,
  teamIds: "",
};

const playersFetchSuffixSlise = createSlice({
  name: "playersFetchSuffix",
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
    setTeamIds: (state, action: PayloadAction<string>) => {
      state.pageNumber = 1;
      state.teamIds = action.payload;
    },
  },
});

export const {
  resetSuffix,
  setSearchText,
  setPageNumber,
  setPageSize,
  setTeamIds,
} = playersFetchSuffixSlise.actions;
export const selectPlayersFetchSuffix = (state: RootState) =>
  state.playersFetchSuffix;

export const playersFetchSuffixReducer = playersFetchSuffixSlise.reducer;
