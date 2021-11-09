import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {authUser} from "../../redux/actions/auth";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import {useHistory} from "react-router-dom";
import {getUserLoaded} from "../../redux/selectors/auth";

const SignIn = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const currentUserLoaded = useSelector(getUserLoaded);

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const required = (value) => {
        if (!value) {
            return (
                <div className="alert alert-danger" role="alert">
                    This field is required!
                </div>
            );
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formattedData = {
            email: login,
            password: password,
        };

        dispatch(
            authUser(formattedData)
        )
            .then(() => {
                currentUserLoaded ? history.push("/home") : setMessage('Email or password are incorrect!')
            });

    }


    useEffect(() => {
        currentUserLoaded ? history.push("/home") : history.push("/login")
    }, [currentUserLoaded]);

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                />

                <Form onSubmit={handleSubmit}>

                        <div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="email"
                                    value={login}
                                    onChange={(e) => setLogin(e.target.value)}
                                    validations={[required]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    validations={[required]}
                                />
                            </div>

                            <div className="form-group">
                                <button className="btn btn-primary btn-block">
                                    <span>Login</span>
                                </button>
                            </div>
                        </div>

                    {message && (
                        <div className="form-group">
                            <div className={"alert alert-danger"}
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

export default SignIn
