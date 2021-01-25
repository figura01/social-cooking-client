import React from "react";
import { Redirect, Route } from "react-router-dom";
import { withUser } from "./Auth/withUser";

const ProtectedRouteAdmin = ({ component: Component, context, ...rest }) => {
  
  if (context.isLoading) {
    return null;
  } else if (context.isLoggedIn && context.user.role === 'admin') {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  } else {
    return <Redirect to="/signin" />;
  }
  
};

export default withUser(ProtectedRouteAdmin);
