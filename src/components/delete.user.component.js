import React, {Component, useEffect} from "react";
import {store} from "../store";
import {useDispatch, useSelector} from "react-redux";
import {deleteUserById} from "../redux/actions/delete-user";
import {selectUserId, selectUserById} from "../redux/selectors/user";


const DeleteUserModal = () => {

    const userId = useSelector(selectUserId);
    const userById = useSelector(selectUserById);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(deleteUserById(userId))
        console.log( "dispatch(deleteUserById(userId))")
    }, [])
    return (
        /*
        <div className="jumbotron">
            Are you sure you want to delete this <strong>{userById.username}</strong>?
        </div>*/
        <p>Hello</p>
    );

}

export default DeleteUserModal