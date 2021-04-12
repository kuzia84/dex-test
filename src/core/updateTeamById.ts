import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NewTeamDto } from "../api/dto/team.g";
import { RootState } from "./redux/store";

interface IUpdateTeamById {
  isLoading: boolean;
  fetchResult: {};
  errors: any;
}

const initialState: IUpdateTeamById = {
  isLoading: true,
  fetchResult: {},
  errors: null,
};

export const fetchUpdateTeamById = createAsyncThunk<string, NewTeamDto>(
  "team/updateTeamById",
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
      "http://dev.trainee.dex-it.ru/api/Team/Update",
      requestOptions
    );
    return await response.json();
  }
);

const updateTeamByIdSlise = createSlice({
  name: "updateTeamById",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUpdateTeamById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUpdateTeamById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.fetchResult = action.payload;
    });
    builder.addCase(fetchUpdateTeamById.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.error;
    });
  },
});

export const SelectUpdateTeamByIdResult = (state: RootState) =>
  state.updateTeamById.fetchResult;
export const SelectUpdateTeamByIdIsLoading = (state: RootState) =>
  state.updateTeamById.isLoading;
export const SelectUpdateTeamByIdError = (state: RootState) =>
  state.updateTeamById.errors;

export const updateTeamByIdReducer = updateTeamByIdSlise.reducer;
