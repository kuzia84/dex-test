import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchDeleteItemById = createAsyncThunk(
  "app/deleteItemById",
  async (request: string) => {
    const myHeaders = new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    });
    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
    };
    const response = await fetch(request, requestOptions);
    return await response.json();
  }
);
