import { ITeamAddData } from "../../api/dto/team.g";
import { baseUrl } from "../../api/requests/baseRequest";
import { addImageRequest } from "../../api/urls";

export const sendTeamImgAndData = (
  file: Blob,
  data: ITeamAddData,
  sendData: (url: string, data: ITeamAddData) => void
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
