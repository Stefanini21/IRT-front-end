import React, {useState} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-select";
import {selectButtonPressedCreatedTicketFlag} from "../../redux/selectors/flag";
import {useDispatch, useSelector} from "react-redux";
import {
  checkIfTicketTitleExist,
  createTicket,
  getAllUsersBySpecialty,
  getTicketList,
} from "../../redux/actions/ticket";
import {getUserListBySpecialty, isDuplicateTicketTitle, selectPriorities,} from "../../redux/selectors/ticket";
import {selectSpecialties} from "../../redux/selectors/user";
import {getUserData} from "../../redux/selectors/auth";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const vtitle = (value) => {
    if (value.length < 3 || value.length > 30) {
        return (
            <div className="alert alert-danger" role="alert">
                Title must be between 3 and 30 characters.
            </div>
        );
    }
};

const vdescription = (value) => {
    if (value.length < 3) {
        return (
            <div className="alert alert-danger" role="alert">
                Description must be more than 3 characters.
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

    const createTicketButtonPressed = useSelector(
        selectButtonPressedCreatedTicketFlag
    );

    const isDuplicateTitle = useSelector(isDuplicateTicketTitle);

    // const vtitleNotRepeat = () => {
    //   console.log("isDuplicate: " + isDuplicateTitle);
    //   if (isDuplicateTitle) {
    //     return (
    //       <div className="alert alert-danger" role="alert">
    //         There is another ticket with this title.
    //       </div>
    //     );
    //   }
    // };

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("");
    const [specialty, setSpecialty] = useState("");
    const [developer, setDeveloper] = useState("");
    const [message, setMessage] = useState("");
    const [showCreateTicketModal, setShowCreateTicketModal] = useState(false);

    const handleCloseCreateTicketModal = () => {
        setShowCreateTicketModal(false);
        dispatch(getTicketList());
        window.location.reload();
    };

    const onChangeTitle = (e) => {
        setTitle(e.target.value);
        dispatch(checkIfTicketTitleExist(e.target.value));
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
            return "BACKLOG";
        } else {
            return "ASSIGNED";
        }
    };

    const handleSetDeveloper = (developer) => {
        if (developer === "NOT SET") {
            return null;
        } else {
            return developer;
        }
    };

    const handleCreateTicket = (e) => {
        e.preventDefault();

        setMessage("");

        const newTicket = {
            title: title,
            description: description,
            priority: priority,
            status: handleSetStatus(),
            specialty: specialty,
            developer: handleSetDeveloper(developer),
            creator: admin_username,
        };

        dispatch(createTicket(newTicket)).then((response) => {
            setMessage(response);
        });
    };

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <Form onSubmit={handleCreateTicket}>
                    {!createTicketButtonPressed && (
                        <div>
                            <div className="form-group">
                                <label htmlFor="username">Title</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    value={title}
                                    onChange={onChangeTitle}
                                    validations={[required, vtitle]}
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
                                    validations={[required, vdescription]}
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
                                    validations={[required]}
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
                                    validations={[required]}
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
                                    validations={[required]}
                                />
                            </div>

                            {title.length > 2 &&
                            title.length < 31 &&
                            description.length > 2 &&
                            priority &&
                            specialty &&
                            developer ? (
                                <div className="form-group">
                                    <button className="primary_button btn-block">
                                        Create ticket
                                    </button>
                                </div>
                            ) : (
                                <div className="form-group">
                                    <button disabled className="primary_button btn-block">
                                        Create ticket
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {isDuplicateTitle && title !== "" && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                There is another ticket with this title.
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
                                onClick={handleCloseCreateTicketModal}
                            >
                                OK
                            </button>
                        </div>
                    )}
                </Form>
            </div>
        </div>
    );
};

export default CreateTicketModal;
