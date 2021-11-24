import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {authUser} from "../../redux/actions/auth";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import {Link, useHistory} from "react-router-dom";
import {getMessage} from "../../redux/selectors/message";


const SignIn = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const message = useSelector(getMessage)

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

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
            authUser(formattedData, history)
        );
    }

    return (<div style={{display: 'flex',  justifyContent:'center', alignItems:'center', marginTop: 100}}>

            <div style={{width: "27%"}} className={"card card-container"}>

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
                            <button className="primary_button btn-block" style={{backgroundColor: "#475bb3"}}>
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

                <p className="forgot-password text-right" style={{color: "#475bb3"}}>
                    <Link to={'/forgot'}>Forgot password ?</Link>
                </p>

            </div>
        </div>
    );
}

export default SignIn