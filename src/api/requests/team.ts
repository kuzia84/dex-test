import { NewTeamDto, TeamDto, TeamDtoPageResult } from "../dto/team.g";
import { addTeamRequest, updateTeamRequest } from "../urls";
import { baseRequest } from "./baseRequest";

export const addTeam = (
  requestData: NewTeamDto,
  config?: Object
): Promise<NewTeamDto> => {
  return baseRequest(
    addTeamRequest,
    Object.assign({ method: "POST", body: JSON.stringify(requestData) }, config)
  ).then((response) => response.json());
};

export const getTeamsList = (
  requestUrl: string,
  config?: Object
): Promise<TeamDtoPageResult> => {
  return baseRequest(requestUrl, Object.assign({ method: "GET" }, config)).then(
    (response) => response.json()
  );
};

export const getOneTeam = (
  requestUrl: string,
  config?: Object
): Promise<TeamDto> => {
  return baseRequest(requestUrl, Object.assign({ method: "GET" }, config)).then(
    (response) => response.json()
  );
};

export const updateTeam = (
  requestData: NewTeamDto,
  config?: Object
): Promise<string> => {
  return baseRequest(
    updateTeamRequest,
    Object.assign({ method: "PUT", body: JSON.stringify(requestData) }, config)
  ).then((response) => response.json());
};

export const deleteTeam = (
  requestUrl: string,
  config?: Object
): Promise<TeamDto> => {
  return baseRequest(
    requestUrl,
    Object.assign({ method: "DELETE" }, config)
  ).then((response) => response.json());
};
