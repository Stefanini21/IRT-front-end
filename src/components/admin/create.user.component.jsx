import React, {useEffect, useState} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import {isEmail} from "validator";
import {useDispatch, useSelector} from "react-redux";
import {createUser} from "../../redux/actions/user";
import {selectDuplicatedEntryFlag, selectSuccessfulCreatedUserFlag} from "../../redux/selectors/flag";
import UserService from "../../services/user.service";


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

const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};

const CreateUserModal = () => {

    const dispatch = useDispatch();

    const [username, setUsername] = useState("");
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [message, setMessage] = useState("");
    const [specialtyForm, setSpecialty] = useState("");
    const duplicatedEntryFlag = useSelector(selectDuplicatedEntryFlag);
    const successfulCreatedUser = useSelector(selectSuccessfulCreatedUserFlag);

    const [roles, setRoles] = useState([]);
    const [specialties, setSpecialties] = useState([]);
    const [showCreateUserModal, setShowCreateUserModal] = useState(false);


    const handleCloseCreateUserModal = () => {

        setShowCreateUserModal(false)
        window.location.reload()
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

    const onChangeRole = (e) => {
        setRole(e.target.value)
    }


    const handleCreateUser = (e) => {
        e.preventDefault();

        const newUser = {
            firstName: firstname,
            lastName: lastname,
            username: username,
            email: email,
            role: role,
            specialty: specialtyForm,
            password: password
        }

        dispatch(createUser(newUser))
            .then(() => {

                setMessage(username + ' successfully registered!')
            })


    }


    useEffect(() => {
        UserService.getRoles().then(
            response => {
                setRoles(response.data)
            },
        );

        UserService.getSpecialties().then(
            response => {
                setSpecialties(response.data)
            },
        );

    }, [])


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
                >
                    {!successfulCreatedUser &&
                    <div>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="username"
                                value={username}
                                onChange={onChangeUsername}
                                validations={[required, vusername]}
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
                                validations={[required]}
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
                                validations={[required]}
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
                                validations={[required, vemail]}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="specialty">Specialty</label>
                            <select
                                className="form-control"
                                name="specialty"
                                defaultValue={specialtyForm}
                                value={specialtyForm}
                                onChange={onChangeSpecialty}>
                                validations={[required]}
                                {specialties.map((specialty, i) =>
                                    <option value={specialty}>{specialty}</option>
                                )}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="role">Role</label>
                            <select
                                className="form-control"
                                name="role"
                                defaultValue={role}
                                value={role}
                                onChange={onChangeRole}>
                                validations={[required]}
                                {roles.map((role, i) =>
                                    <option value={role}>{role}</option>
                                )}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Input
                                type="password"
                                className="form-control"
                                name="password"
                                value={password}
                                onChange={onChangePassword}
                                validations={[required, vpassword]}
                            />
                        </div>

                        <div className="form-group">
                            <button className="primary_button btn-block">Sign Up</button>
                        </div>
                    </div>
                    }

                    {duplicatedEntryFlag && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                Username or Email are already taken.
                            </div>
                        </div>
                    )}

                    {successfulCreatedUser && (
                        <div className="form-group">
                            <div className={"alert alert-success"}
                                 role="alert">
                                {message}
                            </div>
                            <button className="primary_button btn-block" onClick={handleCloseCreateUserModal}>
                                OK
                            </button>
                        </div>
                    )}


                </Form>
            </div>
        </div>
    );

}


export default CreateUserModal