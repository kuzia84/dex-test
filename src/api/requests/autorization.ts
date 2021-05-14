import { ILoginRequest, ISignUpRequest } from "../dto/autorization.g";
import { signInRequest, signUpRequest } from "../urls";
import { baseRequest } from "./baseRequest";

export const signIn = (
  requestData: ILoginRequest,
  config?: Object
): Promise<any> => {
  return baseRequest(
    signInRequest,
    Object.assign({ method: "POST", body: JSON.stringify(requestData) }, config)
  ).then((response) => response.json());
};

export const signUp = (
  requestData: ISignUpRequest,
  config?: Object
): Promise<any> => {
  return baseRequest(
    signUpRequest,
    Object.assign({ method: "POST", body: JSON.stringify(requestData) }, config)
  ).then((response) => response.json());
};
