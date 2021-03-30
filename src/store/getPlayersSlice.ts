import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  PlayerDtoPageResult,
  PlayerDtoPageResultState,
} from "../Interfaces/interfaces";
import { RootState } from "./store";

const initialState: PlayerDtoPageResultState = {
  isLoading: false,
  fetchResult: {
    data: [],
    count: 0,
    page: 1,
    size: 6,
  },
  error: null,
};

export const fetchPlayersAsync = createAsyncThunk<any, string>(
  "players/fatchPlayersData",
  async (request) => {
    const myHeaders = new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    });
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    const response = await fetch(request, requestOptions);
    return (await response.json()) as PlayerDtoPageResult;
  }
);

const getPlayersSlice = createSlice({
  name: "getPlayers",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPlayersAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPlayersAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.fetchResult = action.payload;
    });
    builder.addCase(fetchPlayersAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const selectPlayersData = (state: RootState) =>
  state.getPlayers.fetchResult;
export const selectPlayersIsLoading = (state: RootState) =>
  state.getPlayers.isLoading;
export const selectPlayersError = (state: RootState) => state.getPlayers.error;

export const getPlayersReducer = getPlayersSlice.reducer;
