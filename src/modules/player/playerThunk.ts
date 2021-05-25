import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  NewPlayerDto,
  PlayerDto,
  PlayerDtoPageResult,
  playersRequestType,
  PlayerTeamNameDto,
} from "../../api/dto/player.g";
import {
  addPlayer,
  getPlayerPositions,
  getOnePlayer,
  getPlayersList,
  updatePlayer,
  deletePlayer,
} from "../../api/requests/player";

export const fetchAddPlayer = createAsyncThunk<NewPlayerDto, NewPlayerDto>(
  "player/addPlayer",
  async (data) => {
    const response = await addPlayer(data);
    return await response;
  }
);

export const fetchPlayerPositionsAsync = createAsyncThunk<string[], string>(
  "player/fetchPlayerPosition",
  async (request) => {
    const response = await getPlayerPositions(request);
    return await response;
  }
);

export const fetchSinglePlayerAsync = createAsyncThunk<
  PlayerTeamNameDto,
  string
>("player/fetchPlayerData", async (request) => {
  const response = await getOnePlayer(request);
  return (await response) as PlayerTeamNameDto;
});

export const fetchPlayersAsync = createAsyncThunk<
  PlayerDtoPageResult,
  playersRequestType
>(
  "players/fetchPlayersData",
  async ({ requesrUrl, searchText, teamIds, pageNumber, pageSize }) => {
    const request = `${requesrUrl}?Name=${searchText}${teamIds}&Page=${pageNumber}&PageSize=${pageSize}`;
    const response = await getPlayersList(request);
    return (await response) as PlayerDtoPageResult;
  }
);

export const fetchUpdatePlayerById = createAsyncThunk<string, NewPlayerDto>(
  "player/updatePlayerById",
  async (data) => {
    const response = await updatePlayer(data);
    return await response;
  }
);

export const fetchDeletePlayerById = createAsyncThunk<PlayerDto, string>(
  "app/deleteItemById",
  async (request) => {
    const response = await deletePlayer(request);
    return await response;
  }
);
