import {
  ILoginRequest,
  ILoginResult,
  ISignUpRequest,
  ISignUpResult,
} from "../dto/autorization.g";
import { signInRequest, signUpRequest } from "../urls";
import { baseRequest } from "./baseRequest";

export const signIn = (
  requestData: ILoginRequest,
  config?: Object
): Promise<ILoginResult> => {
  return baseRequest(
    signInRequest,
    Object.assign({ method: "POST", body: JSON.stringify(requestData) }, config)
  ).then((response) => response.json());
};

export const signUp = (
  requestData: ISignUpRequest,
  config?: Object
): Promise<ISignUpResult> => {
  return baseRequest(
    signUpRequest,
    Object.assign({ method: "POST", body: JSON.stringify(requestData) }, config)
  ).then((response) => response.json());
};
