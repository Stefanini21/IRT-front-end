import React, {useState} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import {useDispatch, useSelector} from "react-redux";
import {postEmail} from "../../redux/actions/user";
import {selectFailPasswordSendFlag, selectSuccessfulPasswordSendFlag} from "../../redux/selectors/flag";


const Forgot = () => {

    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    const successfulPasswordSend = useSelector(selectSuccessfulPasswordSendFlag);
    const failPasswordSend = useSelector(selectFailPasswordSendFlag);

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

    return (<div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>

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

                    {failPasswordSend && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                This email does not exists !
                            </div>
                        </div>
                    )}

                    {successfulPasswordSend && (
                        <div className="form-group">
                            <div className="alert alert-success" role="alert">
                                Your temporary password was sent to your email !
                            </div>
                        </div>
                    )}
                </Form>

                </div>
            </div>
    );
}

export default Forgot