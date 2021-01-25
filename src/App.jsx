import React from "react";
import { Switch, Route } from "react-router-dom";
import { Container } from 'semantic-ui-react';
import NavMain from "./components/NavMain";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ProtectedRouteUser from "./components/ProtectedRouteUser";
import ProtectedRouteAdmin from "./components/ProtectedRouteAdmin";
import Profile from "./pages/Profile";
import Dashbord from './pages/admin/Dashboard';
import CreateUser from './pages/admin/users/FormCreate';
import DetailsUser from './pages/admin/users/DetailsUser';
import FormEdit from './pages/admin/users/FormEdit';

import CreateRecipe from "./pages/users/CreateRecipe";
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <NavMain />
      <Container className="main-container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signup" component={Signup} />
          <ProtectedRouteUser exact path="/profile" component={Profile} />

          <ProtectedRouteUser exact path="/recipes/create" component={CreateRecipe} />

          {/* ADMIN */}
          <ProtectedRouteAdmin exact path="/admin" component={Dashbord} />
          <ProtectedRouteAdmin exact path="/admin/users/create" component={CreateUser} />
          <ProtectedRouteAdmin exact path="/admin/users/:id/edit" component={FormEdit} />
          <ProtectedRouteAdmin exact path="/admin/users/:id/show" component={DetailsUser} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
