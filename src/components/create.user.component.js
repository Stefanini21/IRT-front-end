import React, {Component} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {isEmail} from "validator";
import {connect} from "react-redux";
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

const email = (value) => {
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

class CreateUser extends Component {

    constructor(props) {
        super(props);
        this.handleCreateUser = this.handleCreateUser.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeSpecialty = this.onChangeSpecialty.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            username: "",
            firstname: "",
            lastname: "",
            email: "",
            specialty: "",
            password: "",
            role: "USER",
            successful: false,
            message: "",
            show: true
        };
    }


    handleClose() {
        this.setState({
            show: false,
        });
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value,
        });
    }

    onChangeFirstName(e) {
        this.setState({
            firstname: e.target.value
        });
    }

    onChangeLastName(e) {
        this.setState({
            lastname: e.target.value
        });
    }

    onChangeSpecialty(e) {
        this.setState({
            specialty: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value,
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value,
        });
    }

    handleCreateUser(e) {
        e.preventDefault();

        this.setState({
            message: "",
            successful: false
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            this.props
                .dispatch(
                    createUser(
                        this.state.username,
                        this.state.firstname,
                        this.state.lastname,
                        this.state.specialty,
                        this.state.role,
                        this.state.email,
                        this.state.password)
                )
                .then(() => {
                    this.setState({
                        message: this.state.username + ' successfully registered!',
                        successful: true
                    });
                    this.props.handleCloseCreateUserModal();
                })
                .catch(() => {
                    this.setState({
                        successful: false,
                    });
                });
        }
    }


    render() {
        const {message} = this.props;

        return (
            <div className="col-md-12">
                <div className="card card-container">
                    <img
                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        alt="profile-img"
                        className="profile-img-card"
                    />

                    <Form
                        onSubmit={this.handleCreateUser}
                        ref={(c) => {
                            this.form = c;
                        }}
                    >
                        {!this.state.successful && (
                            <div>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="username"
                                        value={this.state.username}
                                        onChange={this.onChangeUsername}
                                        validations={[required, vusername]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="firstname">First name</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="firstname"
                                        value={this.state.firstname}
                                        onChange={this.onChangeFirstName}
                                        validations={[required, vfirstname]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="lastname">Last name</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="lastname"
                                        value={this.state.lastname}
                                        onChange={this.onChangeLastName}
                                        validations={[required, vlastname]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.onChangeEmail}
                                        validations={[required, email]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="specialty">Specialty</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="specialty"
                                        value={this.state.specialty}
                                        onChange={this.onChangeSpecialty}
                                        validations={[required, vspecialty]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <Input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onChangePassword}
                                        validations={[required, vpassword]}
                                    />
                                </div>

                                <div className="form-group">
                                    <button className="btn btn-primary btn-block">Sign Up</button>
                                </div>
                            </div>
                        )}

                        {message && (
                            <div className="form-group">
                                <div className={this.state.successful ? "alert alert-success" : "alert alert-danger"}
                                     role="alert">
                                    {message}
                                </div>
                            </div>
                        )}
                        <CheckButton
                            style={{display: "none"}}
                            ref={(c) => {
                                this.checkBtn = c;
                            }}
                        />
                    </Form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {message} = state.message;
    return {
        message,
    };
}

export default connect(mapStateToProps)(CreateUser);




