import { RootState } from "../../core/redux/store";

export const selectAddImageResult = (state: RootState) =>
  state.addImage.fetchResult;
export const selectAddImageIsLoading = (state: RootState) =>
  state.addImage.isLoading;
export const selectAddImageErrors = (state: RootState) => state.addImage.errors;
