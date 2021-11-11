import React, {Component, useEffect} from "react";
import {store} from "../store";
import {useDispatch, useSelector} from "react-redux";
import {getUserById} from "../redux/actions/user";
import {selectUserId, selectUserById, selectDeleteUser} from "../redux/selectors/user";
import {Button, Modal} from "react-bootstrap";

const DeleteUserModal = () => {

    const userId = useSelector(selectUserId);
    const userById = useSelector(selectUserById);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserById(userId))
        console.log( "dispatch(getUserById(userId))")
    }, [])
    
    return (
        null
    )

}

export default DeleteUserModal