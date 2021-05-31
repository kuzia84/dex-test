export interface IAuthState {
  signInIsLoading: boolean;
  signInFetchResult: ILoginResult;
  signInErrors: null | Object;
  signUpIsLoading: boolean;
  signUpFetchResult: ISignUpResult;
  signUpErrors: null | Object;
}

export interface ILoginRequest {
  login: string;
  password: string;
}
export interface ILoginResult {
  status?: number;
  name: string;
  avatarUrl: string;
  token: string;
}
export type IBadRequest = {
  type?: string;
  title?: string;
  status?: number;
  detail?: string;
  instance?: string;
  traceId?: string;
};
export interface IUnauthorizedResult {
  status?: number;
}

export interface ISignInInputs {
  login: string;
  password: string;
}

export interface ISignUpData {
  agreement: boolean;
  userName: string;
  login: string;
  password: string;
  checkPassword: string;
}
export interface ISignUpRequest {
  userName: string;
  login: string;
  password: string;
}
export interface ISignUpResult {
  status?: number;
  name: string;
  avatarUrl: string;
  token: string;
}
export interface ISignUpInputs {
  userName: string;
  login: string;
  password: string;
  checkPassword: string;
}
