import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TeamDtoPageResult, TeamDtoPageResultState } from "../Interfaces";
import { RootState } from "./store";

const initialState: TeamDtoPageResultState = {
  isLoading: true,
  fetchResult: {
    data: [],
    count: 0,
    page: 1,
    size: 6,
  },
  error: null,
};

export const fetchTeamsAsync = createAsyncThunk<any, string>(
  "teams/fatchData",
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
    return (await response.json()) as TeamDtoPageResult;
  }
);

export const getTeamsSlice = createSlice({
  name: "getTeams",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTeamsAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTeamsAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.fetchResult = action.payload;
    });
    builder.addCase(fetchTeamsAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const { reset } = getTeamsSlice.actions;
export const selectTeamsData = (state: RootState) => state.getTeams.fetchResult;
export const selectTeamsIsLoading = (state: RootState) =>
  state.getTeams.isLoading;
export const selectTeamsError = (state: RootState) => state.getTeams.error;

export default getTeamsSlice.reducer;
