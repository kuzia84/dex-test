import { Route, Switch } from "react-router-dom";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import TeamCards from "./Routes/TeamCards";
import Team from "./Routes/Team";
import PlayersCards from "./Routes/PlayersCards";
import Player from "./Routes/Player";
import SignIn from "./Routes/SignIn";
import SignUp from "./Routes/SignUp";
import AddNewPlayer from "./Routes/AddNewPlayer";
import AddNewTeam from "./Routes/AddNewTeam";

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
