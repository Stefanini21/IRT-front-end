import React, {useEffect} from "react";
import {Link, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getUserData, getUserLoaded} from "../../redux/selectors/auth"; // addUserData
import {signOutUser} from "../../redux/actions/auth";


const Header = () => {

    const currentUserLoaded = useSelector(getUserLoaded);

    // addUserData
    const currentUserData = useSelector(getUserData);


    const history = useHistory();

    const dispatch = useDispatch();

    const handleLogOut = () => {
        dispatch(signOutUser(history));
    }

    const handleLogIn = () => {
        history.push("/login")
    }

    let role = null

    useEffect(() => {
        console.log(currentUserData)
        if (currentUserData !== null) {
            role = currentUserData.role;
            console.log(role);
        }
    }, [currentUserData])


    return (
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

                        {currentUserLoaded && currentUserData.role === "ADMIN" ?
                            <li className="nav-item">
                                <Link to={"/admin"} className="nav-link">
                                    Admin Board
                                </Link>
                            </li>

                            :
                            <li className="nav-item">
                                <Link to={"/home"} className="nav-link">
                                </Link>
                            </li>
                        }

                        {currentUserLoaded && currentUserData.role === "USER" ?
                            <li className="nav-item">
                                <Link to={"/user"} className="nav-link">
                                    User
                                </Link>
                            </li>

                            :
                            <li className="nav-item">
                                <Link to={"/home"} className="nav-link">
                                </Link>
                            </li>
                        }


                    </div>

                    {currentUserLoaded ? (
                        <div className="navbar-nav ml-auto">
                            <button
                                className="btn btn-primary btn-block"
                                onClick={handleLogOut}>
                                <span>Logout</span>
                            </button>
                        </div>
                    ) : (
                        <div className="navbar-nav ml-auto">
                            <button
                                className="btn btn-primary btn-block"
                                onClick={handleLogIn}>
                                <span>Login</span>
                            </button>
                        </div>
                    )}
                </nav>
            </div>
        </div>
    );
}

export default Header;