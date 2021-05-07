import { ILoginRequest, ISignUpRequest } from "../dto/autorization.g";

export const authFetch = async (
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
  const response = await fetch(authRequest, requestOptions);
  const result = await response.json();
  if (result.token) {
    localStorage.setItem("token", result.token);
    localStorage.setItem("userName", result.name);
  }
  return result;
};
