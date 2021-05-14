import { NewTeamDto } from "../dto/team.g";
import { addTeamRequest, updateTeamRequest } from "../urls";
import { baseRequest } from "./baseRequest";

export const addTeam = (
  requestData: NewTeamDto,
  config?: Object
): Promise<any> => {
  return baseRequest(
    addTeamRequest,
    Object.assign({ method: "POST", body: JSON.stringify(requestData) }, config)
  ).then((response) => response.json());
};

export const getTeamsList = (
  requestUrl: string,
  config?: Object
): Promise<any> => {
  return baseRequest(requestUrl, Object.assign({ method: "GET" }, config)).then(
    (response) => response.json()
  );
};

export const getOneTeam = (
  requestUrl: string,
  config?: Object
): Promise<any> => {
  return baseRequest(requestUrl, Object.assign({ method: "GET" }, config)).then(
    (response) => response.json()
  );
};

export const updateTeam = (
  requestData: NewTeamDto,
  config?: Object
): Promise<any> => {
  return baseRequest(
    updateTeamRequest,
    Object.assign({ method: "PUT", body: JSON.stringify(requestData) }, config)
  ).then((response) => response.json());
};
