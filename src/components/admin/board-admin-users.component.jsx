import React, {useEffect, useState} from "react";
import {Button, Modal} from "react-bootstrap";
import {deleteUser} from "../../actions/user";
import CreateUserModal from "./create.user.component";
import ViewUser from "./view.user.component";
import DataTable from "react-data-table-component";
import {useDispatch, useSelector} from "react-redux";
import {getUserList, setUserId, getSpecialties, deleteUserById} from "../../redux/actions/user";
import EditUserModal from "./edit.user.component";
import {selectUserList, selectIsFetching} from "../../redux/selectors/user";

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
            cell: (row) =>
                <Button variant="outline-secondary"
                                   onClick={() => handleShowViewUserModal(row)}>View</Button>,
            grow: 0.3
        },
        {
            name: "Edit User",
            cell: (row) => <Button variant="outline-secondary"
                                   onClick={() => handleEditUserModal(row)}>Edit</Button>,
            grow: 0.3
        },
        {
            name: "Delete User",
            cell: (row) => <Button variant="outline-secondary"
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
        dispatch(getUserList())
    }

    const handleShowDeleteUserModal = (deleteId, deleteUsername) => {
        //dispatch(setUserId(deleteId))
        setUserIdToDelete(deleteId)
        setUserNameToDelete(deleteUsername)
        setShowDeleteUserModal(true)
        console.log(userIdToDelete)
        console.log(userNameToDelete)
        console.log(showDeleteUserModal)

    }

    const handleCloseDeleteUserModal = () => {
        console.log(userIdToDelete)
        console.log(userNameToDelete)
        console.log(showDeleteUserModal)
        setShowDeleteUserModal(false)
        console.log(showDeleteUserModal)
    }

    const handleDeleteUser = () => {
        console.log(userIdToDelete + " user with this id will be deleted")
        dispatch(deleteUserById(userIdToDelete))
        .then(() => {
        //    setShowDeleteUserModal(false)
        //})
        dispatch(getUserList())})
        setShowDeleteUserModal(false)
        //console.log(showDeleteUserModal)
    }

    useEffect(() => {
        //     UserService.getUsers().then(
        //         response => {
        //             setUsers(response.data)
        //         },
        //         error => {
        //             setError(
        //                 (error.response &&
        //                     error.response.data &&
        //                     error.response.data.message) ||
        //                 error.message ||
        //                 error.toString())
        //
        //             if (error.response && error.response.status === 401) {
        //                 EventBus.dispatch("logout");
        //             }
        //
        //         }
        //     );
        // }, [])
        setUsers(userList)
        setLoading(fetching)
    }, [userList])


    useEffect(() => {
        dispatch(getUserList())
    }, [])

    return <>
        {loading ?  <Loader className="loader-spinner"
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
                    <div className="jumbotron">
                        <h4>Are you sure you want to delete: <strong>{userNameToDelete}</strong> ?</h4>
                    </div>
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
                            <Button className="button_create" variant="dark" onClick={handleShowCreateUserModal}>
                                Create User
                            </Button>
                        </div>
                        <DataTable
                            paginationPerPage={10}
                            paginationRowsPerPageOptions={[10, 25, 50]}
                            title={'Users'}
                            columns={columns}
                            data={users}
                            pagination={true}/>
                    </header>
                </div>)
        }</>

}

export default AdminUserList
