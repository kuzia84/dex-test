import { getTeamsReducer } from "../getTeamsSlice";
import { teamsFetchSuffixReducer } from "../teamsFetchSuffix";
import {
  addPlayerReducer,
  getPlayerPositionsReducer,
  getSinglePlayerReducer,
  getPlayersReducer,
  updatePlayerByIdReducer,
  playersFetchSuffixReducer,
} from "../../modules/player/playerSlice";
import { selectedIdReducer } from "../selectedIdSlice";
import { addTeamReducer } from "../addTeamSlice";
import { getSingleTeamReducer } from "../getTeamSlice";
import { sidebarStateReducer } from "../sidebarStateSlice";
import { deleteItemByIdReducer } from "../deleteItemById";
import { updateTeamByIdReducer } from "../updateTeamById";
import { signInReducer } from "../signInSlice";
import { signUpReducer } from "../signUpSlice";

export const rootReducer = {
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
    sidebarState: sidebarStateReducer,
    deleteItemById: deleteItemByIdReducer,
    updateTeamById: updateTeamByIdReducer,
    updatePlayerById: updatePlayerByIdReducer,
  },
};
