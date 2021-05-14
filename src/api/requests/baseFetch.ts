export interface IBaseFetch {
  url: string;
  method: string;
  queryParams?: {};
}
export const baseFetch = ({ url, method = "GET" }: IBaseFetch) => {
  const myHeaders = new Headers({
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });
  const requestOptions = {
    method: method,
    headers: myHeaders,
  };
  return fetch(url, requestOptions);
};
