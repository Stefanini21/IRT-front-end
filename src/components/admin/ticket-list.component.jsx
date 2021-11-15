import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { deleteUser } from "../../actions/user";
import UserService from "../../services/user.service";
import TicketService from "../../services/ticket.service";
import EventBus from "../../common/EventBus";
import CreateTicketModal from "../create.ticket.component";
import ViewUser from "../view.user.component";
import DataTable from "react-data-table-component";
import { useDispatch } from "react-redux";
import { closeModal, setUserId } from "../../redux/actions/user";

const TicketList = () => {
  const dispatch = useDispatch();

  const [showCreateTicketModal, setShowCreateTicketModal] = useState(false);
  const [showDeleteTicketModal, setShowDeleteTicketModal] = useState(false);
  const [showViewUserModal, setShowViewUserModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [ticketIdToDelete, setTicketIdToDelete] = useState("");
  const [ticketTitleToDelete, setTicketTitleToDelete] = useState("");
  const [userToView, setUserToView] = useState([]);

  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Specialty",
      selector: (row) => row.specialty,
      sortable: true,
    },
    {
      name: "Priority",
      selector: (row) => row.priority,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Developer username",
      selector: (row) => row.email,
      sortable: true,
    },

    {
      name: "View Ticket",
      cell: (row) => (
        <Button variant="success" onClick={() => handleShowViewUserModal(row)}>
          View
        </Button>
      ),
      grow: 0.3,
    },
    {
      name: "Edit Ticket",
      cell: () => <Button variant="primary">Edit</Button>,
      grow: 0.3,
    },
    {
      name: "Delete Ticket",
      cell: (row) => <Button variant="danger" onClick={() => handleShowDeleteTicketModal(row.id, row.title)}>Delete</Button>,
      grow: 1
    }
  ];

  const handleShowCreateTicketModal = () => {
    setShowCreateTicketModal(true);
  };

  const handleCloseCreateUserModal = () => {
    setShowCreateTicketModal(false);
    window.location.reload();
  };

  const handleShowViewUserModal = (userToView) => {
    // setUserId(userToView.id)
    dispatch(setUserId(userToView.id));
    setShowViewUserModal(true);
    setUserToView(userToView);
  };

  const handleCloseViewUserModal = () => {
    setShowViewUserModal(false);
  };

  const handleShowDeleteTicketModal = (ticketId, ticketTitle) => {
    setTicketIdToDelete(ticketId);
    setTicketTitleToDelete(ticketTitle);
    setShowDeleteTicketModal(true);
  };
  
  const handleCloseDeleteTicketModal = () => {
    setShowDeleteTicketModal(false);
  };

  const handleDeleteTicket = () => {
    dispatch(deleteTicketById(ticketIdToDelete))
    .then(() => {
      dispatch(getTicketList())})
    setShowDeleteTicketModal(false)
  };

  useEffect(() => {
    TicketService.getTickets().then(
      (response) => {
        setUsers(response.data);
      },
      (error) => {
        setError(
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        );

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);

  useEffect(() => {
    dispatch(closeModal);
  }, [handleCloseViewUserModal]);

  return (
    <div>
      <Modal show={showCreateTicketModal} onHide={handleCloseCreateUserModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create Ticket</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateTicketModal
            handleCloseCreateUserModal={handleCloseCreateUserModal}
          />
        </Modal.Body>
      </Modal>

      <Modal show={showViewUserModal} onHide={handleCloseViewUserModal}>
        <Modal.Header closeButton>
          <Modal.Title>View User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ViewUser currentUser={userToView} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseViewUserModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteTicketModal} onHide={handleCloseDeleteTicketModal}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: 'red' }}>Delete Ticket</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="jumbotron">
            <h4 style={{ color: 'red' }}>Are you sure you want to delete this <strong>{ticketTitleToDelete}</strong>?</h4>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteTicketModal}>
            No
          </Button>
          <Button variant="primary" onClick={handleDeleteTicket}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      <header className="jumbotron">
        {error && <h3>{error}</h3>}
        <div style={{ margin: 10 }}>
          <Button variant="primary" onClick={handleShowCreateTicketModal}>
            Create Ticket
          </Button>
        </div>
        <DataTable
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 15]}
          title={"Tickets"}
          columns={columns}
          data={users}
          pagination={true}
        />
      </header>
    </div>
  );
};

export default TicketList;
