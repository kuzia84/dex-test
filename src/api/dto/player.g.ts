import { IFetchSuffix } from "./components.g";

export interface IPlayersState {
  addIsLoading: boolean;
  addFetchResult: {};
  addErrors: any;
  getPositionsIsLoading: boolean;
  getPositionsFetchResult: string[];
  getPositionsError: any;
  getOnePlayerIsLoading: boolean;
  getOnePlayerFetchResult: PlayerTeamNameDto;
  getOnePlayerError: any;
  getPlayersIsLoading: boolean;
  getPlayersFetchResult: PlayerDtoPageResult;
  getPlayersError: any;
  updateIsLoading: boolean;
  updateFetchResult: {};
  updateErrors: any;
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
  teamName: string;
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
  playerPhoto: any;
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
