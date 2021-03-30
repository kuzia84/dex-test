import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  PlayerTeamNameDto,
  SinglePlayerPageResultState,
} from "../Interfaces/interfaces";
import { RootState } from "./store";

const initialState: SinglePlayerPageResultState = {
  isLoading: false,
  fetchResult: {
    name: "",
    number: 0,
    position: "",
    teamId: 0,
    birthday: "",
    height: 0,
    weight: 0,
    avatarUrl: "",
    id: 0,
    teamName: "",
  },
  error: null,
};

export const fetchSinglePlayerAsync = createAsyncThunk<any, string>(
  "player/fetchPlayerData",
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
    return (await response.json()) as PlayerTeamNameDto;
  }
);

const getSinglePlayerSlice = createSlice({
  name: "getSinglePlayer",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSinglePlayerAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSinglePlayerAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.fetchResult = action.payload;
    });
    builder.addCase(fetchSinglePlayerAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const SelectSinglePlayerData = (state: RootState) =>
  state.getSinglePlayer.fetchResult;
export const SelectSinglePlayerIsLoading = (state: RootState) =>
  state.getSinglePlayer.isLoading;
export const SelectSinglePlayerError = (state: RootState) =>
  state.getSinglePlayer.error;

export const getSinglePlayerReducer = getSinglePlayerSlice.reducer;
