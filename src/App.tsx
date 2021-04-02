import { Redirect, Route, Switch } from "react-router-dom";
import { TeamCards } from "./Routes/TeamCards/screenTeamCards";
import { Team } from "./Routes/Team/screenTeam";
import { PlayersCards } from "./Routes/PlayersCards/screenPlayerCards";
import { Player } from "./Routes/Player/screenPlayer";
import { SignIn } from "./Routes/SignIn/screenSignIn";
import { SignUp } from "./Routes/SignUp/screenSignUp";
import { AddNewPlayer } from "./Routes/AddNewPlayer/screenAddNewPlayer";
import { AddNewTeam } from "./Routes/AddNewTeam/screenAddNewTeam";
import { PageNotFound } from "./Routes/404/screen404";
import { PrivateRoute } from "./Components/PrivateRoute/privateRoute";

export function App() {
  return (
    <Switch>
      <Route path="/" component={SignIn} exact />
      <Route path="/404" component={PageNotFound} />
      <Route path="/sign-in" component={SignIn} />
      <Route path="/sign-up" component={SignUp} />
      <PrivateRoute path="/teams" component={TeamCards} />
      <PrivateRoute path="/team" component={Team} />
      <PrivateRoute path="/players" component={PlayersCards} />
      <PrivateRoute path="/player" component={Player} />
      <PrivateRoute path="/new-player" component={AddNewPlayer} />
      <PrivateRoute path="/new-team" component={AddNewTeam} />
      <Route render={() => <Redirect to="/404" />} />
    </Switch>
  );
}
