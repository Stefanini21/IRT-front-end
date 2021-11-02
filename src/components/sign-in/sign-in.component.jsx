import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {authUser} from "../../redux/actions/auth";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import {useHistory} from "react-router-dom";
import {getUserLoaded} from "../../redux/selectors/auth";

const SignIn = () => {

    const dispatch = useDispatch();
    const history = useHistory();

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
            "email": login,
            "password": password
        }

        dispatch(authUser(formattedData));

        history.push('/user');
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

                    // ref={(c) => {
                    //     this.form = c;
                    // }}
                >
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="email"
                            value={login}
                            onChange={e => setLogin(e.target.value)}
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
                            onChange={e => setPassword(e.target.value)}
                            validations={[required]}
                        />
                    </div>
                    <div className="form-group">
                        <button
                            className="btn btn-primary btn-block"
                            // disabled={this.state.loading}
                        >
                            {/*{this.state.loading && (*/}
                            {/*    <span className="spinner-border spinner-border-sm"></span>*/}
                            {/*)}*/}
                            <span>Login</span>
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default SignIn;
