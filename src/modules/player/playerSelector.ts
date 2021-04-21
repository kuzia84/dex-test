import { RootState } from "../../core/redux/store";

export const selectAddPlayerData = (state: RootState) =>
  state.player.addFetchResult;
export const selectAddPlayerIsLoading = (state: RootState) =>
  state.player.addIsLoading;
export const selectAddPlayerError = (state: RootState) =>
  state.player.addErrors;
export const selectPlayerPositionsData = (state: RootState) =>
  state.player.getPositionsFetchResult;
export const selectPlayerPositionsIsLoading = (state: RootState) =>
  state.player.getPositionsIsLoading;
export const selectPlayerPositionsError = (state: RootState) =>
  state.player.getPositionsError;
export const selectSinglePlayerData = (state: RootState) =>
  state.player.getOnePlayerFetchResult;
export const selectSinglePlayerIsLoading = (state: RootState) =>
  state.player.getOnePlayerIsLoading;
export const selectSinglePlayerError = (state: RootState) =>
  state.player.getOnePlayerError;
export const selectPlayersData = (state: RootState) =>
  state.player.getPlayersFetchResult;
export const selectPlayersIsLoading = (state: RootState) =>
  state.player.getPlayersIsLoading;
export const selectPlayersError = (state: RootState) =>
  state.player.getPlayersError;
export const selectUpdatePlayerByIdResult = (state: RootState) =>
  state.player.updateFetchResult;
export const selectUpdatePlayerByIdIsLoading = (state: RootState) =>
  state.player.updateIsLoading;
export const selectUpdatePlayerByIdError = (state: RootState) =>
  state.player.updateErrors;
export const selectPlayersFetchSuffix = (state: RootState) =>
  state.player.playersFetchSuffix;
