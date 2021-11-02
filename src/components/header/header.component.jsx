import React, {useEffect} from "react";
import {Link, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getUserLoaded} from "../../redux/selectors/auth";
import { getUserData } from "../../redux/selectors/auth"; // addUserData
import {signOutUser} from "../../redux/actions/auth";
import BoardUser from "../board-user.component";
import BoardAdmin from "../board-admin.component";


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

    useEffect( () => {
        console.log(currentUserData)
        if(currentUserData !== null){
            role = currentUserData.role;
            console.log(role);
        }
    },[currentUserData])


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

            {/* {console.log(currentUserLoaded)} */}

            {/* {console.log(currentUserData)} */}

            {/* {console.log(currentUserData !== null ? 
            currentUserData.role :
            'is null'
            )} */}
            {/* {console.log(role)} */}


            {/* {() = {
                        if (currentUserData.role === 'ADMIN') {
                          {
                            BoardAdmin && (
                              <li className='nav-item'>
                                <Link to={admin} className='nav-link'> 
                                  Admin Board
                                </Link>
                              </li>
                            );
                          }
                        } else  {
                          <li className='nav-item'>
                            Link to={user} className=nav-link
                              User
                            Link
                          li 
                        }
                    }} */}

            {/*{showAdminBoard && (*/}
            {/*    <li className="nav-item">*/}
            {/*        <Link to={"/admin"} className="nav-link">*/}
            {/*            Admin Board*/}
            {/*        </Link>*/}
            {/*    </li>)}*/}

            {/* comment userRoute from header */}
            {/* <li className="nav-item">
                        <Link to={"/user"} className="nav-link">
                            User
                        </Link>
                    </li> */}
          </div>



          {currentUserLoaded ? (
            <div className="navbar-nav ml-auto">
              <button
                className="btn btn-primary btn-block"
                onClick={handleLogOut}
              >
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <button
                className="btn btn-primary btn-block"
                onClick={handleLogIn}
              >
                <span>Login</span>
              </button>
            </div>
          )}
        </nav>
      </div>
    );
}

export default Header;