import React from "react";
import {Provider} from "react-redux";
import {HashRouter as Router, Route, Switch,} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./components/home/home.component";
import User from "./components/board-user.component";
import {persistor, store} from "./store";
import {PersistGate} from "redux-persist/integration/react";
import Footer from "./components/footer/footer.component";
import Header from "./components/header/header.component";
import SignIn from "./components/sign-in/sign-in.component";
import Profile from "./components/profile/profile.component";
import AdminUserList from "./components/admin/board-admin-users.component";
import TicketList from "./components/admin/ticket-list.component";
import Forgot from "./components/sign-in/forgot.component";
import ChangePassword from "./components/sign-in/change-password.component";

const App = () => {

  return (
    <Router>
      <PersistGate persistor={persistor}>
        <div style={{ margin: 0 }}>
          <Header />
            <div>
              <div className="container mt-3">
                <Switch>
                  <div>
                    <Route exact path={["/", "/home"]} component={Home} />
                    <Route exact path="/login" component={SignIn} />
                    <Route exact path="/profile" component={Profile} />
                    <Route path="/admin/users" component={AdminUserList} />
                    <Route path="/admin/tickets" component={TicketList} />
                    <Route path="/admin/tickets-board" component={User} />
                    <Route path="/user" component={User} />
                    <Route path="/forgot" component={Forgot} />
                    <Route path="/change-password" component={ChangePassword} />
                  </div>
                </Switch>
              </div>
            </div>
          <Footer />
        </div>
      </PersistGate>
    </Router>
  );
};

export default App;
