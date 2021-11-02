import React, { useState, useEffect } from "react";
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
import Login from "./Login";
import DataTable from "react-data-table-component";
import RegisterUserModal from "./modals/RegisterUserModal";
import ViewUserModal from "./modals/ViewUserModal";
import EditUserModal from "./modals/EditUserModal";
import DeleteUserModal from "./modals/DeleteUserModal";

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
      maxHeight: "50px", // override the row height
    },
  },
};

const Admin = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [users, setUsers] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [loggedIn, setLoggedIn] = useState(true);
  const [showRegisterUserModal, setShowRegisterUserModal] = useState(false);
  const [showViewUserModal, setShowViewUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  const registerUserModal = () => {
    setShowRegisterUserModal(!showRegisterUserModal);
  };

  const viewUserModal = (id) => {
    setShowViewUserModal(!showViewUserModal), setCurrentUserId(id);
  };

  const editUserModal = (id) => {
    setShowEditUserModal(!showEditUserModal), setCurrentUserId(id);
  };

  const deleteUserModal = (id) => {
    setShowDeleteUserModal(!showDeleteUserModal), setCurrentUserId(id);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = () => {
    axios
      .get("http://localhost:8080/api/users")
      .then((response) => {
        console.log(response);
        setUsers(response.data);
      })
      .catch(() => {
        setUsers([]);
      });
  };

  const toggle = (tab) => {
    setActiveTab(tab);
  };

  const logOut = () => {
    setLoggedIn(false);
    setCurrentUser({});
  };

  const registerModalClose = () => {
    setShowRegisterUserModal(false);
  };

  const viewModalClose = () => {
    setShowViewUserModal(false);
  };

  const editModalClose = () => {
    setShowEditUserModal(false);
  };

  const deleteModalClose = () => {
    setShowDeleteUserModal(false);
  };

  const viewUser = (e) => {
    viewUserModal(e.target.id);
  };

  const editUser = (e) => {
    editUserModal(e.target.id);
  };

  const deleteUser = (e) => {
    deleteUserModal(e.target.id);
  };

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
      cell: (row) => (
        <button
          className={"btn"}
          style={{ backgroundColor: "#a8e2e2" }}
          onClick={viewUser}
          id={row.id}
        >
          View
        </button>
      ),
      grow: 0.3,
    },
    {
      name: "Edit",
      cell: (row) => (
        <button
          className={"btn"}
          style={{ backgroundColor: "#2bc1c8" }}
          onClick={editUser}
          id={row.id}
        >
          Edit
        </button>
      ),
      grow: 0.3,
    },
    {
      name: "Delete",
      cell: (row) => (
        <button
          className={"btn"}
          style={{ backgroundColor: "#2ba0c8" }}
          onClick={deleteUser}
          id={row.id}
        >
          Delete
        </button>
      ),
      grow: 1,
    },
  ];

  return (
    <div>
      {loggedIn === true ? (
        <div>
          {showRegisterUserModal === true && (
            <RegisterUserModal
              showRegUserModal={showRegisterUserModal}
              modalClose={registerModalClose}
              getAllUsers={getAllUsers}
            />
          )}
          {showViewUserModal === true && (
            <ViewUserModal
              showViewUserModal={showViewUserModal}
              modalClose={viewModalClose}
              getAllUsers={getAllUsers}
              currentUserId={currentUserId}
            />
          )}
          {showEditUserModal === true && (
            <EditUserModal
              showEditUserModal={showEditUserModal}
              modalClose={editModalClose}
              getAllUsers={getAllUsers}
              currentUserId={currentUserId}
            />
          )}
          {showDeleteUserModal === true && (
            <DeleteUserModal
              showDeleteUserModal={showDeleteUserModal}
              modalClose={deleteModalClose}
              getAllUsers={getAllUsers}
              currentUserId={currentUserId}
            />
          )}
          <Container style={{ marginTop: 20, overflowY: scroll }}>
            <Row>
              <Col>
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === "1" })}
                      onClick={() => {
                        toggle("1");
                      }}
                    >
                      <h5>User list</h5>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === "2" })}
                      onClick={() => {
                        toggle("2");
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
                          onClick={registerUserModal}
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
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default Admin;
