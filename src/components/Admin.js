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

const userColumns = [
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
];

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
  ];

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.currentUser,
      activeTab: "1",
      users: [],
      tickets: [],
      loggedIn: true,
    };
    this.logOut = this.logOut.bind(this);
  }

  editUser(e) {
    alert(e.target.textContent);
  }

  componentDidMount() {
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

    axios
      .get("http://localhost:8080/api/tickets")
      .then((response) => {
        console.log(response);
        this.setState({
          tickets: response.data,
        });
      })
      .catch(() => {
        this.setState({
          tickets: [],
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

  render() {
    let activeTab = this.state.activeTab;
    let users = this.state.users;
    let tickets = this.state.tickets;

    return (
      <div>
        {this.state.loggedIn === true ? (
          <div>
            <Header currentUser={this.state.currentUser} logOut={this.logOut} />
            <Container style={{ marginTop: 20 }}>
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
                            color="primary"
                            style={{ marginTop: 20, marginBottom: 20 }}
                          >
                            Register user
                          </Button>
                          <DataTable
                            // title={"Users"}
                            columns={userColumns}
                            data={users}
                            pagination={true}
                          />
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="2">
                      <Row>
                        <Col>
                          <Button
                            className="float-end"
                            color="primary"
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
