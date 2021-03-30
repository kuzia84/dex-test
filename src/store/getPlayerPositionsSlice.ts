import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PlayerPositionsState } from "../Interfaces";
import { RootState } from "./store";

const initialState: PlayerPositionsState = {
  isLoading: true,
  fetchResult: [],
  error: null,
};

export const fetchPlayerPositionsAsync = createAsyncThunk<any, string>(
  "player/fetchData",
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
    return (await response.json()) as string[];
  }
);

export const getPlayerPositionsSlice = createSlice({
  name: "getPlayerPositions",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPlayerPositionsAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPlayerPositionsAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.fetchResult = action.payload;
    });
    builder.addCase(fetchPlayerPositionsAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const SelectPlayerPositionsData = (state: RootState) =>
  state.getPlayerPositions.fetchResult;
export const SelectPlayerPositionsIsLoading = (state: RootState) =>
  state.getPlayerPositions.isLoading;
export const SelectPlayerPositionsError = (state: RootState) =>
  state.getPlayerPositions.error;

export default getPlayerPositionsSlice.reducer;
