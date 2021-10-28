import React, { Component } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";
import classnames from "classnames";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import Login from "./Login";
import DataTable from "react-data-table-component";
import RegisterUserModal from './RegisterUserModal';
import ViewUserModal from './ViewUserModal';
import EditUserModal from './EditUserModal'
import DeleteUserModal from './DeleteUserModal'

const ticketColumns = [
    {
      name: "Created date",
      selector: (row) => row.firstName,
      sortable: true,
    },
    {
      name: "Last Name",
      selector: (row) => row.lastName,
      sortable: true,
    },
    {
      name: "Username",
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Specialty",
      selector: (row) => row.specialty,
      sortable: true,
    },
    {
      name: "Veiw",
      selector: (row) => row.specialty,
      sortable: false,
    },
  ];

  const customStyles = {
    rows: {
        style: {
            maxHeight: '50px', // override the row height
        },
    }
};

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.currentUser,
      activeTab: "1",
      users: [],
      tickets: [],
      loggedIn: true,
      showRegisterUserModal: false,
      showViewUserModal: false,
      showEditUserModal: false,
      showDeleteUserModal: false,
      currentUserId: null
    };
    this.logOut = this.logOut.bind(this);
    this.registerUserModal = this.registerUserModal.bind(this);
    this.registerModalClose = this.registerModalClose.bind(this);
    this.viewUserModal = this.viewUserModal.bind(this);
    this.viewModalClose = this.viewModalClose.bind(this);
    this.deleteUserModal = this.deleteUserModal.bind(this);
    this.deleteModalClose = this.deleteModalClose.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
    this.viewUser = this.viewUser.bind(this);
    this.editUser = this.editUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.editUserModal = this.editUserModal.bind(this);
    this.editModalClose = this.editModalClose.bind(this);
  }

  registerUserModal() {
    this.setState({
        showRegisterUserModal: !this.state.showRegisterUserModal
    })
  }

  viewUserModal(id) {
    this.setState({
        showViewUserModal: !this.state.showViewUserModal,
        currentUserId: id
    })
  }

  editUserModal(id) {
    this.setState({
        showEditUserModal: !this.state.showEditUserModal,
        currentUserId: id
    })
  }

  deleteUserModal(id) {
    this.setState({
        showDeleteUserModal: !this.state.showDeleteUserModal,
        currentUserId: id
    })
  }

  componentDidMount() {
    this.getAllUsers();
  }

  getAllUsers() {
    axios
      .get("http://localhost:8080/api/users")
      .then((response) => {
        console.log(response);
        this.setState({
          users: response.data,
        });
      })
      .catch(() => {
        this.setState({
          users: [],
        });
      });
  }

  toggle(tab) {
    this.setState({
      activeTab: tab,
    });
  }

  logOut() {
    this.setState({
      loggedIn: false,
      currentUser: {},
    });
  }

  registerModalClose() {
    this.setState({
        showRegisterUserModal: false
      });
  }
  
  viewModalClose() {
    this.setState({
      showViewUserModal: false
      });
  }
  
  editModalClose() {
    this.setState({
      showEditUserModal: false
      });
  }
  
  deleteModalClose() {
    this.setState({
      showDeleteUserModal: false
      });
  }

  viewUser(e) {
      this.viewUserModal(e.target.id)
  }
  
  editUser(e) {
      this.editUserModal(e.target.id)
  }
  
  deleteUser(e) {
    this.deleteUserModal(e.target.id)
  }

  render() {
    let activeTab = this.state.activeTab;
    let users = this.state.users;
    let tickets = this.state.tickets;
    let showRegisterUserModal = this.state.showRegisterUserModal;
    let showViewUserModal = this.state.showViewUserModal;
    let showEditUserModal = this.state.showEditUserModal;
    let showDeleteUserModal = this.state.showDeleteUserModal;

    const userColumns = [
      {
        name: "Id",
        selector: (row) => row.id,
        sortable: true,
      },
      {
        name: "First Name",
        selector: (row) => row.firstName,
        sortable: true,
      },
      {
        name: "Last Name",
        selector: (row) => row.lastName,
        sortable: true,
      },
      {
        name: "Username",
        selector: (row) => row.username,
        sortable: true,
      },
      {
        name: "Role",
        selector: (row) => row.role,
        sortable: true,
      },
      {
        name: "Email",
        selector: (row) => row.email,
        sortable: true,
      },
      {
        name: "Specialty",
        selector: (row) => row.specialty,
        sortable: true,
      },
      {
        name: "Veiw",
        cell:(row)=><button className={"btn"} style={{backgroundColor: "#9CFF00"}} onClick={this.viewUser} id={row.id}>View</button>,
        grow: 0.3
      },
      {
        name: "Edit",
        cell:(row)=><button className={"btn"} style={{backgroundColor: "#009CFF"}} onClick={this.editUser} id={row.id}>Edit</button>,
        grow: 0.3
      },
      {
        name: "Delete",
        cell:(row)=><button className={"btn"} style={{backgroundColor: "#FF009C", color: "white"}} onClick={this.deleteUser} id={row.id}>Delete</button>,
        grow: 1
      },
    ];

    return (
      <div>
        {this.state.loggedIn === true ? (
          <div>
            <Header currentUser={this.state.currentUser} logOut={this.logOut} />
            {showRegisterUserModal === true && 
            <RegisterUserModal 
            showRegUserModal={showRegisterUserModal} 
            modalClose={this.registerModalClose}
            getAllUsers={this.getAllUsers}
            />}
            {showViewUserModal === true && 
            <ViewUserModal 
            showViewUserModal={showViewUserModal} 
            modalClose={this.viewModalClose}
            getAllUsers={this.getAllUsers}
            currentUserId={this.state.currentUserId}
            />}
            {showEditUserModal === true && 
            <EditUserModal 
            showEditUserModal={showEditUserModal} 
            modalClose={this.editModalClose}
            currentUserId={this.state.currentUserId}
            />}
            {showDeleteUserModal === true && 
            <DeleteUserModal 
            showDeleteUserModal={showDeleteUserModal} 
            modalClose={this.deleteModalClose}
            currentUserId={this.state.currentUserId}
            />}
            <Container style={{ marginTop: 20, overflowY: scroll }}>
              <Row>
                <Col>
                  <Nav tabs>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: activeTab === "1" })}
                        onClick={() => {
                          this.toggle("1");
                        }}
                      >
                        <h5>User list</h5>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: activeTab === "2" })}
                        onClick={() => {
                          this.toggle("2");
                        }}
                      >
                        <h5>Ticket list</h5>
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                      <Row>
                        <Col sm="12">
                          <Button
                            className="float-end"
                            color="dark"
                            style={{ marginTop: 20, marginBottom: 20 }}
                            onClick={this.registerUserModal}
                          >
                            Register user
                          </Button>
                          <DataTable
                          className="dataTables_wrapper"
                            columns={userColumns}
                            data={users}
                            pagination={true}
                            responsive={true}
                            customStyles={customStyles}
                            noHeader
                            highlightOnHover
                          />
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="2">
                      <Row>
                        <Col>
                          <Button
                            className="float-end"
                            color="dark"
                            style={{ marginTop: 20, marginBottom: 20 }}
                          >
                            Add Ticket
                          </Button>
                          <DataTable
                            columns={ticketColumns}
                            data={tickets}
                            pagination={true}
                          />
                        </Col>
                      </Row>
                    </TabPane>
                  </TabContent>
                </Col>
              </Row>
            </Container>
            <Footer />
          </div>
        ) : (
          <Login />
        )}
      </div>
    );
  }
}

export default Admin;
