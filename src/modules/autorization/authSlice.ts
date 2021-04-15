import { createSlice } from "@reduxjs/toolkit";
import { IAuthState } from "../../api/dto/autorization.g";
import { fetchSignIn, fetchSignUp } from "./authThunk";

const initialState: IAuthState = {
  signInIsLoading: true,
  signInFetchResult: {
    name: "",
    avatarUrl: "",
    token: "",
  },
  signInErrors: null,
  signUpIsLoading: true,
  signUpFetchResult: {
    name: "",
    avatarUrl: "",
    token: "",
  },
  signUpErrors: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSignIn.pending, (state) => {
      state.signInIsLoading = true;
    });
    builder.addCase(fetchSignIn.fulfilled, (state, action) => {
      state.signInIsLoading = false;
      state.signInFetchResult = action.payload;
    });
    builder.addCase(fetchSignIn.rejected, (state, action) => {
      state.signInIsLoading = false;
      state.signInErrors = action.error;
    });
    builder.addCase(fetchSignUp.pending, (state) => {
      state.signUpIsLoading = true;
    });
    builder.addCase(fetchSignUp.fulfilled, (state, action) => {
      state.signUpIsLoading = false;
      state.signUpFetchResult = action.payload;
    });
    builder.addCase(fetchSignUp.rejected, (state, action) => {
      state.signUpIsLoading = false;
      state.signUpErrors = action.error;
    });
  },
});

export const authReducer = authSlice.reducer;
