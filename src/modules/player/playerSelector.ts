import { RootState } from "../../core/redux/store";

export const selectAddPlayerData = (state: RootState) =>
  state.addPlayer.fetchResult;
export const selectAddPlayerIsLoading = (state: RootState) =>
  state.addPlayer.isLoading;
export const selectAddPlayerError = (state: RootState) =>
  state.addPlayer.errors;
export const SelectPlayerPositionsData = (state: RootState) =>
  state.getPlayerPositions.fetchResult;
export const SelectPlayerPositionsIsLoading = (state: RootState) =>
  state.getPlayerPositions.isLoading;
export const SelectPlayerPositionsError = (state: RootState) =>
  state.getPlayerPositions.error;
export const SelectSinglePlayerData = (state: RootState) =>
  state.getSinglePlayer.fetchResult;
export const SelectSinglePlayerIsLoading = (state: RootState) =>
  state.getSinglePlayer.isLoading;
export const SelectSinglePlayerError = (state: RootState) =>
  state.getSinglePlayer.error;
export const selectPlayersData = (state: RootState) =>
  state.getPlayers.fetchResult;
export const selectPlayersIsLoading = (state: RootState) =>
  state.getPlayers.isLoading;
export const selectPlayersError = (state: RootState) => state.getPlayers.error;
export const SelectUpdatePlayerByIdResult = (state: RootState) =>
  state.updatePlayerById.fetchResult;
export const SelectUpdatePlayerByIdIsLoading = (state: RootState) =>
  state.updatePlayerById.isLoading;
export const SelectUpdatePlayerByIdError = (state: RootState) =>
  state.updatePlayerById.errors;
export const selectPlayersFetchSuffix = (state: RootState) =>
  state.playersFetchSuffix;
