import React, {useState} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-select";
import {useDispatch} from "react-redux";
import {createTicket} from "../../redux/actions/ticket";

const CreateTicketModal = () => {


    const statusOptions = [
        {value: "BACKLOG", label: "Backlog"},
        {value: "ASIGNED", label: "Assigned"},
        {value: "FINISHED", label: "Finished"},
        {value: "CLOSED", label: "Closed"}
    ];

    const specialtyOptions = [
        {value: "FRONTEND", label: "Front-end"},
        {value: "BACKEND", label: "Back-end"}
    ];

    const priorityOptions = [
        {value: "LOW", label: "Low"},
        {value: "MEDIUM", label: "Medium"},
        {value: "HIGH", label: "High"}
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
        console.log("into onChangeSpecialty");
        console.log(e.value);
        setSpecialty(e.value);
    };

    const onChangeStatus = (e) => {
        console.log("into onChangeStatus")
        console.log(e.value)
        setStatus(e.value);
    };

    const onChangeDeveloper = (e) => {
        setDeveloper(e.target.value);
    };

    const handleCreateTicket = (e) => {
        e.preventDefault();

        setMessage("");
        setSuccessful(false);


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
    };

    return (
        <div className="col-md-12">
            <div className="card card-container">

                <Form
                    onSubmit={handleCreateTicket}
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
                                <Select options={priorityOptions}
                                        type="text"
                                        name="priority"
                                        onChange={onChangePriority}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="specialty">Specialty</label>
                                <Select options={specialtyOptions}
                                        type="text"
                                        name="specialty"
                                        onChange={onChangeSpecialty}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="status">Status</label>
                                <Select options={statusOptions}
                                        type="text"
                                        name="status"
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
                </Form>
            </div>
        </div>
    );
};

export default CreateTicketModal;
