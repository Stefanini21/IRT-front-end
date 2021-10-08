import React from "react";
import Login from "./Login"; import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Admin from "./Admin";
import Dev from "./Dev";
import Footer from "./Footer";

function App() {

  return (
    <div style={{ width: "70%", height: "100%", margin: "0 auto" }}>
      <Router>
        <div>
          <nav>
            <ul>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/admin">Admin</Link></li>
              <li><Link to="/dev">Dev</Link></li>
            </ul>
          </nav>
          <Switch>
            <Route exact path="/Login">
              <Login />
            </Route>
            <Route exact path="/Admin">
              <Admin />
            </Route>
            <Route exact path="/Dev">
              <Dev />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
