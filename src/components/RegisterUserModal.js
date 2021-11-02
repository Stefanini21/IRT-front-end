import React, { useState, useDispatch} from "react";
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

const RegisterUserModal = (props) => {
// const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [modal, setModal] = useState(true);
  const [user, setUser] = useState({});

  const toggle = () => {
    setModal(!modal);
    props.modalClose();
  };

  const handleFirstName = (e) => {
    e.preventDefault();
    setFirstName(e.target.value);
    console.log(firstName);
  };

  const handleLastName = (e) => {
    e.preventDefault();
    setLastName(e.target.value);
    console.log(lastName);
  };

  const handleUserName = (e) => {
    e.preventDefault();
    setUserName(e.target.value);
    console.log(userName);
  };

  const handleEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
    console.log(email);
  };

  const handlePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
    console.log(password);
  };

  const handleRole = (e) => {
    e.preventDefault();
    setRole(e.target.value);
    console.log(role);
  };

  const handleSpecialty = (e) => {
    e.preventDefault();
    setSpecialty(e.target.value);
    console.log(specialty);
  };

  const registerUser = () => {
    toggle();
    if (
      firstName === "" ||
      lastName === "" ||
      userName === "" ||
      email === "" ||
      role === "" ||
      specialty === ""
    ) {
      return;
    }

    const newUser = {
      firstName,
      lastName,
      userName,
      email,
      password,
      role,
      specialty,
    };

    // dispatch(saveUser(newUser));
    // console.log("newUser: " + newUser);

    return axios
      .post(API_URL + "create/", {
        firstName,
        lastName,
        userName,
        email,
        password,
        role,
        specialty,
      })
      .then((response) => {
        console.log(response);
        props.getAllUsers();
      });
  };

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader>Register user</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup style={{ paddingBottom: 10 }}>
              <Label for="firstName">First name</Label>
              <Input
                type="text"
                name="firstName"
                onChange={handleFirstName}
                required
              />
            </FormGroup>
            <FormGroup style={{ paddingBottom: 10 }}>
              <Label for="lastName">Last name</Label>
              <Input type="text" name="lastName" onChange={handleLastName} />
            </FormGroup>
            <FormGroup style={{ paddingBottom: 10 }}>
              <Label for="userName">Username</Label>
              <Input type="text" name="userName" onChange={handleUserName} />
            </FormGroup>
            <FormGroup style={{ paddingBottom: 10 }}>
              <Label for="email">Email</Label>
              <Input type="email" name="email" onChange={handleEmail} />
            </FormGroup>
            <FormGroup style={{ paddingBottom: 10 }}>
              <Label for="password">Password</Label>
              <Input type="text" name="password" onChange={handlePassword} />
            </FormGroup>
            <FormGroup style={{ paddingBottom: 10 }}>
              <Label for="roleSelect">Select role</Label>
              <Input
                type="select"
                name="roleSelect"
                onChange={handleRole}
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
                onChange={handleSpecialty}
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
          <Button color="dark" onClick={registerUser}>
            Register
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default RegisterUserModal;
