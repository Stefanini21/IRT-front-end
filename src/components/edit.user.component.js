import React, {useEffect, useState} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {isEmail} from "validator";
import {useDispatch, useSelector} from "react-redux";
import {createUser} from "../actions/user";
import {getUserById, updateUserById} from "../redux/actions/user";
import {selectUserById, selectUserId} from "../redux/selectors/user";


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
    if (value.length < 3 || value.length > 20) {
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

const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};

const EditUserModal = (props) => {

    const dispatch = useDispatch();
    const userId = useSelector(selectUserId);
    const userById = useSelector(selectUserById);

    const [usernameForm, setUsername] = useState("");
    const [firstnameForm, setFirstName] = useState("");
    const [lastnameForm, setLastName] = useState("");
    const [emailForm, setEmail] = useState("");
    const [specialtyForm, setSpecialty] = useState("");
    //const [passwordForm, setPassword] = useState(userById.password);
    const [roleForm, setRole] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const [show, setShow] = useState(true);

    useEffect(() => {
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

    // const onChangePassword = (e) => {
    //     setPassword(e.target.value)
    // }

    const onChangeSpecialty = (e) => {
        setSpecialty(e.target.value)
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
            // password: passwordForm,
            specialty: specialtyForm,
            role: roleForm
        }

        dispatch(updateUserById(formattedData, userId))
            .then(() => {
                setMessage(usernameForm + ' successfully updated!')
                setSuccessful(true)

                this.props.handleCloseCreateUserModal();
            })
            .catch(() => {
                setSuccessful(false)
            });
    }


    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                />

                <Form
                    onSubmit={handleSubmit}

                >
                    {!successful && (
                        <div>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    value={usernameForm}
                                    onChange={onChangeUsername}
                                    // validations={[required, vusername]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="firstname">First name</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="firstname"
                                    value={firstnameForm}
                                    onChange={onChangeFirstName}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="lastname">Last name</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="lastname"
                                    value={lastnameForm}
                                    onChange={onChangeLastName}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="email"
                                    value={emailForm}
                                    onChange={onChangeEmail}
                                />
                            </div>

                            {/*<div className="form-group">*/}
                            {/*    <label htmlFor="password">Password</label>*/}
                            {/*    <Input*/}
                            {/*        type="text"*/}
                            {/*        className="form-control"*/}
                            {/*        name="password"*/}
                            {/*        value={passwordForm}*/}
                            {/*        onChange={onChangePassword}*/}
                            {/*    />*/}
                            {/*</div>*/}

                            <div className="form-group">
                                <label htmlFor="specialty">Specialty</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="specialty"
                                    value={specialtyForm}
                                    onChange={onChangeSpecialty}
                                />
                            </div>

                            <div className="form-group">
                                <button className="btn btn-primary btn-block">Update</button>
                            </div>
                        </div>
                    )}

                    {message && (
                        <div className="form-group">
                            <div className={successful ? "alert alert-success" : "alert alert-danger"}
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