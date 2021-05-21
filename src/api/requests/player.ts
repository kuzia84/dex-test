import {
  NewPlayerDto,
  PlayerDto,
  PlayerDtoPageResult,
  PlayerTeamNameDto,
} from "../dto/player.g";
import { addPlayerRequest, updatePlayerRequest } from "../urls";
import { baseRequest } from "./baseRequest";

export const addPlayer = (
  requestData: NewPlayerDto,
  config?: Object
): Promise<NewPlayerDto> => {
  return baseRequest(
    addPlayerRequest,
    Object.assign({ method: "POST", body: JSON.stringify(requestData) }, config)
  ).then((response) => response.json());
};

export const getPlayersList = (
  requestUrl: string,
  config?: Object
): Promise<PlayerDtoPageResult> => {
  return baseRequest(requestUrl, Object.assign({ method: "GET" }, config)).then(
    (response) => response.json()
  );
};

export const getOnePlayer = (
  requestUrl: string,
  config?: Object
): Promise<PlayerTeamNameDto> => {
  return baseRequest(requestUrl, Object.assign({ method: "GET" }, config)).then(
    (response) => response.json()
  );
};

export const getPlayerPositions = (
  requestUrl: string,
  config?: Object
): Promise<string[]> => {
  return baseRequest(requestUrl, Object.assign({ method: "GET" }, config)).then(
    (response) => response.json()
  );
};

export const updatePlayer = (
  requestData: NewPlayerDto,
  config?: Object
): Promise<string> => {
  return baseRequest(
    updatePlayerRequest,
    Object.assign({ method: "PUT", body: JSON.stringify(requestData) }, config)
  ).then((response) => response.json());
};

export const deletePlayer = (
  requestUrl: string,
  config?: Object
): Promise<PlayerDto> => {
  return baseRequest(
    requestUrl,
    Object.assign({ method: "DELETE" }, config)
  ).then((response) => response.json());
};
