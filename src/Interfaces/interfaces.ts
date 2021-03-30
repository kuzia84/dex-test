import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

export interface IMenu {
  id: number;
  name: string;
  img: any;
  active: boolean;
  to: string;
}

export interface TeamDto {
  name: string;
  foundationYear: number;
  division?: string;
  conference?: string;
  imageUrl: string;
  id: number;
  onClick?: (id: number) => void;
}

export interface TeamDtoPageResult {
  data: TeamDto[];
  count: number;
  page: number;
  size: number;
}

export interface TeamDtoPageResultState {
  isLoading: boolean;
  fetchResult: TeamDtoPageResult;
  error: any;
}

export interface IPageSize {
  value: string | number;
  label: string | number;
}

export interface IFetchSuffix {
  searchText: string;
  pageNumber: number;
  pageSize: number;
  teamIds?: string;
}

export interface IEmpty {
  imageUrl: string;
}

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

export interface SingleTeamPageResultState {
  isLoading: boolean;
  fetchResult: TeamDto;
  error: any;
}

export interface PlayerPositionsState {
  isLoading: boolean;
  fetchResult: string[];
  error: any;
}

export interface IPagination {
  loadedCardsNumber: number;
  pageSize: number;
  pageNumber: number;
  setPageNumber: ActionCreatorWithPayload<number, string>;
}

export interface IPageSizeSelect {
  setPageSize: ActionCreatorWithPayload<number, string>;
}

export interface ISearch {
  setSearchText: ActionCreatorWithPayload<string, string>;
}

export interface ITeamSelectOptions {
  value: number;
  label: string;
}

export interface IInputGroupProps {
  label: string;
  type?: string;
  inputName: string;
  errorText: string;
  register: any;
  required?: boolean;
  errors?: any;
}

export type RefReturn =
  | string
  | ((instance: HTMLInputElement | null) => void)
  | React.RefObject<HTMLInputElement>
  | null
  | undefined;

export type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label?: string;
  type?: string;
  inputName: string;
  errorText: string;
  errors: any;
  register: ({ required }: { required?: boolean }) => RefReturn;
};

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

export type ITeamAddInputs = {
  teamPhoto: string;
  teamName: string;
  teamDivision: string;
  teamConference: string;
  teamFoundation: string;
};

export type RefReturnSelect =
  | string
  | ((instance: HTMLSelectElement | null) => void)
  | React.RefObject<HTMLSelectElement>
  | null
  | undefined;

export type SelectProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> & {
  options: { value: number | string; label: string }[];
  label?: string;
  selectName: string;
  errorText: string;
  errors: any;
  register: ({ required }: { required?: boolean }) => RefReturnSelect;
  control: any;
};

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

export interface ITeamAddData {
  teamName: string;
  teamFoundation: number;
  teamDivision: string;
  teamConference: string;
  teamPhoto: any;
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

export interface NewTeamDto {
  name: string;
  foundationYear: number;
  division: string;
  conference: string;
  imageUrl: string;
  id?: number;
}
