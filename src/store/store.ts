import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { getTeamsReducer } from "./getTeamsSlice";
import { getPlayersReducer } from "./getPlayersSlice";
import { teamsFetchSuffixReducer } from "./teamsFetchSuffix";
import { playersFetchSuffixReducer } from "./playersFetchSuffix";
import { getSinglePlayerReducer } from "./getPlayerSlice";
import { getPlayerPositionsReducer } from "./getPlayerPositionsSlice";
import { addPlayerReducer } from "./addPlayerSlice";
import { selectedIdReducer } from "./selectedIdSlice";
import { sideMenuReducer } from "./sideMenuSlice";
import { addTeamReducer } from "./addTeamSlice";
import { getSingleTeamReducer } from "./getTeamSlice";
import { sidebarStateReducer } from "./sidebarStateSlice";
import { deleteItemByIdReducer } from "./deleteItemById";
import { updateTeamByIdReducer } from "./updateTeamById";
import { updatePlayerByIdReducer } from "./updatePlayerById";
import { signInReducer } from "./signInSlice";
import { signUpReducer } from "./signUpSlice";

export const store = configureStore({
  reducer: {
    signIn: signInReducer,
    signUp: signUpReducer,
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
});

export type AppDispach = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispach>();
export type RootState = ReturnType<typeof store.getState>;
