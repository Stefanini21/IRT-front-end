import React, { useState, useEffect } from "react";
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

const EditUserModal = (props) => {
      const [firstName, setFirstName] = useState("");
      const [createdDate, setCreatedDate] = useState("");
      const [lastName, setLastName] = useState("");
      const [userName, setUserName] = useState("");
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [role, setRole] = useState("");
      const [specialty, setSpecialty] = useState("");
      const [modal, setModal] = useState(true);
      const [currentUser, setCurrentUser] = useState({});
      const id = props.currentUserId;

  useEffect(() => {
    getUser();
  }, []);

  const toggle = () =>{
    setModal(!modal)
    props.modalClose()
  }

  const handleFirstName = (e) => {
    e.preventDefault();
    setFirstName(e.target.value);
    console.log(firstName);
  }

  const handleLastName = (e) => {
    e.preventDefault();
    setLastName(e.target.value);
    console.log(lastName);
  }

  const handleUserName = (e) => {
    e.preventDefault();
    setUserName(e.target.value);
    console.log(userName);
  }


  const handleEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
    console.log(email);
  }

  const handlePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
    console.log(password);
  }

  const handleRole = (e) => {
    e.preventDefault();
    setRole(e.target.value);
    console.log(role);
  }

  const handleSpecialty = (e) => {
    e.preventDefault();
    setSpecialty(e.target.value);
    console.log(specialty);
  }

  const editUser = () => {
    toggle();
    console.log("will update user!")
    if(firstName === "" || lastName === "" || userName === "" || email === "" || role === "" || 
    specialty === "") {
      return
    }
        console.log("after form edit ******************************* ");

        console.log("id: " + currentUserId);
        console.log("createdDate: " + createdDate);
        console.log("firstName: " + firstName);
        console.log("lastName: " + lastName);
        console.log("userName: " + userName);
        console.log("email: " + email);
        console.log("password: " + password);
        console.log("role: " + role);
        console.log("specialty: " + specialty);

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

  const getUser = () => {
    return axios
      .get(
        "http://localhost:8080/api/users/" +
          JSON.stringify(id)
      )
      .then((response) => {
          setCurrentUser(response.data),
          setCreatedDate(response.data.createdDate),
          setFirstName(response.data.firstName),
          setLastName(response.data.lastName),
          setUserName(response.data.username),
          setEmail(response.data.email),
          setPassword(response.data.password),
          setRole(response.data.role),
          setSpecialty(response.data.specialty),
        localStorage.setItem("user", response.data);
        console.log("createdDate: " + createdDate);
        console.log("firstName: " + firstName);
        console.log("lastName: " + lastName);
        console.log("userName: " + userName);
        console.log("email: " + email);
        console.log("password: " + password);
        console.log("role: " + role);
        console.log("specialty: " + specialty);
      });
  }

    return (
      <div>
        <Modal
          isOpen={modal}
          toggle={toggle}
        >
          <ModalHeader>Edit user with id: {id}
          <div style={{color: "grey", fontSize: 14, fontWeight: 300}}>Created date: {createdDate}</div>
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup style={{ paddingBottom: 10 }}>
                <Label for="firstName">First name</Label>
                <Input
                  type="text"
                  name="firstName"
                  onChange={handleFirstName}
                  placeholder={firstName}
                //   readOnly={true}
                />
              </FormGroup>
              <FormGroup style={{ paddingBottom: 10 }}>
                <Label for="lastName">Last name</Label>
                <Input
                  type="text"
                  name="lastName"
                  onChange={handleLastName}
                  placeholder={lastName}
                />
              </FormGroup>
              <FormGroup style={{ paddingBottom: 10 }}>
                <Label for="userName">Username</Label>
                <Input
                  type="text"
                  name="userName"
                  onChange={handleUserName}
                  placeholder={userName}
                />
              </FormGroup>
              <FormGroup style={{ paddingBottom: 10 }}>
                <Label for="email">Email</Label>
                <Input type="email" name="email" onChange={handleEmail}
                placeholder={email}
                 />
              </FormGroup>
              <FormGroup style={{ paddingBottom: 10 }}>
                <Label for="password">Password</Label>
                <Input
                  type="text"
                  name="password"
                  onChange={handlePassword}
                  placeholder=". . . . . . . . . ."
                />
              </FormGroup>
              <FormGroup style={{ paddingBottom: 10 }}>
                <Label for="roleSelect">Select role</Label>
                <Input
                  type="select"
                  name="roleSelect"
                  onChange={handleRole}
                  defaultValue = {role}
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
                  onChange={handleSpecialty}
                  defaultValue = {specialty}
                >
                  <option></option>
                  <option>FRONTEND</option>
                  <option>BACKEND</option>
                </Input>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="dark" onClick={editUser} onClick={toggle}>
              Back
            </Button>
            <Button style={{backgroundColor: "#009CFF"}} onClick={editUser}>
              Update
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
}

export default EditUserModal;
