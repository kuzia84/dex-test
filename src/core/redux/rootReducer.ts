import { playerReducer } from "../../modules/player/playerSlice";
import { teamReducer } from "../../modules/team/teamSlice";
import { authReducer } from "../../modules/autorization/authSlice";
import { appReducer } from "../../modules/app/appSlice";

export const rootReducer = {
  reducer: {
    app: appReducer,
    auth: authReducer,
    player: playerReducer,
    team: teamReducer,
  },
};
