import { createAsyncThunk } from "@reduxjs/toolkit";
import { NewTeamDto, TeamDto, TeamDtoPageResult } from "../../api/dto/team.g";
import { addTeamRequest, updateTeamRequest } from "../../api/requests/team";

export const fetchAddTeam = createAsyncThunk<NewTeamDto, NewTeamDto>(
  "team/addTeam",
  async (data) => {
    const myHeaders = new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(data),
    };
    const response = await fetch(addTeamRequest, requestOptions);
    return await response.json();
  }
);

export const fetchSingleTeamAsync = createAsyncThunk<TeamDto, string>(
  "team/fetchTeamData",
  async (request) => {
    const myHeaders = new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    });
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    const response = await fetch(request, requestOptions);
    return (await response.json()) as TeamDto;
  }
);

export const fetchTeamsAsync = createAsyncThunk<TeamDtoPageResult, string>(
  "teams/fetchTeamsData",
  async (request) => {
    const myHeaders = new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    });
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    const response = await fetch(request, requestOptions);
    return (await response.json()) as TeamDtoPageResult;
  }
);

export const fetchUpdateTeamById = createAsyncThunk<string, NewTeamDto>(
  "team/updateTeamById",
  async (data) => {
    const myHeaders = new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    });
    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify(data),
    };
    const response = await fetch(updateTeamRequest, requestOptions);
    return await response.json();
  }
);
