import React, {Component} from "react";
import {Redirect} from 'react-router-dom';
import {connect} from "react-redux";

export default class ViewUser extends Component {

    render() {
        return (
            <div className="container">
                <header className="jumbotron">
                    <h3>
                        User <strong>{this.props.currentUser.username}</strong>
                    </h3>
                </header>
                <p>
                    <strong>First Name:</strong> {this.props.currentUser.firstName}
                </p>
                <p>
                    <strong>Last Name:</strong> {this.props.currentUser.lastName}
                </p>
                <p>
                    <strong>Email:</strong> {this.props.currentUser.email}
                </p>
                <p>
                    <strong>Specialty:</strong>
                    <ul>
                        {this.props.currentUser.specialty}
                    </ul>
                </p>
                <p>
                    <strong>Role:</strong>
                    <ul>
                        {this.props.currentUser.role}
                    </ul>
                </p>

            </div>
        );
    }
}

