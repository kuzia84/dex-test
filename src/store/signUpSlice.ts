import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  ISignUpState,
  ISignUpRequest,
  ISignUpResult,
} from "../Interfaces/interfaces";
import { RootState } from "./store";

const initialState: ISignUpState = {
  isLoading: true,
  fetchResult: {
    name: "",
    avatarUrl: "",
    token: "",
  },
  errors: null,
};

export const fetchSignUp = createAsyncThunk<any, ISignUpRequest>(
  "app/signUp",
  async (data) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(
      "http://dev.trainee.dex-it.ru/api/Auth/SignUp",
      requestOptions
    );
    const result = (await response.json()) as ISignUpResult;
    if (result.token) {
      localStorage.setItem("token", result.token);
      localStorage.setItem("userName", result.name);
    }
    return result;
  }
);

const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSignUp.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSignUp.fulfilled, (state, action) => {
      state.isLoading = false;
      state.fetchResult = action.payload;
    });
    builder.addCase(fetchSignUp.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.error;
    });
  },
});

export const selectSignUpResult = (state: RootState) =>
  state.signUp.fetchResult;
export const selectSignUpIsLoading = (state: RootState) =>
  state.signUp.isLoading;
export const selectSignUpError = (state: RootState) => state.signUp.errors;

export const signUpReducer = signUpSlice.reducer;
