import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ILoginRequest,
  ILoginResult,
  ISignUpRequest,
  ISignUpResult,
} from "../../api/dto/autorization.g";
// import { authFetch } from "../../api/requests/autorization";
import { signInRequest, signUpRequest } from "../../api/urls";

export const fetchSignIn = createAsyncThunk<ILoginResult, ILoginRequest>(
  "app/signIn",
  async (data) => {
    // authFetch(data, signInRequest);
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

export const fetchSignUp = createAsyncThunk<ISignUpResult, ISignUpRequest>(
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
