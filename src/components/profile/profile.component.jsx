import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getUserData, getUserLoaded } from "../../redux/selectors/auth";
import { Button } from "react-bootstrap";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import {changePassword} from "../../redux/actions/user";
import "./profile.component.css";
import {selectFailPasswordUpdateFlag, selectSuccessfulPasswordUpdateFlag,} from "../../redux/selectors/flag";

const Profile = () => {
    const currentUserLoaded = useSelector(getUserLoaded);
    const currentUserData = useSelector(getUserData);
    const dispatch = useDispatch();

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");

    const [message, setMessage] = useState("");

    const successfulPasswordUpdate = useSelector(
        selectSuccessfulPasswordUpdateFlag
    );
    const failPasswordUpdate = useSelector(selectFailPasswordUpdateFlag);

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

      const formattedData = {
          userId: currentUserData.id,
          currentPassword: currentPassword,
          newPassword: newPassword,
          newPasswordConfirmation: newPasswordConfirmation,
      };

      setMessage(" Wrong current password !");

      {
          formattedData.newPassword === formattedData.newPasswordConfirmation
              ? dispatch(changePassword(formattedData))
              : setMessage(" New and confirmation password do not match !");
      }
  };
  
    return (
      <div>
        <div
          className={"jumbotron container-color col-lg-12"}
          style={{ marginTop: 30 }}
          >
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
            />
          <h3 style={{display: "flex", alignItems: "center", justifyContent: "center", }}>
            <strong>{currentUserData.username} </strong> Profile
          </h3>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="jumbotron col-lg-6" style={{ width: "90%" }}>
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
          </div>

          <div
            className="col-lg-6"
            style={{ width: "90%", float: "right", paddingRight: 0 }}
            >
            <div className="jumbotron container-color">
              <Form onSubmit={handleChangePassword}>
                <div className="form-group">
                  <label htmlFor="temporaryPassword">Current Password</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="temporaryPassword"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
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

                <Button
                  type="submit"
                  size="lg"
                  block
                  color="success"
                  className="primary_button btn-block"
                  >
                    Change Password
                </Button>

                {failPasswordUpdate && (
                  <div className="form-group">
                    <div
                      className="alert alert-danger"
                      role="alert"
                      style={{"margin-top": 15}}
                      >
                        {message}
                    </div>
                  </div>
                )}

                {successfulPasswordUpdate && (
                  <div className="form-group">
                    <div
                      className={"alert alert-success"}
                      role="alert"
                      style={{"margin-top": 15}}
                      >
                        Password successfully updated !
                    </div>
                  </div>
                )}
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Profile;