import React, {Component} from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import DataTable from 'react-data-table-component';
import {Button, Modal} from "react-bootstrap";
import CreateUser from "./create.user.component";


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
];


export default class BoardAdmin extends Component {
    constructor(props) {
        super(props);
        this.handleShowCreateUserModal = this.handleShowCreateUserModal.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            users: [],
            error: "",
            show: false
        };
    }


    handleShowCreateUserModal() {
        this.setState({
            show: true,
        });
    }

    handleClose() {
        this.setState({
            show: false,
        });
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
            <div className="container">
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CreateUser handleClose={this.handleClose}/>
                    </Modal.Body>
                </Modal>
                <header className="jumbotron">
                    {this.state.error && <h3>{this.state.error}</h3>}
                    <div style={{margin : 10}}>
                        <Button variant="primary" onClick={this.handleShowCreateUserModal}>
                            Create User
                        </Button>
                    </div>
                    <DataTable title={'Users'} columns={columns} data={this.state.users} pagination={true}/>
                </header>
            </div>


        );
    }
}
