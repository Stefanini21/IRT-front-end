import React, {useState} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {isEmail} from "validator";
import {useDispatch} from "react-redux";
import {createUser} from "../actions/user";


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

const CreateUserModal = (props) => {

    const dispatch = useDispatch();

    const [username, setUsername] = useState("");
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [specialty, setSpecialty] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("USER");
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const [show, setShow] = useState(true);


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

    const onChangeEmail = (e) => {
            setEmail(e.target.value)
    }

    const onChangePassword = (e) => {
            setPassword(e.target.value)
    }

    const handleCreateUser = (e) => {
        e.preventDefault();

            setMessage("")
            setSuccessful(false)

        // this.form.validateAll();

        // if (this.checkBtn.context._errors.length === 0)
        if (true)
        {
                dispatch(
                    createUser(
                        username,
                        firstname,
                        lastname,
                        specialty,
                        role,
                        email,
                        password)
                )
                .then(() => {
                        setMessage(username + ' successfully registered!')
                        setSuccessful(true)

                    this.props.handleCloseCreateUserModal();
                })
                .catch(() => {
                        setSuccessful(false)
                });
        }
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
                        onSubmit={handleCreateUser}
                        // ref={(c) => {
                        //     this.form = c;
                        // }}
                        >
                        {!successful && (
                            <div>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="username"
                                        value={username}
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
                                        value={firstname}
                                        onChange={onChangeFirstName}
                                        // validations={[required, vfirstname]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="lastname">Last name</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="lastname"
                                        value={lastname}
                                        onChange={onChangeLastName}
                                        // validations={[required, vlastname]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="email"
                                        value={email}
                                        onChange={onChangeEmail}
                                        // validations={[required, vemail]}
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
                                        // validations={[required, vspecialty]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <Input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={password}
                                        onChange={onChangePassword}
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
                                <div className={successful ? "alert alert-success" : "alert alert-danger"}
                                     role="alert">
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

}


export default CreateUserModal




