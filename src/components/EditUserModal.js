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

class EditUserModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createdDate: "",
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
      role: "",
      specialty: "",
      modal: true,
      currentUser: {},
    };
    this.toggle = this.toggle.bind(this);
    this.getUser = this.getUser.bind(this);
    this.editUser = this.editUser.bind(this);
    this.handleFirstName = this.handleFirstName.bind(this);
    this.handleLastName = this.handleLastName.bind(this);
    this.handleUserName = this.handleUserName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleRole = this.handleRole.bind(this);
    this.handleSpecialty = this.handleSpecialty.bind(this);
  }

  componentDidMount() {
    this.getUser();
  }

  toggle() {
    this.setState({ modal: !this.state.modal });
    this.props.modalClose();
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

  editUser() {
    this.toggle();
    console.log("will update user!")
    this.toggle();
    const id = this.props.currentUserId;
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
        console.log("after form edit ******************************* ");

        console.log("id: " + this.props.currentUserId);
        console.log("createdDate: " + this.state.createdDate);
        console.log("firstName: " + this.state.firstName);
        console.log("lastName: " + this.state.lastName);
        console.log("userName: " + this.state.userName);
        console.log("email: " + this.state.email);
        console.log("password: " + this.state.password);
        console.log("role: " + this.state.role);
        console.log("specialty: " + this.state.specialty);

        return axios
        .put(API_URL + "update/", {
          id,
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

  getUser() {
    return axios
      .get(
        "http://localhost:8080/api/users/" +
          JSON.stringify(this.props.currentUserId)
      )
      .then((response) => {
        this.setState({
          currentUser: response.data,
          createdDate: response.data.createdDate,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          userName: response.data.username,
          email: response.data.email,
          password: response.data.password,
          role: response.data.role,
          specialty: response.data.specialty,
        });
        localStorage.setItem("user", response.data);
        console.log("createdDate: " + this.state.createdDate);
        console.log("firstName: " + this.state.firstName);
        console.log("lastName: " + this.state.lastName);
        console.log("userName: " + this.state.userName);
        console.log("email: " + this.state.email);
        console.log("password: " + this.state.password);
        console.log("role: " + this.state.role);
        console.log("specialty: " + this.state.specialty);
      });
  }

  render() {
    return (
      <div>
        <Modal
          isOpen={this.state.modal}
          toggle={this.props.showEditUserModal && this.toggle}
        >
          <ModalHeader><span style={{color: "#2b5d8a"}}>Edit user with id: {this.props.currentUserId}</span>
          <div style={{color: "grey", fontSize: 14, fontWeight: 300}}>Created date: {this.state.createdDate}</div>
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup style={{ paddingBottom: 10 }}>
                <Label for="firstName">First name</Label>
                <Input
                  type="text"
                  name="firstName"
                  onChange={this.handleFirstName}
                  placeholder={this.state.firstName}
                //   readOnly={true}
                />
              </FormGroup>
              <FormGroup style={{ paddingBottom: 10 }}>
                <Label for="lastName">Last name</Label>
                <Input
                  type="text"
                  name="lastName"
                  onChange={this.handleLastName}
                  placeholder={this.state.lastName}
                />
              </FormGroup>
              <FormGroup style={{ paddingBottom: 10 }}>
                <Label for="userName">Username</Label>
                <Input
                  type="text"
                  name="userName"
                  onChange={this.handleUserName}
                  placeholder={this.state.userName}
                />
              </FormGroup>
              <FormGroup style={{ paddingBottom: 10 }}>
                <Label for="email">Email</Label>
                <Input type="email" name="email" onChange={this.handleEmail}
                placeholder={this.state.email}
                 />
              </FormGroup>
              <FormGroup style={{ paddingBottom: 10 }}>
                <Label for="password">Password</Label>
                <Input
                  type="text"
                  name="password"
                  onChange={this.handlePassword}
                  placeholder=". . . . . . . . . ."
                />
              </FormGroup>
              <FormGroup style={{ paddingBottom: 10 }}>
                <Label for="roleSelect">Select role</Label>
                <Input
                  type="select"
                  name="roleSelect"
                  onChange={this.handleRole}
                  defaultValue = {this.state.role}
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
                  defaultValue = {this.state.specialty}
                >
                  <option></option>
                  <option>FRONTEND</option>
                  <option>BACKEND</option>
                </Input>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="dark" onClick={this.editUser} onClick={this.toggle}>
              Back
            </Button>
            <Button style={{backgroundColor: "#3d85c6", color: "white"}} onClick={this.editUser}>
              Update
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default EditUserModal;
