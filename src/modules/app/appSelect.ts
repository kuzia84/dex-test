import { RootState } from "../../core/redux/store";

export const selectSidebrSate = (state: RootState) => state.app.sidebarShow;
export const SelectDeleteItemByIdResult = (state: RootState) =>
  state.app.deleteFetchResult;
export const SelectDeleteItemByIdIsloading = (state: RootState) =>
  state.app.deleteIsLoading;
export const SelectDeleteItemByIdError = (state: RootState) =>
  state.app.deleteErrors;
