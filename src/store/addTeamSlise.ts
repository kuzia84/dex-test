import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AddNewPlayerState, NewTeamDto } from "../Interfaces";
import { RootState } from "./store";

const initialState: AddNewPlayerState = {
  isLoading: false,
  fetchResult: {},
  errors: null,
};

export const fetchAddTeam = createAsyncThunk<any, NewTeamDto>(
  "team/addTeam",
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
      "http://dev.trainee.dex-it.ru/api/Team/Add",
      requestOptions
    );
    return await response.json();
  }
);

export const addTeamSlise = createSlice({
  name: "addTeam",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAddTeam.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAddTeam.fulfilled, (state, action) => {
      state.isLoading = false;
      state.fetchResult = action.payload;
    });
    builder.addCase(fetchAddTeam.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.error;
    });
  },
});

export const selectAddTeamData = (state: RootState) =>
  state.addTeam.fetchResult;
export const selectAddTeamIsLoading = (state: RootState) =>
  state.addTeam.isLoading;
export const selectAddTeamIsError = (state: RootState) => state.addTeam.errors;

export default addTeamSlise.reducer;
