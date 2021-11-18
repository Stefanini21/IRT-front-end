import React, {useState} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-select";
import CheckButton from "react-validation/build/button";
import { useDispatch, useSelector } from "react-redux";
import { createTicket, getAllUsersBySpecialty } from "../../redux/actions/ticket";
import { getUserListBySpecialty } from "../../redux/selectors/ticket";
import { getUserData } from "../../redux/selectors/auth";

const CreateTicketModal = (props) => {

  const admin = useSelector(getUserData);
  const admin_username = admin.username;


  const userListBySpecialty = useSelector(getUserListBySpecialty);

  const usersListBySpecialtyUsernames = [];


  const statusOptions = [
    { value: "BACKLOG", label: "Backlog" },
    { value: "ASSIGNED", label: "Assigned" },
    { value: "FINISHED", label: "Finished" },
    { value: "CLOSED", label: "Closed" }
  ];

  const specialtyOptions = [
    { value: "FRONTEND", label: "Front-end" },
    { value: "BACKEND", label: "Back-end" }
  ];

  const priorityOptions = [
    { value: "LOW", label: "Low" },
    { value: "MEDIUM", label: "Medium" },
    { value: "HIGH", label: "High" }
  ];


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
  const [developerOptions, setDeveloperOptions] = useState({});


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
    setPriority(e.value);
  };

  const onChangeSpecialty = (e) => {
    console.log("into onChangeSpecialty, e.value:");
    setSpecialty(e.value);

    dispatch(getAllUsersBySpecialty(e.value));

    userListBySpecialty.forEach(function (element) {
      usersListBySpecialtyUsernames.push({
        label: element.username,
        value: element.username,
      });
    });

    setDeveloperOptions(usersListBySpecialtyUsernames);

  };

  const onChangeStatus = (e) => {
    console.log("into onChangeStatus")
    console.log(e.value)
    setStatus(e.value);
  };

  const onChangeDeveloper = (e) => {
    setDeveloper(e.value);
  };

  const handleCreateTicket = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    // this.form.validateAll();

    // if (this.checkBtn.context._errors.length === 0)
    if (true) {

  const newTicket = {
    title: title,
    description: description,
    priority: priority,
    status: status,
    specialty: specialty,
    developer: developer,
    creator: admin_username
  };

      dispatch(createTicket(newTicket))
        .then(() => {
          setMessage(title + "ticket successfully registered!");
          setSuccessful(true);
          props.handleCloseCreateTicketModal();
        })
        .catch(() => {
          setSuccessful(false);
        });
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">

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
                <Select
                  options={priorityOptions}
                  type="text"
                  name="priority"
                  onChange={onChangePriority}
                />
              </div>

              <div className="form-group">
                <label htmlFor="specialty">Specialty</label>
                <Select
                  options={specialtyOptions}
                  type="text"
                  name="specialty"
                  onChange={onChangeSpecialty}
                />
              </div>

              <div className="form-group">
                <label htmlFor="status">Status</label>
                <Select
                  options={statusOptions}
                  type="text"
                  name="status"
                  onChange={onChangeStatus}
                />
              </div>

              <div className="form-group">
                <label htmlFor="developer">Developer</label>
                <Select
                  options={developerOptions}
                  type="text"
                  name="developer"
                  onChange={onChangeDeveloper}
                  // validations={[required, vpassword]}
                />
              </div>

                            <div className="form-group">
                                <button className="primary_button btn-block">Create ticket</button>
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
