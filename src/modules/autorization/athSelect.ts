import { RootState } from "../../core/redux/store";

export const selectSignInResult = (state: RootState) =>
  state.auth.signInFetchResult;
export const selectSignInIsLoading = (state: RootState) =>
  state.auth.signInIsLoading;
export const selectSignInError = (state: RootState) => state.auth.signInErrors;
export const selectSignUpResult = (state: RootState) =>
  state.auth.signUpFetchResult;
export const selectSignUpIsLoading = (state: RootState) =>
  state.auth.signUpIsLoading;
export const selectSignUpError = (state: RootState) => state.auth.signUpErrors;
