import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ILoginRequest,
  ILoginResult,
  ISignUpRequest,
  ISignUpResult,
} from "../../api/dto/autorization.g";
import { signIn, signUp } from "../../api/requests/autorization";

export const fetchSignIn = createAsyncThunk<ILoginResult, ILoginRequest>(
  "app/signIn",
  async (data) => {
    const response = await signIn(data);
    const result = (await response) as ILoginResult;
    if (result.token) {
      localStorage.setItem("token", result.token);
      localStorage.setItem("userName", result.name);
    }
    return result;
  }
);

export const fetchSignUp = createAsyncThunk<ISignUpResult, ISignUpRequest>(
  "app/signUp",
  async (data) => {
    const response = await signUp(data);
    const result = (await response) as ISignUpResult;
    if (result.token) {
      localStorage.setItem("token", result.token);
      localStorage.setItem("userName", result.name);
    }
    return result;
  }
);
