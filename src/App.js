import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  HashRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./components/home/home.component";
import User from "./components/board-user.component";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import Footer from "./components/footer/footer.component";
import Header from "./components/header/header.component";
import SignIn from "./components/sign-in/sign-in.component";
import Profile from "./components/profile/profile.component";
import AdminUserList from "./components/admin/board-admin-users.component";
import TicketList from "./components/admin/ticket-list.component";
import Forgot from "./components/sign-in/forgot.component";
import ChangePassword from "./components/sign-in/change-password.component";
import ExpiredJwtModal from "./components/expiredJwtModal/expiredJwtModal";
import { selectRemainingTime } from "./redux/selectors/jwtToken";
import { signOutUser } from "./redux/actions/auth";
import { setDecrementTime, decrementTime } from "./redux/actions/jwtToken";
import jwt from "jwt-decode";

const App = () => {
  // const [isVisibleExpiredModal, setisVisibleExpiredModal] = useState(false);
  // // const remainingTime = useSelector(selectRemainingTime);
  // const restOfTime = useSelector(selectRemainingTime);
  
  // const history = useHistory();
  // const dispatch = useDispatch();

  // const closeModal = () => {
  //   setisVisibleExpiredModal(false);
  // }

  // const showModal = () => {
  //   setisVisibleExpiredModal(true);
  // }


  // const member = localStorage.getItem("member") || "";
  // const token = localStorage.getItem("token") || "";
  // let iat = jwt(token).iat;
  // const exp = jwt(token).exp;
  // let time = exp - iat;
  // console.log("iat: " + iat);
  // console.log("exp: " + exp);

  // useEffect(() => {
  //   console.log("time: " + time);
  // }, []);

  // useEffect(() => {
  //   setTimeout(function() {
  //     if (restOfTime < exp) {
  //       iat++
  //       dispatch(decrementTime(iat));
  //       console.log("restOfTime: " + restOfTime);
  //     }
  //   }, 1000);
  //   if (exp - restOfTime === 10) {
  //     showModal();
  //     console.log("restOfTime: " + restOfTime);
  //   }
  //   if (restOfTime >= exp) {
  //     closeModal();
  //     dispatch(signOutUser(history));
  //     console.log("restOfTime: " + restOfTime);
  //   }
  // }, [restOfTime]);

  //  useEffect(() => {
  //   setTimeout(function() {
  //     if (restOfTime > 0) {
  //       dispatch(decrementTime(restOfTime -1));
  //       console.log("restOfTime: " + restOfTime);
  //     }
  //   }, 1000);
  //   restOfTime === 0 && dispatch(signOutUser(history));
  // }, [restOfTime]);

  return (
    <Router>
      <PersistGate persistor={persistor}>
        <div style={{ margin: 0 }}>
          <Header />
          {/* {isVisibleExpiredModal === true ? (
            <ExpiredJwtModal/>
          ) : ( */}
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
                    <Route path="/expired" component={ExpiredJwtModal} />
                  </div>
                </Switch>
              </div>
            </div>
          {/* )} */}
          <Footer />
        </div>
      </PersistGate>
    </Router>
  );
};

export default App;
