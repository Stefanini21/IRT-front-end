import React, {useEffect, useState} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import {isEmail} from "validator";
import {useDispatch, useSelector} from "react-redux";
import {getSpecialties, getRoles, getUserById, updateUserById, userActions} from "../../redux/actions/user";
import {selectSpecialties, selectRoles, selectUserById, selectUserId} from "../../redux/selectors/user";
import {selectDuplicatedEntryFlag, selectUserUpdatedFlag} from "../../redux/selectors/flag";
import {resetEditUserFlags} from "../../redux/actions/flag";


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



const EditUserModal = (props) => {

    const dispatch = useDispatch();
    const userId = useSelector(selectUserId);
    const userById = useSelector(selectUserById);
    const userUpdateSuccess = useSelector(selectUserUpdatedFlag);
    const duplicatedEntryFlag = useSelector(selectDuplicatedEntryFlag);
    const specialties = useSelector(selectSpecialties);
    const roles = useSelector(selectRoles);

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
        dispatch(getSpecialties());
        dispatch(getRoles());

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
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                />

                <Form
                    onSubmit={handleSubmit}

                >
                    <div>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="username"
                                value={usernameForm}
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
                                value={firstnameForm}
                                onChange={onChangeFirstName}
                                validations={[required, vfirstname]}
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
                                validations={[required, vlastname]}
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
                                validations={[required, vemail]}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="role">Role</label>
                            <select
                                className="form-control"
                                name="role"
                                defaultValue={roleForm}
                                value={roleForm}
                                validations={[required]}
                                onChange={onChangeRole}>
                                {roles.map((r, i) =>
                                    <option value={r}>{r}</option>
                                )}
                            </select>
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
                                {specialties.map((s, i) =>
                                    <option value={s}>{s}</option>
                                )}
                            </select>
                            <br/>
                        </div>

                        <div className="form-group">
                            <button className="primary_button btn-block">Update</button>
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