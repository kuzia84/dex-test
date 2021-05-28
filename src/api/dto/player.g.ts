import { IFetchSuffix } from "./components.g";

export interface IPlayersState {
  addIsLoading: boolean;
  addFetchResult: {};
  addErrors: null | FetchErrorType;
  getPositionsIsLoading: boolean;
  getPositionsFetchResult: string[];
  getPositionsError: null | FetchErrorType;
  getOnePlayerIsLoading: boolean;
  getOnePlayerFetchResult: PlayerTeamNameDto;
  getOnePlayerError: null | FetchErrorType;
  getPlayersIsLoading: boolean;
  getPlayersFetchResult: PlayerDtoPageResult;
  getPlayersError: null | FetchErrorType;
  updateIsLoading: boolean;
  updateFetchResult: {};
  updateErrors: null | FetchErrorType;
  deleteIsLoading: boolean;
  deleteFetchResult: PlayerDto;
  deleteErrors: null | FetchErrorType;
  playersFetchSuffix: IFetchSuffix;
}

export type FetchErrorType = {
  message?: string;
  name?: string;
  stack?: string;
};

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

export type IPlayerAddData = {
  playerBirthday: string;
  playerHeight: number;
  playerName: string;
  playerNumber: number;
  playerPhoto: Blob[];
  playerPosition: { value: string; label: string };
  playerTeam: { value: number; label: string };
  playerWeight: number;
};

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

export type playersRequestType = {
  requesrUrl: string;
  searchText?: string | undefined;
  teamIds?: string | undefined;
  pageNumber?: number;
  pageSize?: number;
};

export type playersQueryType = {
  name?: string | undefined;
  teamIds?: string[];
  page?: string;
  pageSize?: string;
};
