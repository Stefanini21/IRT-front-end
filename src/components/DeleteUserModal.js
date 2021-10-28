import React, { Component } from "react";
import {
    ListGroup,
    ListGroupItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import axios from "axios";

const API_URL = "http://localhost:8080/api/users/";

class DeleteUserModal extends Component {
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
      currentUserId: this.props.currentUserId
    };
    this.toggle = this.toggle.bind(this);
    this.getUser = this.getUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  componentDidMount() {
    this.getUser();
  }

  toggle() {
    this.setState({ modal: !this.state.modal });
    this.props.modalClose();
  }

  deleteUser() {
    this.toggle();
    return axios.delete("http://localhost:8080/api/users/" +
        JSON.stringify(this.props.currentUserId)
    )
    .then((response) => {
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
        console.log("userName: " + this.state.username);
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
          toggle={this.props.showDeleteUserModal && this.toggle}
        >
          <ModalHeader><span style={{color: "#FF009C"}}>Are you sure you want to delete the user with id: {this.props.currentUserId}?</span>
          <div style={{color: "grey", fontSize: 14, fontWeight: 300}}>Created date: {this.state.createdDate}</div></ModalHeader>
          <ModalBody>
          <Form>
              <FormGroup style={{ paddingBottom: 10 }}>
                <Label for="firstName">First name</Label>
                <Input
                  type="text"
                  name="firstName"
                  placeholder={this.state.firstName}
                  readOnly={true}
                />
              </FormGroup>
              <FormGroup style={{ paddingBottom: 10 }}>
                <Label for="lastName">Last name</Label>
                <Input
                  type="text"
                  name="lastName"
                  placeholder={this.state.lastName}
                  readOnly={true}
                />
              </FormGroup>
              <FormGroup style={{ paddingBottom: 10 }}>
                <Label for="userName">Username</Label>
                <Input
                  type="text"
                  name="userName"
                  placeholder={this.state.userName}
                  readOnly={true}
                />
              </FormGroup>
              <FormGroup style={{ paddingBottom: 10 }}>
                <Label for="email">Email</Label>
                <Input type="email"
                  name="email"
                  placeholder={this.state.email}
                  readOnly={true}
                 />
              </FormGroup>
              <FormGroup style={{ paddingBottom: 10 }}>
                <Label for="role">Role</Label>
                <Input
                  type="text"
                  name="role"
                  placeholder={this.state.role}
                  readOnly={true}
                />
              </FormGroup>
              <FormGroup style={{ paddingBottom: 10 }}>
                <Label for="specialty">Specialty</Label>
                <Input
                  type="text"
                  name="specialty"
                  placeholder={this.state.specialty}
                  readOnly={true}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              color="dark"
              onClick={this.toggle}
            >
              No
            </Button>
            <Button
              style={{backgroundColor: "#FF009C", color: "white"}}
              onClick={this.deleteUser}
            >
              Yes
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default DeleteUserModal;
