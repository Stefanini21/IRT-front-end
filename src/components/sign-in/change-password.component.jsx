import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import {Button} from "react-bootstrap";
import {changeForgottenPassword} from "../../redux/actions/user";
import {
    selectFailForgotPasswordUpdateFlag,
    selectSuccessfulForgotPasswordUpdateFlag,
    selectSuccessfulPasswordSendFlag
} from "../../redux/selectors/flag";


const ChangePassword = () => {
    const dispatch = useDispatch();

    const [verificationCode, setVerificationCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");

    const [message, setMessage] = useState("");
    const [email, setEmail] = useState("");


    const successfulForgotPasswordUpdate = useSelector(selectSuccessfulForgotPasswordUpdateFlag);
    const failForgotPasswordUpdate = useSelector(selectFailForgotPasswordUpdateFlag);
    const successfulPasswordSend = useSelector(selectSuccessfulPasswordSendFlag);


    const required = (value) => {
        if (!value) {
            return (
                <div className="alert alert-danger" role="alert">
                    This field is required!
                </div>
            );
        }
    };

    const vpassword = (value) => {
        if (value.length < 5 || value.length > 20) {
            return (
                <div className="alert alert-danger" role="alert">
                    The password must be between 5 and 20 characters.
                </div>
            );
        }
    };

    const handleChangePassword = (event) => {
        event.preventDefault();

        const formattedData = {
            email: email,
            verificationCode: verificationCode,
            newPassword: newPassword,
            newPasswordConfirmation: newPasswordConfirmation,
        };

        setMessage(" Entered email and verification code do not match !")


        {
            ((formattedData.newPassword === formattedData.newPasswordConfirmation)) ?
                dispatch(changeForgottenPassword(formattedData)) : setMessage(" New and confirmation password do not match !")
        }

    }
    return (

        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>

            <header className="jumbotron container-color">

                {successfulPasswordSend && (
                    <div className="form-group">
                        <div className="alert alert-success" role="alert">
                            Verification code has been sent to your email !
                        </div>
                    </div>
                )}
                <div>
                    <Form onSubmit={handleChangePassword}>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <Input
                                type="email"
                                className="form-control"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                validations={[required]}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="verificationCode">Verification Code</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="verificationCode"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                                validations={[required]}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="newPassword">New Password</label>
                            <Input
                                type="password"
                                className="form-control"
                                name="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                validations={[required, vpassword]}
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

                        {
                        newPassword.length > 5 ? (

                        <Button type="submit"
                                size="lg"
                                block
                                color="success"
                                className="primary_button btn-block"
                        >
                            Change Password
                        </Button>
                            ) : (
                            <Button disabled
                                    type="submit"
                                    size="lg"
                                    block
                                    color="success"
                                    className="primary_button btn-block"
                            >
                                Change Password
                            </Button>
                        )}

                        {failForgotPasswordUpdate && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert" style={{"margin-top": 15}}>
                                    {message}
                                </div>
                            </div>
                        )}

                        {successfulForgotPasswordUpdate && (
                            <div className="form-group">
                                <div className={"alert alert-success"}
                                     role="alert" style={{"margin-top": 15}}>
                                    Password was successfully updated !
                                </div>
                            </div>
                        )}


                    </Form>
                </div>

            </header>
        </div>
    );
}

export default ChangePassword