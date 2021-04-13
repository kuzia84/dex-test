import { createAsyncThunk } from "@reduxjs/toolkit";
import { addImageRequest } from "../../api/requests/images";

export const fetchAddImage = createAsyncThunk(
  "image/add",
  async (file: any) => {
    const data = new FormData();
    data.append("file", file);
    const myHeaders = new Headers({
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: data,
    };
    const response = await fetch(addImageRequest, requestOptions);
    return await response.json();
  }
);
