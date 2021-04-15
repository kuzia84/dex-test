export interface IAuthState {
  signInIsLoading: boolean;
  signInFetchResult: ILoginResult;
  signInErrors: any;
  signUpIsLoading: boolean;
  signUpFetchResult: ISignUpResult;
  signUpErrors: any;
}

export interface ILoginRequest {
  login: string;
  password: string;
}
export interface ILoginResult {
  name: string;
  avatarUrl: string;
  token: string;
}
export interface IBadRequest {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
}
export interface IUnauthorizedResult {
  statusCode: number;
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
