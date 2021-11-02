import React, {Component} from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import DataTable from 'react-data-table-component';
import {Button, Modal} from "react-bootstrap";
import CreateUser from "./create.user.component";
import {deleteUser} from "../actions/user";
import {connect} from "react-redux";
import ViewUser from "./view.user.component";


class BoardAdmin extends Component {


    constructor(props) {
        super(props);
        this.handleShowCreateUserModal = this.handleShowCreateUserModal.bind(this);
        this.handleCloseCreateUserModal = this.handleCloseCreateUserModal.bind(this);
        this.handleShowDeleteUserModal = this.handleShowDeleteUserModal.bind(this);
        this.handleCloseDeleteUserModal = this.handleCloseDeleteUserModal.bind(this);
        this.handleShowViewUserModal = this.handleShowViewUserModal.bind(this);
        this.handleCloseViewUserModal = this.handleCloseViewUserModal.bind(this);
        this.handleDeleteUser = this.handleDeleteUser.bind(this);

        this.state = {
            users: [],
            error: "",
            showCreateUserModal: false,
            showDeleteUserModal: false,
            showViewUserModal: false,
            userIdToDelete: '',
            userNameToDelete: '',
            userToView: [],
            columns: [
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
                                           onClick={() => this.handleShowViewUserModal(row)}>View</Button>,
                    grow: 0.3
                },
                {
                    name: "Edit User",
                    cell: () => <Button variant="primary">Edit</Button>,
                    grow: 0.3
                },
                {
                    name: "Delete User",
                    cell: (row) => <Button variant="danger"
                                           onClick={() => this.handleShowDeleteUserModal(row.id, row.username)}>Delete</Button>,
                    grow: 1
                },
            ]
        };

    }


    handleShowCreateUserModal() {
        this.setState({
            showCreateUserModal: true,
        });
    }

    handleCloseCreateUserModal() {
        this.setState({
            showCreateUserModal: false,
        });
        window.location.reload()
    }

    handleShowViewUserModal(userToView) {
        this.setState({
            showViewUserModal: true,
            userToView: userToView,
        });
    }

    handleCloseViewUserModal() {
        this.setState({
            showViewUserModal: false,
        });
    }

    handleShowDeleteUserModal(userId, username) {
        this.setState({
            userIdToDelete: userId,
            userNameToDelete: username,
            showDeleteUserModal: true,
        });
    }

    handleCloseDeleteUserModal() {
        this.setState({
            showDeleteUserModal: false,
        });
        window.location.reload()
    }

    handleDeleteUser() {
        this.props
            .dispatch(
                deleteUser(this.state.userIdToDelete)
            )
            .then(() => {
                this.setState({
                    message: this.state.userNameToDelete + ' successfully deleted!',
                    successful: true,
                    showDeleteUserModal: false,
                });
            })
            .catch(() => {
                this.setState({
                    successful: false,
                });
            });
        this.setState({});
        window.location.reload()
    }


    componentDidMount() {
        UserService.getUsers().then(
            response => {
                this.setState({
                    users: response.data
                });
            },
            error => {
                this.setState({
                    error:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });

                if (error.response && error.response.status === 401) {
                    EventBus.dispatch("logout");
                }
            }
        );
    }

    render() {
        return (
            <div>
                <Modal show={this.state.showCreateUserModal} onHide={this.handleCloseCreateUserModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CreateUser handleCloseCreateUserModal={this.handleCloseCreateUserModal}/>
                    </Modal.Body>
                </Modal>

                <Modal show={this.state.showViewUserModal} onHide={this.handleCloseViewUserModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>View User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ViewUser currentUser={this.state.userToView}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleCloseViewUserModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.showDeleteUserModal} onHide={this.handleCloseDeleteUserModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete this {this.state.userNameToDelete}?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleCloseDeleteUserModal}>
                            No
                        </Button>
                        <Button variant="primary" onClick={this.handleDeleteUser}>
                            Yes
                        </Button>
                    </Modal.Footer>
                </Modal>

                <header className="jumbotron">
                    {this.state.error && <h3>{this.state.error}</h3>}
                    <div style={{margin: 10}}>
                        <Button variant="primary" onClick={this.handleShowCreateUserModal}>
                            Create User
                        </Button>
                    </div>
                    <DataTable paginationPerPage={5} paginationRowsPerPageOptions={[5, 10, 15]} title={'Users'}
                               columns={this.state.columns} data={this.state.users} pagination={true}/>
                </header>
            </div>


        );
    }


}

// function mapStateToProps(state) {
//     const {message} = state.message;
//     return {
//         message,
//     };
// }

export default BoardAdmin
