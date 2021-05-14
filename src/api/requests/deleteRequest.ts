import { baseRequest } from "./baseRequest";

export const deleteRequest = (
  requestUrl: string,
  config?: Object
): Promise<any> => {
  return baseRequest(
    requestUrl,
    Object.assign({ method: "DELETE" }, config)
  ).then((response) => response.json());
};
