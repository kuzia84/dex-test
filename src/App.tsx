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

export function App() {
  return (
    <Switch>
      <Route path="/" component={SignIn} exact />
      <Route path="/404" component={PageNotFound} exact />
      <Route path="/sign-in" component={SignIn} exact />
      <Route path="/sign-up" component={SignUp} exact />
      <PrivateRoute path="/teams" component={TeamCards} exact />
      <PrivateRoute path="/teams/team" component={Team} exact />
      <PrivateRoute path="/teams/new-team" component={AddNewTeam} exact />
      <PrivateRoute path="/players" component={PlayersCards} exact />
      <PrivateRoute path="/players/player" component={Player} exact />
      <PrivateRoute path="/players/new-player" component={AddNewPlayer} exact />
      <Route render={() => <Redirect to="/404" />} />
    </Switch>
  );
}
