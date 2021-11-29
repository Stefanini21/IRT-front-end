import React, {useState} from "react";
import {NavLink, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getTokenValidity, getUserData, getUserLoaded,} from "../../redux/selectors/auth"; // addUserData
import {signOutUser} from "../../redux/actions/auth";
import {selectJwtCounterValueFromBack} from "../../redux/selectors/jwtCounter";
import {sendCounterTokenToBack,} from "../../redux/actions/jwtCounter";

const Header = () => {
    const currentUserLoaded = useSelector(getUserLoaded);
    const currentUserData = useSelector(getUserData);
    const jwtCounterValueFromBack = useSelector(selectJwtCounterValueFromBack);
    const [counterJWT, setCounterJWT] = useState();
    const [isSetedTokenJWT, setIsSetedTokenJWT] = useState(false);
    const isTokenValid = useSelector(getTokenValidity);

    const history = useHistory();

    const dispatch = useDispatch();

    const handleLogOut = () => {
        dispatch(signOutUser(history));
        setIsSetedTokenJWT(false);
    };

    const handleLogIn = () => {
        setIsSetedTokenJWT(false);
        history.push("/login");
    };

    const handleJWTtoken = (e) => {
        setCounterJWT(e.target.value);
        console.log(e.target.value);
    };

    const setJWTtoken = () => {
        console.log("counterJWT: " + counterJWT);
        setIsSetedTokenJWT(true);
        dispatch(sendCounterTokenToBack(counterJWT));
        console.log("jwtCounterValueFromBack: " + jwtCounterValueFromBack);
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
                                <li className="nav-item" style={{display: "inline-block"}}>
                                    <NavLink
                                        activeClassName="active"
                                        to={"/home"}
                                        className="nav-link"
                                    >
                                        Home
                                    </NavLink>
                                </li>
                                <li className="nav-item" style={{display: "inline-block"}}>
                                    <NavLink to={"/admin/users"} className="nav-link">
                                        User list
                                    </NavLink>
                                </li>
                                <li className="nav-item" style={{display: "inline-block"}}>
                                    <NavLink to={"/admin/tickets"} className="nav-link">
                                        Ticket list
                                    </NavLink>
                                </li>
                                <li className="nav-item" style={{display: "inline-block"}}>
                                    <NavLink to={"/admin/tickets-board"} className="nav-link">
                                        Ticket-board
                                    </NavLink>
                                </li>
                                <li className="nav-item" style={{display: "inline-block"}}>
                                    <NavLink to={"/profile"} className="nav-link">
                                        Profile
                                    </NavLink>
                                </li>
                            </div>
                        ) : currentUserLoaded && currentUserData.role === "USER" ? (
                            <div>
                                <li className="nav-item" style={{display: "inline-block"}}>
                                    <NavLink to={"/home"} className="nav-link">
                                        Home
                                    </NavLink>
                                </li>
                                <li className="nav-item" style={{display: "inline-block"}}>
                                    <NavLink to={"/user"} className="nav-link">
                                        Ticket-board
                                    </NavLink>
                                </li>
                                <li className="nav-item" style={{display: "inline-block"}}>
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
                    <div
                        style={{
                            marginLeft: -50,
                            color: "white",
                            display: "flex",
                            justifyContent: "space-around",
                            position: "absolute",
                            right: 115,
                        }}
                    >
                        {currentUserLoaded === false && isSetedTokenJWT === true ? (
                            <h6 style={{fontWeight: 300, marginTop: 10, marginRight: 54}}>
                                JWT token will expired in
                                <div
                                    style={{
                                        fontWeight: 600,
                                        display: "inline-block",
                                        margin: 5,
                                    }}
                                >
                                    {jwtCounterValueFromBack}
                                </div>{" "}
                                sec. after login
                            </h6>
                        ) : (
                            currentUserLoaded === true && (
                                <h6 style={{fontWeight: 300, marginTop: 10}}>
                                    JWT token will expired in
                                    <div
                                        style={{
                                            fontWeight: 600,
                                            display: "inline-block",
                                            margin: 5,
                                        }}
                                    >
                                        {counterJWT}
                                    </div>
                                    sec.
                                </h6>
                            )
                        )}
                        {currentUserLoaded === false && (
                            <input
                                type="number"
                                style={{
                                    display: "inline-block",
                                    marginLeft: 15,
                                    width: 70,
                                    height: 30,
                                    marginTop: 5,
                                }}
                                onChange={(e) => handleJWTtoken(e)}
                                disabled={isSetedTokenJWT}
                            />
                        )}
                        {currentUserLoaded === false && (
                            <button
                                className="login_button"
                                style={{
                                    marginLeft: 10,
                                    width: 100,
                                }}
                                onClick={setJWTtoken}
                            >
                                Set JWT
                            </button>
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
