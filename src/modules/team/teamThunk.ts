import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  NewTeamDto,
  TeamDto,
  TeamDtoPageResult,
  teamsRequestType,
} from "../../api/dto/team.g";
import {
  addTeam,
  deleteTeam,
  getOneTeam,
  getTeamsList,
  updateTeam,
} from "../../api/requests/team";

export const fetchAddTeam = createAsyncThunk<NewTeamDto, NewTeamDto>(
  "team/addTeam",
  async (request) => {
    const response = await addTeam(request);
    return await response;
  }
);

export const fetchSingleTeamAsync = createAsyncThunk<TeamDto, string>(
  "team/fetchTeamData",
  async (request) => {
    const response = await getOneTeam(request);
    return (await response) as TeamDto;
  }
);

export const fetchTeamsAsync = createAsyncThunk<
  TeamDtoPageResult,
  teamsRequestType
>(
  "teams/fetchTeamsData",
  async ({ requesrUrl, searchText, pageNumber, pageSize }) => {
    const request = `${requesrUrl}?Name=${searchText}&Page=${pageNumber}&PageSize=${pageSize}`;
    const response = await getTeamsList(request);
    return (await response) as TeamDtoPageResult;
  }
);

export const fetchUpdateTeamById = createAsyncThunk<string, NewTeamDto>(
  "team/updateTeamById",
  async (data) => {
    const response = await updateTeam(data);
    return await response;
  }
);

export const fetchDeleteTeamById = createAsyncThunk<TeamDto, string>(
  "app/deleteItemById",
  async (request) => {
    const response = await deleteTeam(request);
    return await response;
  }
);
