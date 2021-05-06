import { Route, Redirect } from "react-router-dom";
import { homeLnk } from "../../pages/routes";

export const PrivateRoute = ({ component: Component, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={(props: any) =>
        localStorage.getItem("token") ? (
          <Component {...props} />
        ) : (
          <Redirect to={homeLnk} />
        )
      }
    />
  );
};
//
