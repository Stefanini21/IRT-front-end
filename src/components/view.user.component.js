import React, {Component, useEffect} from "react";
import {store} from "../store";
import {useDispatch} from "react-redux";
import {getUserById} from "../redux/actions/user";

const ViewUser = () => {

    const state = store.getState();
    const userId = state.setUserId.userId;
    const userById = state.setUserId.userById;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserById(userId))
        console.log( "dispatch(getUserById(userId))")
    }, [])

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>
                    User <strong>{userById.username}</strong>
                </h3>
            </header>
            <p>
                <strong>First Name : </strong> {userById.firstName}
            </p>
            <p>
                <strong>Last Name : </strong> {userById.lastName}
            </p>
            <p>
                <strong>Email : </strong> {userById.email}
            </p>
            <p>
                <strong>Specialty : </strong> {userById.specialty}
            </p>
            <p>
                <strong>Role : </strong> {userById.role}
            </p>

        </div>
    );
}

export default ViewUser
