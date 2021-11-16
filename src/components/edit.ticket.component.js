import React, {useEffect, useState} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import {useDispatch, useSelector} from "react-redux";
import {getUserById, getUserList, updateUserById} from "../redux/actions/user";
import {selectSpecialties, selectUserById, selectUserId, selectUserList} from "../redux/selectors/user";
import {selectDuplicatedEntryFlag, selectUserUpdatedFlag} from "../redux/selectors/flag";
import {resetEditUserFlags} from "../redux/actions/flag";


const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const vemail = (value) => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        );
    }
};

const vusername = (value) => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The username must be between 3 and 20 characters.
            </div>
        );
    }
};

const vfirstname = value => {
    if (value.length < 1 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The first name must be between 3 and 20 characters.
            </div>
        );
    }
};

const vlastname = value => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The last name must be between 3 and 20 characters.
            </div>
        );
    }
};

const vspecialty = value => {
    if (value.length < 3 || value.length > 10) {
        return (
            <div className="alert alert-danger" role="alert">
                The gender must be between 3 and 10 characters.
            </div>
        );
    }
};


const EditUserModal = (props) => {

    const dispatch = useDispatch();
    const userId = useSelector(selectUserId);
    const userById = useSelector(selectUserById);
    //const updatedUser = useSelector(updateUserById);
    const userUpdateSuccess = useSelector(selectUserUpdatedFlag);
    const duplicatedEntryFlag = useSelector(selectDuplicatedEntryFlag);
    const specialties = useSelector(selectSpecialties);

    const [usernameForm, setUsername] = useState("");
    const [firstnameForm, setFirstName] = useState("");
    const [lastnameForm, setLastName] = useState("");
    const [emailForm, setEmail] = useState("");
    const [specialtyForm, setSpecialty] = useState("");
    const [roleForm, setRole] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const [show, setShow] = useState(true);

    useEffect(() => {
        dispatch(resetEditUserFlags())
        dispatch(getUserById(userId))
    }, [])


    useEffect(() => {
        setUsername(userById.username);
        setFirstName(userById.firstName);
        setLastName(userById.lastName);
        setEmail(userById.email);
        setSpecialty(userById.specialty);
        setRole(userById.role);

    }, [userById])

    const handleClose = () => {
        setShow(false)
    }

    const onChangeUsername = (e) => {
        setUsername(e.target.value)
    }

    const onChangeFirstName = (e) => {
        setFirstName(e.target.value)
    }

    const onChangeLastName = (e) => {
        setLastName(e.target.value)
    }


    const onChangeSpecialty = (e) => {
        setSpecialty(e.target.value)
    }

    const onChangeRole = (e) => {
        setRole(e.target.value)
    }

    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setMessage("")
        setSuccessful(false)

        const formattedData = {
            id: userId,
            username: usernameForm,
            firstName: firstnameForm,
            lastName: lastnameForm,
            email: emailForm,
            specialty: specialtyForm,
            role: roleForm
        }

        dispatch(updateUserById(formattedData, userId))
            .then(() => {
                setMessage(usernameForm + ' successfully updated!')
            });
    }

    return (
        <div className="col-md-12">
            <div className="card card-container">

                <Form
                    onSubmit={handleSubmit}

                >
                    <div>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="title"
                                value={titleForm}
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
                                value={descriptionForm}
                                onChange={onChangeDescription}
                                validations={[required, vdescription]}
                            />
                        </div>

                        <div>
                            <label htmlFor="priority">Priority</label>
                            <select
                                className="form-control"
                                name="priority"
                                defaultValue={priorityForm}
                                value={priorityForm}
                                onChange={onChangePriority}>
                                <option value="LOW">Low</option>
                                <option value="MEDIUM">Medium</option>
                                <option value="HIGH">High</option>
                            </select>
                            <br/>
                        </div>

                        <div>
                            <label htmlFor="specialty">Specialty</label>
                            <select
                                className="form-control"
                                name="specialty"
                                defaultValue={specialtyForm}
                                value={specialtyForm}
                                onChange={onChangeSpecialty}>
                                <option value="BACKEND">Back-End</option>
                                <option value="FRONTEND">Front-End</option>
                            </select>
                            <br/>
                        </div>

                        <div>
                            <label htmlFor="status">Status</label>
                            <select
                                className="form-control"
                                name="status"
                                defaultValue={statusForm}
                                value={statusForm}
                                onChange={onChangeStatus}>
                                <option value="BACKLOG">Backlog</option>
                                <option value="ASIGNED">Assigned</option>
                                <option value="FINISHED">Finished</option>
                                <option value="CLOSED">Closed</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <button className="btn btn-primary btn-block">Update</button>
                        </div>
                    </div>


                    {duplicatedEntryFlag && (
                        <div className="form-group">
                            <div className="alert alert-danger"
                                 role="alert">
                                Username or Email are already taken.
                            </div>
                        </div>
                    )}

                    {userUpdateSuccess && (
                        <div className="form-group">
                            <div className="alert alert-success"
                                 role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                </Form>
            </div>
        </div>
    );

}


export default EditUserModal