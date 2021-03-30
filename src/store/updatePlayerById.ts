import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NewPlayerDto } from "../Interfaces/interfaces";
import { RootState } from "./store";

interface IUpdatePlayerById {
  isLoading: boolean;
  fetchResult: {};
  errors: any;
}

const initialState: IUpdatePlayerById = {
  isLoading: false,
  fetchResult: {},
  errors: null,
};

export const fetchUpdatePlayerById = createAsyncThunk<string, NewPlayerDto>(
  "player/updatePlayerById",
  async (data) => {
    const myHeaders = new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    });
    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify(data),
    };
    const response = await fetch(
      "http://dev.trainee.dex-it.ru/api/Player/Update",
      requestOptions
    );
    return await response.json();
  }
);

const updatePlayerByIdSlise = createSlice({
  name: "updatePlayerById",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUpdatePlayerById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUpdatePlayerById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.fetchResult = action.payload;
    });
    builder.addCase(fetchUpdatePlayerById.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.error;
    });
  },
});

export const SelectUpdatePlayerByIdResult = (state: RootState) =>
  state.updatePlayerById.fetchResult;
export const SelectUpdatePlayerByIdIsLoading = (state: RootState) =>
  state.updatePlayerById.isLoading;
export const SelectUpdatePlayerByIdError = (state: RootState) =>
  state.updatePlayerById.errors;

export const updatePlayerByIdReducer = updatePlayerByIdSlise.reducer;
