import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authUser } from "./redux/actions/auth";
import {getUserLoaded, getUserData} from './redux/selectors/auth';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { Container, Row, Col, Button, FormGroup, Label } from "reactstrap";
import User from "./User";
import Admin from "./Admin";
import { RoleService } from "./services/roleService";

const Login = () => {

  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const currentUserLoaded = useSelector(getUserLoaded);
  const currentUserData = useSelector(getUserData);

  const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if((username === "" || username.length === 0) || (password === "" || password.length === 0)) {
      return;
    }
    const formattedData = {
      username: username,
      password: password,
    };

    dispatch(authUser(formattedData));
    setUsername("");
    setPassword("");
  };

  // const role = currentUserData?.role;
  // const role = currentUserData !== null ? currentUserData.role : null;

  // useEffect(() => {
  //   if(currentUserLoaded) {
  //     setRole(currentUserData.role);
  //   }
  // }, [currentUserData])

  console.log("RoleService.isAdmin():" + RoleService.isAdmin())
  console.log("RoleService.isAdmin():" + RoleService.isAdmin())

  return (
    <div>
      {!currentUserLoaded ? (
        <Container>
          <Row>
            <Col xs="4"></Col>
            <Col xs="4">
              <Form style={{ marginTop: "20%" }} onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="userName">User name</Label>
                  <Input
                    type="text"
                    name="userName"
                    // placeholder="userName"
                    style={{ margin: '10 0', marginBottom: 20, width: "100%" }}
                    onChange={(e) => setUsername(e.target.value)}
                    validations={[required]}
                  />
                  <Label for="examplePassword">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    // placeholder="password"
                    style={{ margin: '10 0', marginBottom: 20, width: '100%' }}
                    onChange={(e) => setPassword(e.target.value)}
                    validations={[required]}
                  />
                </FormGroup>
                <Button style={{ margin: '10 0', backgroundColor: "black" }}>
                  Login
                </Button>
              </Form>
            </Col>
            <Col xs="4"></Col>
          </Row>
        </Container>
      ) : RoleService.isAdmin() ? (
        <Admin />
        ) : RoleService.isUser() ? (
        <User />
      ) : <Login />}
    </div>
  );
};

export default Login;
