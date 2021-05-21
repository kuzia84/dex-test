const baseUrl = "http://dev.trainee.dex-it.ru";

export const baseRequest = async (url: string, config: Object) => {
  const response = await fetch(baseUrl + url, {
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    }),
    ...config,
  });
  return response;
};
