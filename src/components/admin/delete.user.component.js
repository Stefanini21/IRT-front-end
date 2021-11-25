import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteUserById, getUserList, resetDeleteUserState} from "../../redux/actions/user";
import {selectUserById, selectIsDeleted, selectUserWithTasksFlag} from "../../redux/selectors/user";

const DeleteUserModal = (props) => {
    
    const dispatch = useDispatch();
    
    const userById = useSelector(selectUserById);
    const isDeleted = useSelector(selectIsDeleted)
    const isUserWithTasks = useSelector(selectUserWithTasksFlag);
        
    useEffect(() => {
        dispatch(resetDeleteUserState())
    }, [])

    const handleDeleteUser = () => {      
        dispatch(deleteUserById(userById.id))
        .then(() => {
        dispatch(getUserList())})
    }

    return <>
        <div className="col-md-12">
            <div className="card card-container">
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                />
                
                {!isDeleted && !isUserWithTasks && (
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

                {!isDeleted && isUserWithTasks && (
                    <div>
                        <div className={"alert alert-danger"} role="alert">
                            Please, unassign tasks from this user before delete!
                        </div>
                        <button className="primary_button btn-block" onClick={props.handleCloseDeleteUserModal}>
                            OK
                        </button>
                    </div>
                )}

                {isDeleted && (
                    <div>
                        <div className={"alert alert-danger"} role="alert">
                            User <strong> {userById.username} </strong> deleted!
                        </div>
                        <button className="primary_button btn-block" onClick={props.handleCloseDeleteUserModal}>
                            OK
                        </button>
                    </div>
                )}
            </div>
        </div>   
    </>
}

export default DeleteUserModal