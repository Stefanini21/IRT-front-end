import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteUserById, getUserList, getUserById} from "../../redux/actions/user";
import {selectIdToDelete, selectUserNameToDelete, selectUserId, selectUserById, selectIsDeleted} from "../../redux/selectors/user";
import {selectDuplicatedEntryFlag, selectSuccessfulCreatedUserFlag, selectUserWithTasksFlag} from "../../redux/selectors/flag";
import UserService from "../../services/user.service";

const DeleteUserModal = () => {

    const dispatch = useDispatch();
    
    const userId = useSelector(selectUserId);
    const userById = useSelector(selectUserById);
    const isDeleted = useSelector(selectIsDeleted)
    const isUserWithTasks = useSelector(selectUserWithTasksFlag);
    
    const [show, setShow] = useState(false);

    const handleCloseDeleteUserModal = () => {
        setShow(false)
        window.location.reload()
        //dispatch(getUserList())
    }

    const handleDeleteUser = () => {      
        dispatch(deleteUserById(userId))
        .then(() => {
        dispatch(getUserList())})
        //setShowDeleteUserModal(false)
        //console.log(showDeleteUserModal)
    }

    useEffect(() => {
        dispatch(getUserById(userId))
        console.log("dispatch(deleteUserById(userId))")
    }, [])

    useEffect(() => {
        dispatch(getUserList());
    }, [])

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                />
                
                {!isDeleted && (
                    <div>
                    <div className="jumbotron">
                        <h4>Delete: <strong>{userById.username}</strong> ?</h4>
                    </div>
                    <button className="primary_button btn-block" onClick={handleCloseDeleteUserModal}>
                        No
                    </button>
                    <button className="primary_button btn-block" onClick={handleDeleteUser}>
                        Yes
                    </button>
                </div>
                )}

                {isDeleted && (
                <div>
                    <div className={"alert alert-danger"} role="alert">
                        User deleted!
                    </div>
                    <button className="primary_button btn-block" onClick={handleCloseDeleteUserModal}>
                        OK
                    </button>
                </div>
                )}
                
                {isUserWithTasks && (
                <div>
                    <div className={"alert alert-danger"} role="alert">
                        Please, unassign tasks from this user before delete!
                    </div>
                    <button className="primary_button btn-block" onClick={handleCloseDeleteUserModal}>
                        OK
                    </button>
                </div>
                )}
            </div>
        </div>
    );
}

export default DeleteUserModal