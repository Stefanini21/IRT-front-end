import React, { useState } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-select";
import { selectButtonPressedCreatedTicketFlag } from "../../redux/selectors/flag";
import { useDispatch, useSelector } from "react-redux";
import {
  createTicket,
  getAllUsersBySpecialty,
} from "../../redux/actions/ticket";
import {
  getUserListBySpecialty,
  selectPriorities,
} from "../../redux/selectors/ticket";
import { selectSpecialties } from "../../redux/selectors/user";
import { getUserData } from "../../redux/selectors/auth";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const CreateTicketModal = () => {
  const dispatch = useDispatch();

  const admin = useSelector(getUserData);
  const admin_username = admin.username;

  const specialtyOptions = useSelector(selectSpecialties);

  const userListBySpecialty = useSelector(getUserListBySpecialty);

  const priorityOptions = useSelector(selectPriorities);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [developer, setDeveloper] = useState("");
  const [message, setMessage] = useState("");
  const createTicketButtonPressed = useSelector(selectButtonPressedCreatedTicketFlag);
  const [showCreateTicketModal, setShowCreateTicketModal] = useState(false);


  const handleCloseCreateTicketModal = () => {
    setShowCreateTicketModal(false);
    window.location.reload();
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const onChangePriority = (e) => {
    setPriority(e.value);
  };

  const onChangeSpecialty = (e) => {
    console.log("into onChangeSpecialty, e.value:");
    setSpecialty(e.value);

    dispatch(getAllUsersBySpecialty(e.value));

  };


  const onChangeDeveloper = (e) => {
    setDeveloper(e.value);
  };

  const handleSetStatus = () => {
    
    if (developer === "NOT SET") {
      return "BACKLOG"
    } else {
      return "ASSIGNED"
    }
  };

  const handleSetDeveloper = (developer) => {
    if (developer === "NOT SET") {
      return null;
    } else {
      return developer;
    }
  }

  const handleCreateTicket = (e) => {
    e.preventDefault();

    setMessage("");

    handleSetStatus();


    const newTicket = {
      title: title,
      description: description,
      priority: priority,
      status: handleSetStatus(),
      specialty: specialty,
      developer: handleSetDeveloper(developer),
      creator: admin_username,
    };

    dispatch(createTicket(newTicket))
      .then((response) => {
        setMessage(response);
      })
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <Form onSubmit={handleCreateTicket}>
          {!createTicketButtonPressed  && (
            <div>
              <div className="form-group">
                <label htmlFor="username">Title</label>
                <Input
                  type="text"
                  className="form-control"
                  name="title"
                  value={title}
                  onChange={onChangeTitle}
                  validations={[required]}
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
                <Select
                  options={priorityOptions.map((t) => ({
                    value: t,
                    label: t,
                  }))}
                  type="text"
                  name="priority"
                  onChange={onChangePriority}
                />
              </div>

              <div className="form-group">
                <label htmlFor="specialty">Specialty</label>
                <Select
                  options={specialtyOptions.map((t) => ({
                    value: t,
                    label: t,
                  }))}
                  type="text"
                  name="specialty"
                  onChange={onChangeSpecialty}
                />
              </div>

              <div className="form-group">
                <label htmlFor="developer">Developer</label>
                <Select
                  options={
                    userListBySpecialty &&
                    userListBySpecialty.length &&
                    userListBySpecialty.map((t) => ({
                      value: t,
                      label: t,
                    }))
                  }
                  type="text"
                  name="developer"
                  onChange={onChangeDeveloper}
                  // validations={[required, vpassword]}
                />
              </div>

              <div className="form-group">
                <button className="primary_button btn-block">
                  Create ticket
                </button>
              </div>
            </div>
          )}

          {createTicketButtonPressed && (
            <div className="form-group">
              <div className={"alert alert-success"} role="alert">
                {message}
              </div>
              <button
                className="primary_button btn-block"
                onClick={handleCloseCreateTicketModal}>
                OK
              </button>
            </div>
          )}

          {/* {message && (
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
          )} */}
        </Form>
      </div>
    </div>
  );
};

export default CreateTicketModal;