import React, { useEffect, useState } from "react";
import { NavLink, Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserData,
  getUserLoaded
} from "../../redux/selectors/auth"; // addUserData
import { signOutUser } from "../../redux/actions/auth";

const Header = () => {
  const currentUserLoaded = useSelector(getUserLoaded);
  const currentUserData = useSelector(getUserData);

  const history = useHistory();

  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(signOutUser(history));
  };

  const handleLogIn = () => {
    history.push("/login");
  };

  return (
    <div>
      <div className="header">
        <nav className="navbar navbar-expand navbar-dark">
          <NavLink to={"/"} className="navbar-brand">
            Issue Reporting Tool
          </NavLink>
          <div className="navbar-nav mr-auto">
            {currentUserLoaded && currentUserData.role === "ADMIN" ? (
              <div>
                <li className="nav-item" style={{ display: "inline-block" }}>
                  <NavLink
                    activeClassName="active"
                    to={"/home"}
                    className="nav-link"
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item" style={{ display: "inline-block" }}>
                  <NavLink to={"/admin/users"} className="nav-link">
                    User list
                  </NavLink>
                </li>
                <li className="nav-item" style={{ display: "inline-block" }}>
                  <NavLink to={"/admin/tickets"} className="nav-link">
                    Ticket list
                  </NavLink>
                </li>
                <li className="nav-item" style={{ display: "inline-block" }}>
                  <NavLink to={"/admin/tickets-board"} className="nav-link">
                    Ticket-board
                  </NavLink>
                </li>
                <li className="nav-item" style={{ display: "inline-block" }}>
                  <NavLink to={"/profile"} className="nav-link">
                    Profile
                  </NavLink>
                </li>
              </div>
            ) : currentUserLoaded && currentUserData.role === "USER" ? (
              <div>
                <li className="nav-item" style={{ display: "inline-block" }}>
                  <NavLink to={"/home"} className="nav-link">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item" style={{ display: "inline-block" }}>
                  <NavLink to={"/user"} className="nav-link">
                    Ticket-board
                  </NavLink>
                </li>
                <li className="nav-item" style={{ display: "inline-block" }}>
                  <NavLink to={"/profile"} className="nav-link">
                    Profile
                  </NavLink>
                </li>
              </div>
            ) : (
              <li className="nav-item">
                <NavLink to={"/login"} className="nav-link"></NavLink>
              </li>
            )}
          </div>
          
          {currentUserLoaded ? (
            <div className="navbar-nav ml-auto">
              <button className="login_button btn-block" onClick={handleLogOut}>
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <button className="login_button btn-block" onClick={handleLogIn}>
                <span>Login</span>
              </button>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Header;
