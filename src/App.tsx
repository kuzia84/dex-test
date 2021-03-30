import { Route, Switch } from "react-router-dom";
import Header from "./Components/Header/header";
import Sidebar from "./Components/Sidebar/sidebar";
import TeamCards from "./Routes/TeamCards/screenTeamCards";
import Team from "./Routes/Team/screenTeam";
import PlayersCards from "./Routes/PlayersCards/screenPlayerCards";
import Player from "./Routes/Player/screenPlayer";
import SignIn from "./Routes/SignIn/screenSignIn";
import SignUp from "./Routes/SignUp/screenSignUp";
import AddNewPlayer from "./Routes/AddNewPlayer/sreenAddNewPlayer";
import AddNewTeam from "./Routes/AddNewTeam/screenAddNewTeam";

function App() {
  return (
    <Switch>
      <Route path="/" component={SignIn} exact />
      <Route path="/sign-in" component={SignIn} />
      <Route path="/sign-up" component={SignUp} />
      <Route>
        <div className="page">
          <Header />
          <Sidebar />
          <Switch>
            <div className="page-content">
              <Route path="/teams" component={TeamCards} />
              <Route path="/team" component={Team} />
              <Route path="/players" component={PlayersCards} />
              <Route path="/player" component={Player} />
              <Route path="/new-player" component={AddNewPlayer} />
              <Route path="/new-team" component={AddNewTeam} />
            </div>
          </Switch>
        </div>
      </Route>
    </Switch>
  );
}

export default App;
