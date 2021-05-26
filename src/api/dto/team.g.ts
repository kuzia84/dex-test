import { IFetchSuffix } from "./components.g";

export interface ITeamState {
  addIsLoading: boolean;
  addFetchResult: {};
  addErrors: null | Object;
  getOneTeamIsLoading: boolean;
  getOneTeamFetchResult: TeamDto;
  getOneTeamError: null | Object;
  getTeamsIsLoading: boolean;
  getTeamsFetchResult: TeamDtoPageResult;
  getTeamsError: null | Object;
  updateIsLoading: boolean;
  updateFetchResult: {};
  updateErrors: null | Object;
  deleteIsLoading: boolean;
  deleteFetchResult: TeamDto;
  deleteErrors: null | Object;
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

export type ITeamAddData = {
  teamName: string;
  teamFoundation: number;
  teamDivision: string;
  teamConference: string;
  teamPhoto: Blob[];
};

export interface NewTeamDto {
  name: string;
  foundationYear: number;
  division: string;
  conference: string;
  imageUrl: string;
  id?: number;
}

export type teamsRequestType = {
  requesrUrl: string;
  searchText?: string | undefined;
  pageNumber?: number;
  pageSize?: number;
};

export type teamsQueryType = {
  name?: string | undefined;
  page?: string;
  pageSize?: string;
};
