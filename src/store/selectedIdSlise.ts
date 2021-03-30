import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

const initialState: { id: number } = {
  id: 0,
};

export const selectedIdSlice = createSlice({
  name: "selectedId",
  initialState,
  reducers: {
    resetId: (state) => initialState,
    setId: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const { resetId, setId } = selectedIdSlice.actions;
export const newSelectedId = (state: RootState) => state.selectedId.id;
export default selectedIdSlice.reducer;
