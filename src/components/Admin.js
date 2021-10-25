import React, { Component } from 'react';
import {
    TabContent, TabPane, Nav, NavItem, NavLink, Button,
    Table, Container, Row, Col
} from 'reactstrap';
import classnames from 'classnames';
import axios from 'axios'
import Header from "./Header";
import Footer from "./Footer";
import Login from "./Login";

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: props.currentUser,
            activeTab: '1',
            users: [],
            loggedIn: true
        }
        this.logout = this.logout.bind(this)
    }

    editUser(e) {
        alert(e.target.textContent)
    }

    componentDidMount() {
        let table = document.querySelector(".table-users")
        let tbodyUsersTable = table.firstElementChild.nextElementSibling;

        axios.get('http://localhost:8080/api/users')
        .then(response => {
                console.log(response);
                this.setState({
                    users: response.data
                });
                for (var i = 0; i < response.data.length; i++) {
                    tbodyUsersTable.innerHTML += "<tr><th scope='row'>" + response.data[i].id + "</th>"
                        + "<td>" + response.data[i].firstName + "</td><td>" + response.data[i].lastName + "</td>"
                        + "<td>" + response.data[i].userName + "</td><td>" + response.data[i].email + "</td>"
                        + "<td>" + response.data[i].role + "</td><td>" + response.data[i].specialty + "</td>"
                        + "<td>" + response.data[i].userStatus + "</td>"
                        + "<td><button  type='button' onClick={editUser()} id='userEdit' class='btn btn-info'>Edit</button></td>"
                        + "<td><button id='userDelete' class='btn btn-danger'>Delete</button></td></td></tr>"
                }
            }).catch(() => {
                this.setState({
                    users: []
                });
            })
    }

    toggle(tab) {
        this.setState({
            activeTab: tab
        });
    }

    logout(tab) {
        this.setState({
            loggedIn: false
        });
    }


    render() {
        let activeTab = this.state.activeTab;
        let users = this.state.users;


        return (
            <div>
                {this.state.loggedIn === true ?
                    <div>
                        <Header currentUser={this.state.currentUser} />
                        <Container style={{ marginTop: 20 }}>
                            <Row>
                                <Col>
                                <Button className="float-end" style={{ backgroundColor: 'transparent', color: 'grey', marginTop: -9}} onClick={this.logout}>logout</Button>
                                    <Nav tabs>
                                        <NavItem>
                                            <NavLink
                                                className={classnames({ active: activeTab === '1' })}
                                                onClick={() => { this.toggle('1') }}
                                            >
                                                <h5>User list</h5>
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                className={classnames({ active: activeTab === '2' })}
                                                onClick={() => { this.toggle('2') }}
                                            >
                                                <h5>Ticket list</h5>
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                    <TabContent activeTab={activeTab}>
                                        <TabPane tabId="1">
                                            <Row>
                                                <Col sm="12">
                                                    <h4 style={{ display: 'inline-block', paddingTop: '10px' }}>All users</h4>
                                                    <Button className="float-end" color="primary" style={{ marginTop: 15, marginBottom: 5 }}>Register user</Button>
                                                    <Table striped className="table-users">
                                                        <thead>
                                                            <tr>
                                                                <th>ID</th>
                                                                <th>First name</th>
                                                                <th>Last name</th>
                                                                <th>Username</th>
                                                                <th>Email</th>
                                                                <th>Role</th>
                                                                <th>Specialty</th>
                                                                <th>Status</th>
                                                                <th>Edit</th>
                                                                <th>Delete</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {/* Generated rows and columns by javascript after fetch data from database */}
                                                        </tbody>
                                                    </Table>
                                                </Col>
                                            </Row>
                                        </TabPane>
                                        <TabPane tabId="2">
                                            <Row>
                                                <Col>
                                                    <h4 style={{ display: 'inline-block', paddingTop: '10px' }}>All tickets</h4>
                                                    <Button className="float-end" color="primary" style={{ marginTop: 15, marginBottom: 5 }} >Add Ticket</Button>
                                                    <Table striped>
                                                        <thead>
                                                            <tr>
                                                                <th>#</th>
                                                                <th>Title</th>
                                                                <th>Description</th>
                                                                <th>Specialty</th>
                                                                <th>Status</th>
                                                                <th>Priority</th>
                                                                <th>Specialty</th>
                                                                <th>Creator</th>
                                                                <th>Edit</th>
                                                                <th>View</th>
                                                                <th>Delete</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <th scope="row">1</th>
                                                                <td style={{ width: '10%' }}>Tite for tiket one</td>
                                                                <td style={{ width: '25%' }}>Here will be some description of the task.. And another text to see if it will be visible in the table</td>
                                                                <td>FRONTEND</td>
                                                                <td>BACKLOG</td>
                                                                <td>HIGH</td>
                                                                <td>FRONTEND</td>
                                                                <td>username</td>
                                                                <td><Button color="primary" size="sm">Edit</Button>{' '}</td>
                                                                <td><Button color="secondary" size="sm">View</Button>{' '}</td>
                                                                <td><Button color="danger" size="sm">Delete</Button>{' '}</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">2</th>
                                                                <td>Tite for tiket two</td>
                                                                <td style={{ width: '25%' }}>Here will be some description of the task.. And another text to see if it will be visible in the table</td>
                                                                <td>BACKEND</td>
                                                                <td>IN PROGRESS</td>
                                                                <td>MEDIUM</td>
                                                                <td>FRONTEND</td>
                                                                <td>username</td>
                                                                <td><Button color="primary" size="sm">Edit</Button>{' '}</td>
                                                                <td><Button color="secondary" size="sm">View</Button>{' '}</td>
                                                                <td><Button color="danger" size="sm">Delete</Button>{' '}</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">3</th>
                                                                <td>Tite for tiket three</td>
                                                                <td style={{ width: '25%' }}>Here will be some description of the task.. And another text to see if it will be visible in the table</td>
                                                                <td>BACKEND</td>
                                                                <td>FINISHED</td>
                                                                <td>LOW</td>
                                                                <td>BACKEND</td>
                                                                <td>username</td>
                                                                <td><Button color="primary" size="sm">Edit</Button></td>
                                                                <td><Button color="secondary" size="sm">View</Button>{' '}</td>
                                                                <td><Button color="danger" size="sm">Delete</Button>{' '}</td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>
                                                </Col>
                                            </Row>
                                        </TabPane>
                                    </TabContent>
                                </Col>
                            </Row>
                        </Container>
                        <Footer />
                    </div>
                    : <Login/>}
            </div>
        );
    }

}

export default Admin;