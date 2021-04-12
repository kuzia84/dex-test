import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  NewPlayerDto,
  PlayerDtoPageResult,
  PlayerTeamNameDto,
} from "../../api/dto/player.g";
import {
  addPlayerRequest,
  updatePlayerByIdRequest,
} from "../../api/requests/player";

export const fetchAddPlayer = createAsyncThunk<any, NewPlayerDto>(
  "player/addPlayer",
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
    const response = await fetch(addPlayerRequest, requestOptions);
    return await response.json();
  }
);

export const fetchPlayerPositionsAsync = createAsyncThunk<any, string>(
  "player/fetchPlayerPosition",
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
    return (await response.json()) as string[];
  }
);

export const fetchSinglePlayerAsync = createAsyncThunk<any, string>(
  "player/fetchPlayerData",
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
    return (await response.json()) as PlayerTeamNameDto;
  }
);

export const fetchPlayersAsync = createAsyncThunk<any, string>(
  "players/fatchPlayersData",
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
    return (await response.json()) as PlayerDtoPageResult;
  }
);

export const fetchUpdatePlayerById = createAsyncThunk<string, NewPlayerDto>(
  "player/updatePlayerById",
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
    const response = await fetch(updatePlayerByIdRequest, requestOptions);
    return await response.json();
  }
);
