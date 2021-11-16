import React, {useEffect} from "react";
import {Link, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getUserData, getUserLoaded} from "../../redux/selectors/auth"; // addUserData
import {signOutUser} from "../../redux/actions/auth";

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

    let role = null;

    useEffect(() => {
        console.log(currentUserData);
        if (currentUserData !== null) {
            role = currentUserData.role;
            console.log(role);
        }
    }, [currentUserData]);

    return (
        <div>
            <div className="header">
                <nav className="navbar navbar-expand navbar-dark">
                    <Link to={"/"} className="navbar-brand">
                        Issue Reporting Tool
                    </Link>
                    <div className="navbar-nav mr-auto">
                        {currentUserLoaded && currentUserData.role === "ADMIN" ? (
                            <div>
                                <li className="nav-item" style={{display: "inline-block"}}>
                                    <Link to={"/home"} className="nav-link">
                                        Home
                                    </Link>
                                </li>
                                <li className="nav-item" style={{display: "inline-block"}}>
                                    <Link to={"/admin/users"} className="nav-link">
                                        User list
                                    </Link>
                                </li>
                                <li className="nav-item" style={{display: "inline-block"}}>
                                    <Link to={"/admin/tickets"} className="nav-link">
                                        Ticket list
                                    </Link>
                                </li>
                                <li className="nav-item" style={{display: "inline-block"}}>
                                    <Link to={"/profile"} className="nav-link">
                                        Profile
                                    </Link>
                                </li>
                            </div>
                        ) : currentUserLoaded && currentUserData.role === "USER" ? (
                            <div>
                                <li className="nav-item" style={{display: "inline-block"}}>
                                    <Link to={"/home"} className="nav-link">
                                        Home
                                    </Link>
                                </li>
                                <li className="nav-item" style={{display: "inline-block"}}>
                                    <Link to={"/user"} className="nav-link">
                                        User
                                    </Link>
                                </li>
                                <li className="nav-item" style={{display: "inline-block"}}>
                                    <Link to={"/profile"} className="nav-link">
                                        Profile
                                    </Link>
                                </li>
                            </div>
                        ) : (
                            <li className="nav-item">
                                <Link to={"/login"} className="nav-link"></Link>
                            </li>
                        )}
                    </div>
                    {currentUserLoaded ? (
                        <div className="navbar-nav ml-auto">
                            <button
                                className="login_button btn-block"

                                onClick={handleLogOut}
                            >
                                <span>Logout</span>
                            </button>
                        </div>
                    ) : (
                        <div className="navbar-nav ml-auto">
                            <button
                                className="login_button btn-block"
                                onClick={handleLogIn}
                            >
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
