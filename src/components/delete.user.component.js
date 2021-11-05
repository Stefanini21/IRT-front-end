import React, {Component, useEffect} from "react";
import {store} from "../store";
import {useDispatch, useSelector} from "react-redux";
import {deleteUserById} from "../redux/actions/delete-user";
import {selectUserId, selectUserById} from "../redux/selectors/user";


export const DeleteUserModal = () => {

    const userId = useSelector(selectUserId);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(deleteUserById(userId))
        console.log( "dispatch(deleteUserById(userId))")
    }, [])
    return (
        alert("User" + userId + "has been deleted!")
    );

}