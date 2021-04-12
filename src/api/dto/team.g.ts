export interface TeamDto {
  name: string;
  foundationYear: number;
  division?: string;
  conference?: string;
  imageUrl: string;
  id: number;
  onClick?: (id: number) => void;
}

export interface SingleTeamPageResultState {
  isLoading: boolean;
  fetchResult: TeamDto;
  error: any;
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

export interface AddNewTeamState {
  isLoading: boolean;
  fetchResult: {};
  errors: any;
}

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
