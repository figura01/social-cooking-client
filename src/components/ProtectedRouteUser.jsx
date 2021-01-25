import React from "react";
import { Redirect, Route } from "react-router-dom";
import { withUser } from "./Auth/withUser";

const ProtectedRouteUser = ({ component: Component, context, ...rest }) => {
  
  if (context.isLoading) {
    return null;
  } else if (context.isLoggedIn && context.user.role === "user") {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  } else {
    return <Redirect to="/signin" />;
  }
  
};

export default withUser(ProtectedRouteUser);
