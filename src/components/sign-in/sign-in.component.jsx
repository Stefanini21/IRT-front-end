import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {authUser} from "../../redux/actions/auth";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import {useHistory} from "react-router-dom";
import {getMessage} from "../../redux/selectors/message";


const SignIn = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const message = useSelector(getMessage)

  const [email, setEmail] = useState("");
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
      email: email,
      password: password,
    };
    console.log("formattedData: " + formattedData)
    dispatch(authUser(formattedData));
  };

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
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
            <label htmlFor="email">Email</label>
            <Input
              type="text"
              className="form-control"
              name="email"
              value={email}
              onChange={(e) => setLEmail(e.target.value)}
              validations={[required]}
            />
          </div>

                    {message && (
                        <div className="form-group">
                            <div className={"alert alert-danger"}
                                 role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                    </div>

                </Form>
            </div>
        </div>
    );
}

export default SignIn