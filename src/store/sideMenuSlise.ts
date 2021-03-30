import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface IState {
  menuId: number;
}

const initialState: IState = {
  menuId: 0,
};

export const sideMenuSlise = createSlice({
  name: "sideMenuId",
  initialState,
  reducers: {
    reset: (state) => initialState,
    setMenuId: (state, action) => {
      state.menuId = action.payload;
    },
  },
});

export const { setMenuId } = sideMenuSlise.actions;
export const silectSideMenuId = (state: RootState) => state.sideMenu.menuId;
export default sideMenuSlise.reducer;
