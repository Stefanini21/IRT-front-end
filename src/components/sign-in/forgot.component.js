import React, {useState} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import {useDispatch} from "react-redux";
import {postEmail} from "../../redux/actions/user";


const Forgot = () => {

    const [email, setEmail] = useState("");
    const dispatch = useDispatch();

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


        const emailData = {
            toEmail: email
        }

        dispatch(postEmail(emailData))

    }

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <h3> Forgot password </h3>

                <Form onSubmit={handleSubmit}>

                    <div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <Input
                                type="email"
                                className="form-control"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                validations={[required]}
                            />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary btn-block">
                                <span>Submit</span>
                            </button>
                        </div>

                    </div>
                </Form>

            </div>
        </div>
    );
}

export default Forgot