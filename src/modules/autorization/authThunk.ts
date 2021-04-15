import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ILoginRequest,
  ILoginResult,
  ISignUpRequest,
  ISignUpResult,
} from "../../api/dto/autorization.g";
import { signInRequest, signUpRequest } from "../../api/requests/autorization";

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
    const response = await fetch(signUpRequest, requestOptions);
    const result = (await response.json()) as ISignUpResult;
    if (result.token) {
      localStorage.setItem("token", result.token);
      localStorage.setItem("userName", result.name);
    }
    return result;
  }
);
