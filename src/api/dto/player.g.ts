import { IFetchSuffix } from "./components.g";

export interface IPlayersState {
  addIsLoading: boolean;
  addFetchResult: {};
  addErrors: null | Object;
  getPositionsIsLoading: boolean;
  getPositionsFetchResult: string[];
  getPositionsError: null | Object;
  getOnePlayerIsLoading: boolean;
  getOnePlayerFetchResult: PlayerTeamNameDto;
  getOnePlayerError: null | Object;
  getPlayersIsLoading: boolean;
  getPlayersFetchResult: PlayerDtoPageResult;
  getPlayersError: null | Object;
  updateIsLoading: boolean;
  updateFetchResult: {};
  updateErrors: null | Object;
  deleteIsLoading: boolean;
  deleteFetchResult: PlayerDto;
  deleteErrors: null | Object;
  playersFetchSuffix: IFetchSuffix;
}

export interface PlayerDto {
  name: string;
  number: number;
  position?: string;
  team?: number;
  birthday?: string;
  height?: number;
  weight?: number;
  avatarUrl: string;
  id: number;
  onClick?: (id: number) => void;
}

export interface PlayerTeamNameDto {
  name: string;
  number: number;
  position?: string;
  teamId: number;
  birthday?: string;
  height?: number;
  weight?: number;
  avatarUrl: string;
  id: number;
  teamName?: string;
}

export interface PlayerDtoPageResult {
  data: PlayerDto[];
  count: number;
  page: number;
  size: number;
}

export interface IPlayerAddData {
  playerBirthday: string;
  playerHeight: number;
  playerName: string;
  playerNumber: number;
  playerPhoto: Blob[];
  playerPosition: { value: string; label: string };
  playerTeam: { value: number; label: string };
  playerWeight: number;
}

export interface NewPlayerDto {
  name: string;
  number: number;
  position: string;
  team: number;
  birthday: string;
  height: number;
  weight: number;
  avatarUrl: string;
  id?: number;
}

export type IPlayerAddInputs = {
  playerPhoto: string;
  playerName: string;
  playerPosition: string;
  playerTeam: string;
  playerHeight: number;
  playerWeight: number;
  playerBirthday: string;
  playerNumber: number;
};
