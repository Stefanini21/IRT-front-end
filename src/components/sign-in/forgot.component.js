import React, {useState} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import {useDispatch, useSelector} from "react-redux";
import {postEmail} from "../../redux/actions/user";
import {selectFailPasswordSendFlag} from "../../redux/selectors/flag";
import {useHistory} from "react-router-dom";


const Forgot = () => {

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();
    const failPasswordSend = useSelector(selectFailPasswordSendFlag);
    const history = useHistory();

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

        dispatch(postEmail(emailData, history))

    }

    return (<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 100}}>

            <div className="card card-container">
                <h3> Forgot password </h3>

                <Form onSubmit={handleSubmit}>

                    <div>

                        {failPasswordSend && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    Something went wrong ! Enter your email again and click resend.
                                </div>
                            </div>
                        )}

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
                            <button className="primary_button btn-block">
                                <span>Send</span>
                            </button>
                        </div>

                    </div>

                    {message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                </Form>

            </div>
        </div>
    );
}

export default Forgot