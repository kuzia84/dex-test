import { IFetchSuffix } from "./components.g";

export interface ITeamState {
  addIsLoading: boolean;
  addFetchResult: {};
  addErrors: any;
  getOneTeamIsLoading: boolean;
  getOneTeamFetchResult: TeamDto;
  getOneTeamError: any;
  getTeamsIsLoading: boolean;
  getTeamsFetchResult: TeamDtoPageResult;
  getTeamsError: any;
  updateIsLoading: boolean;
  updateFetchResult: {};
  updateErrors: any;
  teamsFetchSuffix: IFetchSuffix;
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

export interface ITeamSelectOptions {
  value: number;
  label: string;
}

export type ITeamAddInputs = {
  teamPhoto: string;
  teamName: string;
  teamDivision: string;
  teamConference: string;
  teamFoundation: string;
};

export interface ITeamAddData {
  teamName: string;
  teamFoundation: number;
  teamDivision: string;
  teamConference: string;
  teamPhoto: any;
}

export interface NewTeamDto {
  name: string;
  foundationYear: number;
  division: string;
  conference: string;
  imageUrl: string;
  id?: number;
}
