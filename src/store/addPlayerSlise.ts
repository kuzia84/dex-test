import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AddNewPlayerState, NewPlayerDto } from "../Interfaces";
import { RootState } from "./store";

const initialState: AddNewPlayerState = {
  isLoading: false,
  fetchResult: {},
  errors: null,
};

export const fetchAddPlayer = createAsyncThunk<any, NewPlayerDto>(
  "player/addPlayer",
  async (data) => {
    const myHeaders = new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(data),
    };
    const response = await fetch(
      "http://dev.trainee.dex-it.ru/api/Player/Add",
      requestOptions
    );
    return await response.json();
  }
);

export const addPlayerSlise = createSlice({
  name: "addPlayer",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAddPlayer.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAddPlayer.fulfilled, (state, action) => {
      state.isLoading = false;
      state.fetchResult = action.payload;
    });
    builder.addCase(fetchAddPlayer.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.error;
    });
  },
});

export const selectAddPlayerData = (state: RootState) =>
  state.addPlayer.fetchResult;
export const selectAddPlayerIsLoading = (state: RootState) =>
  state.addPlayer.isLoading;
export const selectAddPlayerIsError = (state: RootState) =>
  state.addPlayer.errors;

export default addPlayerSlise.reducer;
