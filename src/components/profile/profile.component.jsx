import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {getUserData, getUserLoaded} from "../../redux/selectors/auth";
import {Button} from "react-bootstrap";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import {changePassword} from "../../redux/actions/user";
import {selectSuccessfulPasswordUpdateFlag} from "../../redux/selectors/flag";

const Profile = () => {

    const currentUserLoaded = useSelector(getUserLoaded);
    const currentUserData = useSelector(getUserData);
    // const message = useSelector(getMessage)
    const dispatch = useDispatch();

    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");

    const [message, setMessage] = useState("");

    const successfulPasswordUpdate = useSelector(selectSuccessfulPasswordUpdateFlag);

    if (!currentUserLoaded) {
        return <Redirect to="/login"/>;
    }

    const required = (value) => {
        if (!value) {
            return (
                <div className="alert alert-danger" role="alert">
                    This field is required!
                </div>
            );
        }
    };

    const handleChangePassword = (event) => {
        event.preventDefault();

        setMessage(" successfully updated")

        const formattedData = {
            userId: currentUserData.id,
            newPassword: newPassword,
            newPasswordConfirmation: newPasswordConfirmation,
        };

        {
            (formattedData.newPassword === formattedData.newPasswordConfirmation) ?
                dispatch(changePassword(formattedData)) : setMessage("password do not match")
        }
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
                <Form onSubmit={handleChangePassword}>

                    <div className="form-group">
                        <label htmlFor="newPassword">New Password</label>
                        <Input
                            type="password"
                            className="form-control"
                            name="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            validations={[required]}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="newPasswordConfirmation">Confirm New Password</label>
                        <Input
                            type="password"
                            className="form-control"
                            name="newPasswordConfirmation"
                            value={newPasswordConfirmation}
                            onChange={(e) => setNewPasswordConfirmation(e.target.value)}
                            validations={[required]}
                        />
                    </div>

                    <Button type="submit"
                            size="lg"
                            block
                            color="success"
                    >
                        Change Password
                    </Button>

                    {message && (
                        <div className="form-group">
                            <div className={successfulPasswordUpdate ? "alert alert-success" : "alert alert-danger"}
                                 role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                </Form>
            </div>
        </div>


    );
}

export default Profile;