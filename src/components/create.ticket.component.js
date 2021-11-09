import React, { useState } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { useDispatch } from "react-redux";
import { createTicket } from "../redux/actions/ticket";

const CreateTicketModal = (props) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [status, setStatus] = useState("");
  const [developer, setDeveloper] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(true);

  // constructor(props) {
  //     super(props);
  //     this.handleCreateUser = this.handleCreateUser.bind(this);
  //     this.handleClose = this.handleClose.bind(this);
  //     this.onChangeUsername = this.onChangeUsername.bind(this);
  //     this.onChangeFirstName = this.onChangeFirstName.bind(this);
  //     this.onChangeLastName = this.onChangeLastName.bind(this);
  //     this.onChangeSpecialty = this.onChangeSpecialty.bind(this);
  //     this.onChangeEmail = this.onChangeEmail.bind(this);
  //     this.onChangePassword = this.onChangePassword.bind(this);
  //
  //     this.state = {
  //         username: "",
  //         firstname: "",
  //         lastname: "",
  //         email: "",
  //         specialty: "",
  //         password: "",
  //         role: "USER",
  //         successful: false,
  //         message: "",
  //         show: true
  //     };
  // }

  const handleClose = () => {
    setShow(false);
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const onChangePriority = (e) => {
    setPriority(e.target.value);
  };

  const onChangeSpecialty = (e) => {
    setSpecialty(e.target.value);
  };

  const onChangeStatus = (e) => {
    setStatus(e.target.value);
  };

  const onChangeDeveloper = (e) => {
    setDeveloper(e.target.value);
  };

  const handleCreateTicket = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    // this.form.validateAll();

    // if (this.checkBtn.context._errors.length === 0)
    if (true) {
      dispatch(
        createTicket(title, description, priority, specialty, status, developer)
      )
        .then(() => {
          setMessage(title + "ticket successfully registered!");
          setSuccessful(true);

          this.props.handleCloseCreateTicketModal();
        })
        .catch(() => {
          setSuccessful(false);
        });
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        {/* <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        /> */}

        <Form
          onSubmit={handleCreateTicket}
          // ref={(c) => {
          //     this.form = c;
          // }}
        >
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="username">Title</label>
                <Input
                  type="text"
                  className="form-control"
                  name="title"
                  value={title}
                  onChange={onChangeTitle}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <Input
                  type="text"
                  className="form-control"
                  name="description"
                  value={description}
                  onChange={onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label htmlFor="priority">Priority</label>
                <Input
                  type="text"
                  className="form-control"
                  name="priority"
                  value={priority}
                  onChange={onChangePriority}
                />
              </div>

              <div className="form-group">
                <label htmlFor="specialty">Specialty</label>
                <Input
                  type="text"
                  className="form-control"
                  name="specialty"
                  value={specialty}
                  onChange={onChangeSpecialty}
                />
              </div>

              <div className="form-group">
                <label htmlFor="status">Status</label>
                <Input
                  type="text"
                  className="form-control"
                  name="status"
                  value={status}
                  onChange={onChangeStatus}
                />
              </div>

              <div className="form-group">
                <label htmlFor="developer">Developer</label>
                <Input
                  type="text"
                  className="form-control"
                  name="developer"
                  value={developer}
                  onChange={onChangeDeveloper}
                  // validations={[required, vpassword]}
                />
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block">Sign Up</button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          {/*<CheckButton*/}
          {/*    style={{display: "none"}}*/}
          {/*    ref={(c) => {*/}
          {/*        this.checkBtn = c;*/}
          {/*    }}*/}
          {/*/>*/}
        </Form>
      </div>
    </div>
  );
};

export default CreateTicketModal;
