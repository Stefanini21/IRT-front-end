import React from "react";
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {getUserData, getUserLoaded} from "../../redux/selectors/auth";
import ChangePasswordForm from "./change-password.component";
import * as types from "../../redux/actions/types";

const Profile = () => {

    const currentUserLoaded = useSelector(getUserLoaded);

    const currentUserData = useSelector(getUserData);

    if (!currentUserLoaded) {
        return <Redirect to="/login"/>;
    }

    const handleChangePassword =(formData) => {
        const {currentPassword, newPassword, newPasswordRepeated} = formData;

       dispatch({
            type: types.CHANGE_PASSWORD__REQUESTED,
            payload: {
                userId: pageState.auth.id,
                currentPassword,
                newPassword,
                newPasswordRepeated,
            }
        });
    }

    return (

        <div className="container">
            <header className="jumbotron">
                <h3>
                    <strong>{currentUserData.username}</strong> Profile
                </h3>
            </header>
            <p>
                <strong>Token:</strong> {currentUserData.accessToken.substring(0, 20)} ...{" "}
                {currentUserData.accessToken.substr(currentUserData.accessToken.length - 20)}
            </p>
            <p>
                <strong>First Name : </strong> {currentUserData.firstName}
            </p>
            <p>
                <strong>Last Name : </strong> {currentUserData.lastName}
            </p>
            <p>
                <strong>Email : </strong> {currentUserData.email}
            </p>
            <p>
                <strong>Specialty : </strong> {currentUserData.specialty}
            </p>
            <p>
                <strong>Role : </strong> {currentUserData.role}
            </p>

            <div>
                <ChangePasswordForm  onSubmit={handleChangePassword} />
            </div>
        </div>


    );
}

export default Profile;