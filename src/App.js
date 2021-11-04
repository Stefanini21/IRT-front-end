import React, {Component} from "react";
import {Provider} from "react-redux";
import {HashRouter as Router, Route, Switch} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./components/home/home.component";
import BoardUser from "./components/board-user.component";
import BoardAdmin from "./components/admin/board-admin.component"
import {persistor, store} from "./store";
import {PersistGate} from "redux-persist/integration/react";
import Footer from "./components/footer/footer.component";
import Header from "./components/header/header.component";
import SignIn from "./components/sign-in/sign-in.component";
// import Profile from "./components/profile/profile.component";


export default class App extends Component {

    render() {

        return (
            <Provider store={store}>
                <Router>
                    <PersistGate persistor={persistor}>
                        <div>
                            <Header />
                            <div className="container mt-3">
                                <Switch>
                                    <Route exact path={["/", "/home"]} component={Home}/>
                                    <Route exact path="/login" component={SignIn}/>
                                    {/* <Route exact path="/profile" component={Profile}/> */}
                                    <Route path="/user" component={BoardUser}/>
                                    <Route path="/admin" component={BoardAdmin}/>
                                </Switch>
                            </div>
                            <Footer />
                        </div>
                    </PersistGate>
                </Router>
            </Provider>
        );
    }
}
