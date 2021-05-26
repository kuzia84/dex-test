import { IPlayerAddData } from "../../api/dto/player.g";
import { baseUrl } from "../../api/requests/baseRequest";
import { addImageRequest } from "../../api/urls";

export const sendPlayerImgAndData = (
  file: Blob,
  data: IPlayerAddData,
  sendData: (url: string, data: IPlayerAddData) => void
) => {
  const dataForm = new FormData();
  dataForm.append("file", file);
  window
    .fetch(baseUrl + addImageRequest, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      mode: "cors",
      body: dataForm,
    })
    .then((response) => {
      return response.json();
    })
    .then((url) => {
      sendData(url, data);
    });
};
