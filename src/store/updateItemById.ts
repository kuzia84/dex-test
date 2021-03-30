import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface IUpdateItebById {
  isLoading: boolean;
  fetchResult: {};
  errors: any;
}

const initialState: IUpdateItebById = {
  isLoading: false,
  fetchResult: {},
  errors: null,
};

export const fetchUpdateItemById = createAsyncThunk(
  "app/updateItemById",
  async (request: string, data: {}) => {
    const myHeaders = new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    });
    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify(data),
    };
    const response = await fetch(request, requestOptions);
    return await response.json();
  }
);

export const updateItemByIdSlise = createSlice({
  name: "updateItemById",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUpdateItemById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUpdateItemById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.fetchResult = action.payload;
    });
    builder.addCase(fetchUpdateItemById.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.error;
    });
  },
});

export const SelectUpdateItemByIdResult = (state: RootState) =>
  state.updateItemById.fetchResult;
export const SelectUpdateItemByIdIsLoading = (state: RootState) =>
  state.updateItemById.isLoading;
export const SelectUpdateItemByIdError = (state: RootState) =>
  state.updateItemById.errors;

export default updateItemByIdSlise.reducer;
