import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteRequest } from "../../api/requests/deleteRequest";

export const fetchDeleteItemById = createAsyncThunk(
  "app/deleteItemById",
  async (request: string) => {
    const response = await deleteRequest(request);
    return await response;
  }
);
