export interface PlayerDto {
  name: string;
  number: number;
  position?: string;
  team?: number;
  birthday?: any;
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
  birthday?: any;
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

export interface PlayerDtoPageResultState {
  isLoading: boolean;
  fetchResult: PlayerDtoPageResult;
  error: any;
}

export interface SinglePlayerPageResultState {
  isLoading: boolean;
  fetchResult: PlayerTeamNameDto;
  error: any;
}

export interface PlayerPositionsState {
  isLoading: boolean;
  fetchResult: string[];
  error: any;
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

export interface AddNewPlayerState {
  isLoading: boolean;
  fetchResult: {};
  errors: any;
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

export interface IUpdatePlayerById {
  isLoading: boolean;
  fetchResult: {};
  errors: any;
}
