import { ILoginRequest, ISignUpRequest } from "../dto/autorization.g";

export const authFetch = (
  data: ILoginRequest | ISignUpRequest,
  authRequest: string
) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  return fetch(authRequest, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      localStorage.setItem("token", result.token);
      localStorage.setItem("userName", result.name);
    });
};
