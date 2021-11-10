import React, {Component, useEffect} from "react";
import {store} from "../store";
import {useDispatch, useSelector} from "react-redux";
import {deleteUserById} from "../redux/actions/user";
import {selectUserId, selectUserById, selectDeleteUser} from "../redux/selectors/user";
import {Button, Modal} from "react-bootstrap";

const DeleteUserModal = (props) => {

    const userId = useSelector(selectUserId);
    const userById = useSelector(selectUserById);
    //const userId = useSelector(selectUserId);
    //const userToDelete = useSelector(selectDeleteUser)

    const dispatch = useDispatch();

    const deleteUser = () => {
        console.log(userId)
        dispatch(deleteUserById(userId))
            .then (() => {
                props.handleCloseDeleteUserModal();
            })
    }

    return (
        <>
        <div className="jumbotron">
            <p>Are you sure you want to delete this {userById.username} ?</p>
        </div>
        <Modal.Footer>
            <Button variant="secondary" onClick={props.handleCloseDeleteUserModal}>
                No
            </Button>
            <Button variant="primary" onClick={deleteUser}>
                Yes
            </Button>
        </Modal.Footer>
        </>
    );

}

export default DeleteUserModal