import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";

import Auth from "./pages/Auth";
import Users from "./pages/Users"
import Clients from "./pages/Clients";
import Dogs from "./pages/Dogs";
import Cats from "./pages/Cats";
import NewClient from "./components/NewClient";
import UpdateClient from "./components/UpdateClient";

function App() {
  
  const {token, login, logout, userId} = useAuth();
  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/cats" exact>
          <Cats />
        </Route>
        <Route path="/clients" exact>
          <Clients />
        </Route>
        <Route path="/clients/:clientId" exact>
          <UpdateClient />
        </Route>
        <Route path="/newClient" exact>
          <NewClient />
        </Route>
        <Route path="/users" exact>
          <Users />
        </Route>
        <Route path="/dogs" exact>
          <Dogs />
        </Route>
        <Redirect to="/users" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
