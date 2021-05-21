import { Redirect, Route, RouteProps } from "react-router";
import { homeLnk } from "../../pages/routes";

export function PrivateRoute({ ...routeProps }: RouteProps) {
  if (localStorage.getItem("token")) {
    return <Route {...routeProps} />;
  } else {
    return <Redirect to={{ pathname: homeLnk }} />;
  }
}
