import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

function App() {
  const [token, setToken] = useState(true);
  let routes;
  if (token) {
    routes = (
      <Switch>
        <Route path="/cats" exact>
          <div></div>
        </Route>
        <Route path="/clients" exact>
          <div></div>
        </Route>
        <Route path="/clients/:clientId" exact>
          <div></div>
        </Route>
        <Route path="/newClient" exact>
          <div></div>
        </Route>
        <Route path="/users" exact>
          <div></div>
        </Route>
        <Route path="/dogs" exact>
          <div></div>
        </Route>
        <Redirect to="/users" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/auth">
          <div></div>
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <Router>
      <main>{routes}</main>
    </Router>
  );
}

export default App;
