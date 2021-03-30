import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { getTeamsSlice } from "./getTeamsSlice";
import { getPlayersSlice } from "./getPlayersSlice";
import { teamsFetchSuffixSlise } from "./teamsFetchSuffix";
import { playersFetchSuffixSlise } from "./playersFetchSuffix";
import { getSinglePlayerSlice } from "./getPlayerSlise";
import { getPlayerPositionsSlice } from "./getPlayerPositionsSlice";
import { addPlayerSlise } from "./addPlayerSlise";
import { selectedIdSlice } from "./selectedIdSlise";
import { sideMenuSlise } from "./sideMenuSlise";
import { addTeamSlise } from "./addTeamSlise";
import { getSingleTeamSlice } from "./getTeamSlise";
import { sidebarStateSlise } from "./sidebarStateSlise";
import { deleteItemByIdSlise } from "./deleteItemById";
import { updateItemByIdSlise } from "./updateItemById";

export const store = configureStore({
  reducer: {
    getTeams: getTeamsSlice.reducer,
    getPlayers: getPlayersSlice.reducer,
    getSinglePlayer: getSinglePlayerSlice.reducer,
    getSingleTeam: getSingleTeamSlice.reducer,
    getPlayerPositions: getPlayerPositionsSlice.reducer,
    teamsFetchSuffix: teamsFetchSuffixSlise.reducer,
    playersFetchSuffix: playersFetchSuffixSlise.reducer,
    addPlayer: addPlayerSlise.reducer,
    addTeam: addTeamSlise.reducer,
    selectedId: selectedIdSlice.reducer,
    sideMenu: sideMenuSlise.reducer,
    sidebarState: sidebarStateSlise.reducer,
    deleteItemById: deleteItemByIdSlise.reducer,
    updateItemById: updateItemByIdSlise.reducer,
  },
  //   middleware: [...getDefaultMiddleware],
});

export type AppDispach = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispach>();
export type RootState = ReturnType<typeof store.getState>;
