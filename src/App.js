import React, {Component} from "react";
import {connect} from "react-redux";
import {BrowserRouter, Link, Route, Router, Switch} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/login.component";
import Register from "./components/create.user.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardAdmin from "./components/board-admin.component";

import {logout} from "./actions/auth";
import {clearMessage} from "./actions/message";

import {history} from './helpers/history';

import EventBus from "./common/EventBus";
import CreateUser from "./components/create.user.component";


class App extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            showAdminBoard: false,
            currentUser: undefined,
        };


        history.listen((location) => {
            props.dispatch(clearMessage()); // clear message when changing location
        });
    }

    componentDidMount() {
        const user = this.props.user;

        if (user) {
            this.setState({
                currentUser: user,
                showAdminBoard: user.role.includes("ADMIN"),
            });
        }

        EventBus.on("logout", () => {
            this.logOut();
        });
    }

    componentWillUnmount() {
        EventBus.remove("logout");
    }

    logOut() {
        this.props.dispatch(logout());
        this.setState({
            showAdminBoard: false,
            currentUser: undefined,
        });
    }

    render() {
        const {currentUser, showAdminBoard} = this.state;

        return (
            <BrowserRouter history={history}>
                <div>
                    <div className="header">
                        <nav className="navbar navbar-expand navbar-dark">
                            <Link to={"/"} className="navbar-brand">
                                irt-react-client
                            </Link>
                            <div className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link to={"/home"} className="nav-link">
                                        Home
                                    </Link>
                                </li>

                                {showAdminBoard && (
                                    <li className="nav-item">
                                        <Link to={"/admin"} className="nav-link">
                                            Admin Board
                                        </Link>
                                    </li>)}

                                {currentUser && (
                                    <li className="nav-item">
                                        <Link to={"/user"} className="nav-link">
                                            User
                                        </Link>
                                    </li>
                                )}
                            </div>

                            {currentUser ? (
                                <div className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <Link to={"/profile"} className="nav-link">
                                            {currentUser.username}
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <a href="/login" className="nav-link" onClick={this.logOut}>
                                            LogOut
                                        </a>
                                    </li>
                                </div>
                            ) : (
                                <div className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <Link to={"/login"} className="nav-link">
                                            Login
                                        </Link>
                                    </li>
                                </div>
                            )}
                        </nav>
                    </div>

                    <div className="container mt-3">
                        <Switch>
                            <Route exact path={["/", "/home"]} component={Home}/>
                            <Route exact path="/login" component={Login}/>
                            <Route exact path="/profile" component={Profile}/>
                            <Route path="/user" component={BoardUser}/>
                            <Route path="/admin" component={BoardAdmin}/>
                        </Switch>
                    </div>

                    <div className="container">
                        <footer className="py-5">

                            <div className="d-flex justify-content-between py-4 my-4 border-top">
                                <p>&copy; 2021 IRT powered by Stefanini, Inc. All rights reserved.</p>
                                <ul className="list-unstyled d-flex">
                                    <li className="ms-3"><a className="link-dark" href="#">
                                        <svg className="bi" width="24" height="24">

                                        </svg>
                                    </a></li>
                                    <li className="ms-3"><a className="link-dark" href="#">
                                        <svg className="bi" width="24" height="24">
                                        </svg>
                                    </a></li>
                                    <li className="ms-3"><a className="link-dark" href="#">
                                        <svg className="bi" width="24" height="24">
                                        </svg>
                                    </a></li>
                                </ul>
                            </div>
                        </footer>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

function mapStateToProps(state) {
    const {user} = state.auth;
    return {
        user,
    };
}

export default connect(mapStateToProps)(App);
