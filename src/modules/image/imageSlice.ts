import { createSlice } from "@reduxjs/toolkit";
import { fetchAddImage } from "./imageThunk";

interface IAddImage {
  isLoading: boolean;
  fetchResult: string;
  errors: any;
}

const addInitialState: IAddImage = {
  isLoading: true,
  fetchResult: "",
  errors: null,
};

const addImageSlice = createSlice({
  name: "addImage",
  initialState: addInitialState,
  reducers: {
    reset: (state) => addInitialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAddImage.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAddImage.fulfilled, (state, action) => {
      state.isLoading = false;
      state.fetchResult = action.payload;
    });
    builder.addCase(fetchAddImage.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.error;
    });
  },
});

export const addImageReducer = addImageSlice.reducer;
