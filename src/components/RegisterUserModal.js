import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import axios from "axios";

const API_URL = "http://localhost:8080/api/users/";

class RegisterUserModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
      role: "",
      specialty: "",
      modal: true,
      user: {},
    };
    this.toggle = this.toggle.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.handleFirstName = this.handleFirstName.bind(this);
    this.handleLastName = this.handleLastName.bind(this);
    this.handleUserName = this.handleUserName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleRole = this.handleRole.bind(this);
    this.handleSpecialty = this.handleSpecialty.bind(this);
  }

  toggle(){
    this.setState({ modal: !this.state.modal })
    this.props.modalClose()
  }

  handleFirstName(e) {
    e.preventDefault();
    this.setState({ firstName: e.target.value });
    console.log(this.state.firstName);
  }

  handleLastName(e) {
    e.preventDefault();
    this.setState({ lastName: e.target.value });
    console.log(this.state.lastName);
  }

  handleUserName(e) {
    e.preventDefault();
    this.setState({ userName: e.target.value });
    console.log(this.state.userName);
  }


  handleEmail(e) {
    e.preventDefault();
    this.setState({ email: e.target.value });
    console.log(this.state.email);
  }

  handlePassword(e) {
    e.preventDefault();
    this.setState({ password: e.target.value });
    console.log(this.state.password);
  }

  handleRole(e) {
    e.preventDefault();
    this.setState({ role: e.target.value });
    console.log(this.state.role);
  }

  handleSpecialty(e) {
    e.preventDefault();
    this.setState({ specialty: e.target.value });
    console.log(this.state.specialty);
  }

  registerUser() {
    console.log("will register user!")
    this.toggle();
    const firstName = this.state.firstName;
    const lastName = this.state.lastName;
    const userName = this.state.userName;
    const email = this.state.email;
    const password = this.state.password;
    const role = this.state.role;
    const specialty = this.state.specialty;
    if(firstName === "" || lastName === "" || userName === "" || email === "" || role === "" || 
    specialty === "") {
      return
    }
        return axios
        .post(API_URL + "create/", {
          firstName,
          lastName,
          userName,
          email,
          password,
          role,
          specialty
        })
        .then(response => {
          console.log(response);
          this.props.getAllUsers();
      });
  }

  render() {
    return (
      <div>
        <Modal
          isOpen={this.state.modal}
          toggle={this.props.showRegUserModal && this.toggle}
          // className={className}
        >
          <ModalHeader>Register user</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup style={{ paddingBottom: 10 }}>
                <Label for="firstName">First name</Label>
                <Input
                  type="text"
                  name="firstName"
                  onChange={this.handleFirstName}
                  required
                />
              </FormGroup>
              <FormGroup style={{ paddingBottom: 10 }}>
                <Label for="lastName">Last name</Label>
                <Input
                  type="text"
                  name="lastName"
                  onChange={this.handleLastName}
                />
              </FormGroup>
              <FormGroup style={{ paddingBottom: 10 }}>
                <Label for="userName">Username</Label>
                <Input
                  type="text"
                  name="userName"
                  onChange={this.handleUserName}
                />
              </FormGroup>
              <FormGroup style={{ paddingBottom: 10 }}>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  onChange={this.handleEmail}
                />
              </FormGroup>
              <FormGroup style={{ paddingBottom: 10 }}>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  onChange={this.handlePassword}
                />
              </FormGroup>
              <FormGroup style={{ paddingBottom: 10 }}>
                <Label for="roleSelect">Select role</Label>
                <Input
                  type="select"
                  name="roleSelect"
                  onChange={this.handleRole}
                  defaultValue={" "}
                >
                  <option></option>
                  <option>ADMIN</option>
                  <option>USER</option>
                </Input>
              </FormGroup>
              <FormGroup style={{ paddingBottom: 10 }}>
                <Label for="specialtySelect">Select specialty</Label>
                <Input
                  type="select"
                  name="specialtySelect"
                  onChange={this.handleSpecialty}
                  defaultValue={" "}
                >
                  <option></option>
                  <option>FRONTEND</option>
                  <option>BACKEND</option>
                </Input>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="dark" onClick={this.registerUser}>
              Register
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default RegisterUserModal;
