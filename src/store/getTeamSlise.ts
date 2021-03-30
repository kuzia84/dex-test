import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SingleTeamPageResultState, TeamDto } from "../Interfaces/interfaces";
import { RootState } from "./store";

const initialState: SingleTeamPageResultState = {
  isLoading: false,
  fetchResult: {
    name: "",
    foundationYear: 0,
    division: "",
    conference: "",
    imageUrl: "",
    id: 0,
  },
  error: null,
};

export const fetchSingleTeamAsync = createAsyncThunk<any, string>(
  "team/fetchTeamData",
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
    return (await response.json()) as TeamDto;
  }
);

const getSingleTeamSlice = createSlice({
  name: "getSingleTeam",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSingleTeamAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSingleTeamAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.fetchResult = action.payload;
    });
    builder.addCase(fetchSingleTeamAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const SelectSingleTeamData = (state: RootState) =>
  state.getSingleTeam.fetchResult;
export const SelectSingleTeamIsLoading = (state: RootState) =>
  state.getSingleTeam.isLoading;
export const SelectSingleTeamError = (state: RootState) =>
  state.getSingleTeam.error;

export const getSingleTeamReducer = getSingleTeamSlice.reducer;
