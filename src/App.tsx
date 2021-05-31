import { Redirect, Route, Switch } from "react-router-dom";
import { TeamCards } from "./pages/teamCards/screenTeamCards";
import { Team } from "./pages/team/screenTeam";
import { PlayersCards } from "./pages/playersCards/screenPlayerCards";
import { Player } from "./pages/player/screenPlayer";
import { SignIn } from "./pages/signIn/screenSignIn";
import { SignUp } from "./pages/signUp/screenSignUp";
import { AddNewPlayer } from "./pages/addNewPlayer/screenAddNewPlayer";
import { AddNewTeam } from "./pages/addNewTeam/screenAddNewTeam";
import { PageNotFound } from "./pages/404/screen404";
import { PrivateRoute } from "./components/privateRoute/privateRoute";
import {
  homeLnk,
  newPlayerLnk,
  newTeamLnk,
  notFoundLnk,
  playerLnk,
  playersLnk,
  signInLnk,
  signUpLnk,
  teamLnk,
  teamsLnk,
} from "./pages/routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function App() {
  return (
    <Switch>
      <Route path={homeLnk} component={SignIn} exact />
      <Route path={notFoundLnk} component={PageNotFound} exact />
      <Route path={signInLnk} component={SignIn} exact />
      <Route path={signUpLnk} component={SignUp} exact />
      <PrivateRoute path={teamsLnk} component={TeamCards} exact />
      <PrivateRoute path={teamLnk} component={Team} exact />
      <PrivateRoute path={newTeamLnk} component={AddNewTeam} exact />
      <PrivateRoute path={playersLnk} component={PlayersCards} exact />
      <PrivateRoute path={playerLnk} component={Player} exact />
      <PrivateRoute path={newPlayerLnk} component={AddNewPlayer} exact />
      <Route render={() => <Redirect to={notFoundLnk} />} />
      <ToastContainer />
    </Switch>
  );
}
