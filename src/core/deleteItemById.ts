import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./redux/store";

interface IDeleteItemById {
  isLoading: boolean;
  fetchResult: {
    name: string;
  };
  errors: any;
}
const initialState: IDeleteItemById = {
  isLoading: true,
  fetchResult: {
    name: "",
  },
  errors: null,
};

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

const deleteItemByIdSlise = createSlice({
  name: "deleteItemById",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDeleteItemById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchDeleteItemById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.fetchResult = action.payload;
    });
    builder.addCase(fetchDeleteItemById.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.error;
    });
  },
});

export const SelectDeleteItemByIdResult = (state: RootState) =>
  state.deleteItemById.fetchResult;
export const SelectDeleteItemByIdIsloading = (state: RootState) =>
  state.deleteItemById.isLoading;
export const SelectDeleteItemByIdError = (state: RootState) =>
  state.deleteItemById.errors;

export const deleteItemByIdReducer = deleteItemByIdSlise.reducer;
