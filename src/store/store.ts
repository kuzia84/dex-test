import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { getTeamsReducer } from "./getTeamsSlice";
import { getPlayersReducer } from "./getPlayersSlice";
import { teamsFetchSuffixReducer } from "./teamsFetchSuffix";
import { playersFetchSuffixReducer } from "./playersFetchSuffix";
import { getSinglePlayerReducer } from "./getPlayerSlise";
import { getPlayerPositionsReducer } from "./getPlayerPositionsSlice";
import { addPlayerReducer } from "./addPlayerSlise";
import { selectedIdReducer } from "./selectedIdSlise";
import { sideMenuReducer } from "./sideMenuSlise";
import { addTeamReducer } from "./addTeamSlise";
import { getSingleTeamReducer } from "./getTeamSlise";
import { sidebarStateReducer } from "./sidebarStateSlise";
import { deleteItemByIdReducer } from "./deleteItemById";
import { updateTeamByIdReducer } from "./updateTeamById";
import { updatePlayerByIdReducer } from "./updatePlayerById";

export const store = configureStore({
  reducer: {
    getTeams: getTeamsReducer,
    getPlayers: getPlayersReducer,
    getSinglePlayer: getSinglePlayerReducer,
    getSingleTeam: getSingleTeamReducer,
    getPlayerPositions: getPlayerPositionsReducer,
    teamsFetchSuffix: teamsFetchSuffixReducer,
    playersFetchSuffix: playersFetchSuffixReducer,
    addPlayer: addPlayerReducer,
    addTeam: addTeamReducer,
    selectedId: selectedIdReducer,
    sideMenu: sideMenuReducer,
    sidebarState: sidebarStateReducer,
    deleteItemById: deleteItemByIdReducer,
    updateTeamById: updateTeamByIdReducer,
    updatePlayerById: updatePlayerByIdReducer,
  },
  //   middleware: [...getDefaultMiddleware],
});

export type AppDispach = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispach>();
export type RootState = ReturnType<typeof store.getState>;
