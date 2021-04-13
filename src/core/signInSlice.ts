import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  ISignInState,
  ILoginRequest,
  ILoginResult,
} from "../api/dto/autorization.g";
import { signInRequest } from "../api/requests/autorization";
import { RootState } from "./redux/store";

const initialState: ISignInState = {
  isLoading: true,
  fetchResult: {
    name: "",
    avatarUrl: "",
    token: "",
  },
  errors: null,
};

export const fetchSignIn = createAsyncThunk<any, ILoginRequest>(
  "app/signIn",
  async (data) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(signInRequest, requestOptions);
    const result = (await response.json()) as ILoginResult;
    if (result.token) {
      localStorage.setItem("token", result.token);
      localStorage.setItem("userName", result.name);
    }
    return result;
  }
);

const signInSlice = createSlice({
  name: "signIn",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSignIn.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSignIn.fulfilled, (state, action) => {
      state.isLoading = false;
      state.fetchResult = action.payload;
    });
    builder.addCase(fetchSignIn.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.error;
    });
  },
});

export const selectSignInResult = (state: RootState) =>
  state.signIn.fetchResult;
export const selectSignInIsLoading = (state: RootState) =>
  state.signIn.isLoading;
export const selectSignInError = (state: RootState) => state.signIn.errors;

export const signInReducer = signInSlice.reducer;
