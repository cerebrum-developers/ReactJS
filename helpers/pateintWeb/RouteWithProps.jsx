// Allows you to pass props component that will be rendered by Route
import React from "react";
import { Route, Navigate } from "react-router-dom";
import { getUser } from "../../helpers/pateintWeb";
export const RouteWithProps = ({ props, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={
      matchProps =>
        getUser() ? (
          <Component {...matchProps} {...props} />
        ) : (
          <Navigate to={{ pathname: "/", state: { from: props.location } }} />
        )

      // <Component {...matchProps} {...props} />
    }
  />
);
