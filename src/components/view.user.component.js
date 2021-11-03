import React, {Component} from "react";
import {store} from "../store";

const ViewUser = () => {

    const state = store.getState();
    const userId = state.setUserId.userId;

    // console.log("userId" + userId)
    // console.log(state.setUserId.userId + "staaaaaate")


    return (
        <div><h3>{userId}</h3></div>
        // <div className="container">
        //     <header className="jumbotron">
        //         <h3>
        //             User <strong>{this.props.currentUser.username}</strong>
        //         </h3>
        //     </header>
        //     <p>
        //         <strong>First Name:</strong> {this.props.currentUser.firstName}
        //     </p>
        //     <p>
        //         <strong>Last Name:</strong> {this.props.currentUser.lastName}
        //     </p>
        //     <p>
        //         <strong>Email:</strong> {this.props.currentUser.email}
        //     </p>
        //     <p>
        //         <strong>Specialty:</strong>
        //         <ul>
        //             {this.props.currentUser.specialty}
        //         </ul>
        //     </p>
        //     <p>
        //         <strong>Role:</strong>
        //         <ul>
        //             {this.props.currentUser.role}
        //         </ul>
        //     </p>
        //
        // </div>
    );
}

export default ViewUser
