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
export interface ISignInState {
  isLoading: boolean;
  fetchResult: ILoginResult;
  errors: any;
}
export interface ISignInInputs {
  login: string;
  password: string;
}

export interface ISignUpState {
  isLoading: boolean;
  fetchResult: ISignUpResult;
  errors: any;
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
