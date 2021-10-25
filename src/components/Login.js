import React, { Component } from "react";
// import { Form, Input, Button } from 'semantic-ui-react'
import { Container, Row, Col } from "reactstrap";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import axios from "axios";
import User from "./User";
import Admin from "./Admin";

const API_URL = "http://localhost:8080/api/auth/";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      currentUser: {},
      authenticated: false,
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.logout = this.logout.bind(this);
    this.login = this.login.bind(this);
  }

  onFormSubmit() {
    const userName = this.state.userName;
    const password = this.state.password;

    this.login(userName, password);
  }

  login(username, password) {
    return axios
      .post(API_URL + "login", {
        username,
        password
      })
      .then(response => {
        console.log(response);
        this.setState({
            currentUser: response.data,
            authenticated: true
        });
    });
  }

  handleUsername(e) {
    e.preventDefault();
    this.setState({ userName: e.target.value });
    console.log(this.state.userName);
  }

  handlePassword(e) {
    e.preventDefault();
    var s = e.target.value;
    this.setState({ password: s });
    console.log(this.state.password);
  }

  logout(tab) {
    this.setState({
      loggedIn: false,
    });
  }

  render() {
    const currentUser = this.state.currentUser;
    return (
      <div>
        {!this.state.authenticated ? (
          <Container>
            <Row>
              <Col xs="4"></Col>
              <Col xs="4">
                <Form style={{ marginTop: "20%" }}>
                  <FormGroup>
                    {/* <Label for="exampleEmail">Email</Label> */}
                    <Input
                      type="text"
                      name="userName"
                      placeholder="userName"
                      style={{ margin: 10, marginBottom: 20 }}
                      onChange={this.handleUsername}
                    />
                  </FormGroup>
                  <FormGroup>
                    {/* <Label for="examplePassword">Password</Label> */}
                    <Input
                      type="password"
                      name="password"
                      placeholder="password"
                      style={{ margin: 10 }}
                      onChange={this.handlePassword}
                    />
                  </FormGroup>
                  <Button style={{ margin: 10 }} onClick={this.onFormSubmit}>
                    Login
                  </Button>
                </Form>
              </Col>
              <Col xs="4"></Col>
            </Row>
          </Container>
        ) : currentUser.role === "ADMIN" ? (
          <Admin currentUser={currentUser} />
        ) : (
          <User currentUser={currentUser} />
        )}
      </div>
    );
  }
}

export default Login;
