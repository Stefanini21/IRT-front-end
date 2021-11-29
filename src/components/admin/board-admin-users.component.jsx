import React, {useEffect, useState} from "react";
import {Modal} from "react-bootstrap";
import CreateUserModal from "./create.user.component";
import ViewUser from "./view.user.component";
import DataTable from "react-data-table-component";
import {useDispatch, useSelector} from "react-redux";
import {getRoles, getSpecialties, getUserList, setUserId, getUserById} from "../../redux/actions/user";
import EditUserModal from "./edit.user.component";
import {selectIsFetching, selectUserList} from "../../redux/selectors/user";
import Loader from "react-loader-spinner";
import DeleteUserModal from "./delete.user.component";

const AdminUserList = () => {

    const dispatch = useDispatch();

    const [showCreateUserModal, setShowCreateUserModal] = useState(false);
    const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
    const [showViewUserModal, setShowViewUserModal] = useState(false);
    const [showEditUserModal, setShowEditUserModal] = useState(false);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const [userToView, setUserToView] = useState([]);
    const [loading, setLoading] = useState(true);
   
    const userList = useSelector(selectUserList);
    const fetching = useSelector(selectIsFetching);
    
    const columns = [
        {
            name: 'First Name',
            selector: row => row.firstName,
            sortable: true,
        },
        {
            name: 'Last Name',
            selector: row => row.lastName,
            sortable: true,
        },
        {
            name: 'Username',
            selector: row => row.username,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Role',
            selector: row => row.role,
            sortable: true,
        },
        {
            name: 'Specialty',
            selector: row => row.specialty,
            sortable: true,
        },
        {
            name: "View User",
            cell: (row) =>
                <button className="secondary_button"
                        onClick={() => handleShowViewUserModal(row)}>View</button>,
            grow: 0.3
        },
        {
            name: "Edit User",
            cell: (row) => 
                <button className="secondary_button"
                        onClick={() => handleEditUserModal(row)}>Edit</button>,
            grow: 0.3
        },
        {
            name: "Delete User",
            cell: (row) => 
                <button className="secondary_button"
                        onClick={() => handleShowDeleteUserModal(row)}>Delete</button>,
            grow: 1
        },
    ]

    const handleShowCreateUserModal = () => {
        setShowCreateUserModal(true)
    }

    const handleCloseCreateUserModal = () => {
        setShowCreateUserModal(false)
        // window.location.reload()
    }

    const handleShowViewUserModal = (userToView) => {
        dispatch(setUserId(userToView.id))
        setShowViewUserModal(true)
        setUserToView(userToView)
    }

    const handleEditUserModal = (userToEdit) => {
        dispatch(setUserId(userToEdit.id))
        setShowEditUserModal(true)
        setUserToView(userToEdit)
    }

    const handleCloseViewUserModal = () => {       
        setShowViewUserModal(false)
    }

    const handleCloseEditUserModal = () => {
        setShowEditUserModal(false)
        dispatch(getUserList())
    }

    const handleShowDeleteUserModal = (userToDelete) => {
        dispatch(getUserById(userToDelete.id))
        .then(() => {
        setShowDeleteUserModal(true)})
    }

    const handleCloseDeleteUserModal = () => {
        setShowDeleteUserModal(false)
        dispatch(getUserList())
    }

    useEffect(() => {
        setUsers(userList)
        setLoading(fetching)
    }, [userList])


    useEffect(() => {
        dispatch(getUserList());
        dispatch(getSpecialties());
        dispatch(getRoles());
    }, [])

    return <>
        {loading ? <Loader className="loader-spinner"
                           type="TailSpin"
                           color="#4f677f"
                           height={50}
                           width={50}
            /> :
            (<div>
                <Modal show={showCreateUserModal} onHide={handleCloseCreateUserModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CreateUserModal handleCloseCreateUserModal={handleCloseCreateUserModal}/>
                    </Modal.Body>
                </Modal>

                <Modal show={showViewUserModal} onHide={handleCloseViewUserModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>View User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ViewUser currentUser={userToView}/>
                    </Modal.Body>
                </Modal>

                <Modal show={showEditUserModal} onHide={handleCloseEditUserModal}>
                    <Modal.Header closeButton>
                        <Modal.Title className="modal_header">Edit User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <EditUserModal handleCloseEditUserModal={handleCloseEditUserModal}/>
                    </Modal.Body>
                </Modal>

                <Modal show={showDeleteUserModal} onHide={handleCloseDeleteUserModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <DeleteUserModal handleCloseDeleteUserModal={handleCloseDeleteUserModal}/>                 
                    </Modal.Body>                
                </Modal>
                
                <header className="jumbotron">
                    {error && <h3>{error}</h3>}
                    <div style={{margin: 10}}>
                        <button className="primary_button" onClick={handleShowCreateUserModal}>
                            Create User
                        </button>
                    </div>
                    <DataTable
                        paginationPerPage={10}
                        paginationRowsPerPageOptions={[10, 25, 50]}
                        title={'Users'}
                        columns={columns}
                        data={users}
                        pagination={true} />
                </header>
            </div>)
        }
    </>
}

export default AdminUserList