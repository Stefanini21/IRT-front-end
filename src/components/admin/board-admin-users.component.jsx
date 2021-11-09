import React, {useEffect, useState} from "react";
import {Button, Modal} from "react-bootstrap";
import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";
import CreateUserModal from "../create.user.component";
import DeleteUserModal from "../delete.user.component";
import ViewUser from "../view.user.component";
import DataTable from "react-data-table-component";
import {useDispatch} from "react-redux";
import {closeModal, setUserId} from "../../redux/actions/user";
import EditUserModal from "../edit.user.component";

const AdminUserList = () => {

    const dispatch = useDispatch();

    const [showCreateUserModal, setShowCreateUserModal] = useState(false);
    const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
    const [showViewUserModal, setShowViewUserModal] = useState(false);
    const [showEditUserModal, setShowEditUserModal] = useState(false);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const [userIdToDelete, setUserIdToDelete] = useState('');
    const [userNameToDelete, setUserNameToDelete] = useState('');
    const [userToView, setUserToView] = useState([]);


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
            name: 'Role',
            selector: row => row.role,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Specialty',
            selector: row => row.specialty,
            sortable: true,
        },
        {
            name: "View User",
            cell: (row) => <Button variant="success"
                                   onClick={() => handleShowViewUserModal(row)}>View</Button>,
            grow: 0.3
        },
        {
            name: "Edit User",
            cell: (row) => <Button variant="primary"
                                   onClick={() => handleEditUserModal(row)}>Edit</Button>,
            grow: 0.3
        },
        {
            name: "Delete User",
            cell: (row) => <Button variant="danger"
                                   onClick={() => handleShowDeleteUserModal(row.id, row.username)}>Delete</Button>,
            grow: 1
        },
    ]

    const handleShowCreateUserModal = () => {
        setShowCreateUserModal(true)
    }

    const handleCloseCreateUserModal = () => {
        setShowCreateUserModal(false)
        window.location.reload()
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
    }

    const handleShowDeleteUserModal = (userId, username) => {
        setUserIdToDelete(userId)
        setUserNameToDelete(username)
        setShowDeleteUserModal(true)

    }

    const handleCloseDeleteUserModal = () => {
        setShowDeleteUserModal(false)
        window.location.reload()
    }

    const handleDeleteUser = () => {
        dispatch(
                deleteUserById(userIdToDelete)
            )
            .then(() => {
                    setShowDeleteUserModal(false)
            })
    }

    useEffect(() => {
        UserService.getUsers().then(
            response => {
                    setUsers(response.data)
            },
            error => {
                    setError(
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                            error.message ||
                            error.toString())

                if (error.response && error.response.status === 401) {
                    EventBus.dispatch("logout");
                }

            }
        );
        }, [])

    useEffect(() => {
        dispatch(closeModal)
    }, [])
    // useEffect(() => {
    //     dispatch(closeModal)
    // }, [handleCloseViewUserModal])

    return (
        <div>
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
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseViewUserModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showEditUserModal} onHide={handleCloseEditUserModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
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
                    Are you sure you want to delete this {userNameToDelete}?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteUserModal}>
                        No
                    </Button>
                    <Button variant="primary" onClick={handleDeleteUser}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>

            <header className="jumbotron">
                {error && <h3>{error}</h3>}
                <div style={{margin: 10}}>
                    <Button variant="primary" onClick={handleShowCreateUserModal}>
                        Create User
                    </Button>
                </div>
                <DataTable paginationPerPage={5} paginationRowsPerPageOptions={[5, 10, 15]} title={'Users'}
                           columns={columns} data={users} pagination={true}/>
            </header>
        </div>

    );

}

export default AdminUserList