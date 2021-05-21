import { RootState } from "../../core/redux/store";

export const selectAddTeamData = (state: RootState) =>
  state.team.addFetchResult;
export const selectAddTeamIsLoading = (state: RootState) =>
  state.team.addIsLoading;
export const selectAddTeamError = (state: RootState) => state.team.addErrors;
export const selectSingleTeamData = (state: RootState) =>
  state.team.getOneTeamFetchResult;
export const selectSingleTeamIsLoading = (state: RootState) =>
  state.team.getOneTeamIsLoading;
export const selectSingleTeamError = (state: RootState) =>
  state.team.getOneTeamError;
export const selectTeamsData = (state: RootState) =>
  state.team.getTeamsFetchResult;
export const selectTeamsIsLoading = (state: RootState) =>
  state.team.getTeamsIsLoading;
export const selectTeamsErrors = (state: RootState) => state.team.getTeamsError;
export const selectUpdateTeamByIdResult = (state: RootState) =>
  state.team.updateFetchResult;
export const selectUpdateTeamByIdIsLoading = (state: RootState) =>
  state.team.updateIsLoading;
export const selectUpdateTeamByIdError = (state: RootState) =>
  state.team.updateErrors;
export const selectDeleteTeamByIdResult = (state: RootState) =>
  state.team.deleteFetchResult;
export const selectDeleteTeamByIdIsloading = (state: RootState) =>
  state.team.deleteIsLoading;
export const selectDeleteTeamByIdError = (state: RootState) =>
  state.team.deleteErrors;
export const selectTeamsFetchSuffix = (state: RootState) =>
  state.team.teamsFetchSuffix;
