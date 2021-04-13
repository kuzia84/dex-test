import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AddNewTeamState, NewTeamDto } from "../api/dto/team.g";
import { addTeamRequest } from "../api/requests/team";
import { RootState } from "./redux/store";

const initialState: AddNewTeamState = {
  isLoading: true,
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
    const response = await fetch(addTeamRequest, requestOptions);
    return await response.json();
  }
);

const addTeamSlise = createSlice({
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
export const selectAddTeamError = (state: RootState) => state.addTeam.errors;

export const addTeamReducer = addTeamSlise.reducer;
