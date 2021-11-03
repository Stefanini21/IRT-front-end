import React, {Component, useEffect} from "react";
import {store} from "../store";
import {useDispatch} from "react-redux";
import {getUserById} from "../redux/actions/user";


const ViewUser = () => {

    const state = store.getState();
    const userId = state.setUserId.userId;
    const userById = state.setUserId.userById;

    const dispatch = useDispatch();
    // console.log("userId" + userId)
    // console.log(state.setUserId.userId + "staaaaaate")

    useEffect(() => {
        dispatch(getUserById(userId))
    }, [])

    return (
        <div><h3>{userById}</h3></div>,
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
