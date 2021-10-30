import React from "react";
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {getUserLoaded} from "../../redux/selectors/auth";
import {signOutUser} from "../../redux/actions/auth";
import {useHistory} from "react-router-dom";


const Header = () => {

    const currentUserLoaded = useSelector(getUserLoaded);
    const history = useHistory();

    const dispatch = useDispatch();

    const handleLogOut = () => {
        dispatch(signOutUser(history));
    }

    const handleLogIn = () => {
        history.push("/login")
    }

    return (
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

                    {/*{showAdminBoard && (*/}
                    {/*    <li className="nav-item">*/}
                    {/*        <Link to={"/admin"} className="nav-link">*/}
                    {/*            Admin Board*/}
                    {/*        </Link>*/}
                    {/*    </li>)}*/}


                        <li className="nav-item">
                            <Link to={"/user"} className="nav-link">
                                User
                            </Link>
                        </li>

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
    )
}

export default Header;