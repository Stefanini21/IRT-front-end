import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteUserById, getUserList, getUserById, resetDeleteUserState} from "../../redux/actions/user";
import {selectUserId, selectUserById, selectIsDeleted, selectUserWithTasksFlag} from "../../redux/selectors/user";

const DeleteUserModal = (props) => {
    

    const dispatch = useDispatch();
    
    const userId = useSelector(selectUserId);
    const userById = useSelector(selectUserById);
    const isDeleted = useSelector(selectIsDeleted)
    const isUserWithTasks = useSelector(selectUserWithTasksFlag);
        
    const [show, setShow] = useState(false);

    useEffect(() => {
        dispatch(resetDeleteUserState())
        dispatch(getUserById(userId))
    }, [])

    useEffect(() => {
        dispatch(getUserList());
    }, [])   

    //const handleCloseDeleteUserModal = () => {
    //    dispatch(setShow(false))
    //    window.location.reload()
        //dispatch(getUserList())
    //}

    const handleDeleteUser = () => {      
        dispatch(deleteUserById(userId))
        .then(() => {
        dispatch(getUserList())})
        //setShowDeleteUserModal(false)
        //console.log(showDeleteUserModal)
    }

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
                    <button className="primary_button btn-block" onClick={props.handleCloseDeleteUserModal}>
                        No
                    </button>
                    <button className="primary_button btn-block" onClick={handleDeleteUser}>
                        Yes
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
                
            </div>
        </div>
    );
}

export default DeleteUserModal