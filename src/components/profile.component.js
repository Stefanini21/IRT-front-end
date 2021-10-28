import React, {Component} from "react";
import {Redirect} from 'react-router-dom';
import {connect} from "react-redux";

class Profile extends Component {

    render() {
        const {user: currentUser} = this.props;

        if (!currentUser) {
            return <Redirect to="/login"/>;
        }

        return (
            <div className="container">
                <header className="jumbotron">
                    <h3>
                        <strong>{currentUser.username}</strong> Profile
                    </h3>
                </header>
                <p>
                    <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
                    {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
                </p>
                <p>
                    <strong>First Name:</strong> {currentUser.firstName}
                </p>
                <p>
                    <strong>Last Name:</strong> {currentUser.lastName}
                </p>
                <p>
                    <strong>Email:</strong> {currentUser.email}
                </p>
                <p>
                    <strong>Specialty:</strong>
                    <ul>
                        {currentUser.specialty}
                    </ul>
                </p>
                <p>
                    <strong>Role:</strong>
                    <ul>
                        {currentUser.role}
                    </ul>
                </p>

            </div>
        );
    }
}

function mapStateToProps(state) {
    const {user} = state.auth;
    return {
        user,
    };
}

export default connect(mapStateToProps)(Profile);