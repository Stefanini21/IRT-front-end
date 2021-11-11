import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import EventBus from "../../common/EventBus";
import CreateTicketModal from "../create.ticket.component";
import DataTable from "react-data-table-component";
import {useDispatch, useSelector} from "react-redux";
import {getTicketList, setTicketId} from "../../redux/actions/ticket";
import {selectTicketList} from "../../redux/selectors/ticket";
import TicketService from "../../services/ticket.service";


const TicketList = () => {

  const dispatch = useDispatch();

  const [showCreateTicketModal, setShowCreateTicketModal] = useState(false);
  const [showDeleteTicketModal, setShowDeleteTicketModal] = useState(false);
  const [showViewTicketModal, setShowViewTicketModal] = useState(false);
  const [showEditTicketModal, setShowEditTicketModal] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState("");
  const [userIdToDelete, setUserIdToDelete] = useState("");
  const [userNameToDelete, setUserNameToDelete] = useState("");
  const [ticketToView, setTicketToView] = useState([]);

  const ticketList = useSelector(selectTicketList);


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
      cell: (row) => <Button variant="primary"
                             onClick={() => handleEditTicketModal(row)}>Edit</Button>,
      grow: 0.3
    },
    {
      name: "Delete Ticket",
      cell: (row) => (
        <Button
          variant="danger"
         // onClick={() => handleShowDeleteTicketModal(row.id, row.username)}
        >
          Delete
        </Button>
      ),
      grow: 1,
    },
  ];

  const handleEditTicketModal = (ticketToEdit) => {

    dispatch(setTicketId(ticketToEdit.id))
    setShowEditTicketModal(true)
    setTicketToView(ticketToEdit)
  }

  const handleCloseEditTicketModal = () => {

    setShowEditTicketModal(false)
    dispatch(getTicketList())
  }

  const handleShowCreateTicketModal = () => {
    setShowCreateTicketModal(true);
  };

  const handleCloseCreateTicketModal = () => {
    setShowCreateTicketModal(false);
    window.location.reload();
  };


  // useEffect(() => {
  //   TicketService.getTickets().then(
  //     (response) => {
  //       setTickets(response.data);
  //     },
  //     (error) => {
  //       setError(
  //         (error.response &&
  //           error.response.data &&
  //           error.response.data.message) ||
  //           error.message ||
  //           error.toString()
  //       );
  //
  //       if (error.response && error.response.status === 401) {
  //         EventBus.dispatch("logout");
  //       }
  //     }
  //   );
  // }, []);

  useEffect(() => {
    setTickets(ticketList)
  }, [ticketList])


  useEffect(() =>{
    dispatch(getTicketList())
  }, [])

  return (
    <div>
      <Modal show={showCreateTicketModal} onHide={handleCloseCreateTicketModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create Ticket</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateTicketModal
            handleCloseCreateTicketModal={handleCloseCreateTicketModal}
          />
        </Modal.Body>
      </Modal>

      {/*<Modal show={showViewTicketModal} onHide={handleCloseViewTicketModal}>*/}
      {/*  <Modal.Header closeButton>*/}
      {/*    <Modal.Title>View Ticket</Modal.Title>*/}
      {/*  </Modal.Header>*/}
      {/*  <Modal.Body>*/}
      {/*    <ViewTicket currentTicket={ticketToView} />*/}
      {/*  </Modal.Body>*/}
      {/*  <Modal.Footer>*/}
      {/*    <Button variant="secondary" onClick={handleCloseViewTicketModal}>*/}
      {/*      Close*/}
      {/*    </Button>*/}
      {/*  </Modal.Footer>*/}
      {/*</Modal>*/}

      {/*<Modal show={showDeleteTicketModal} onHide={handleCloseDeleteTicketModal}>*/}
      {/*  <Modal.Header closeButton>*/}
      {/*    <Modal.Title>Ticket User</Modal.Title>*/}
      {/*  </Modal.Header>*/}
      {/*  <Modal.Body>*/}
      {/*    Are you sure you want to delete this {userNameToDelete}?*/}
      {/*  </Modal.Body>*/}
      {/*  <Modal.Footer>*/}
      {/*    <Button variant="secondary" onClick={handleCloseDeleteTicketModal}>*/}
      {/*      No*/}
      {/*    </Button>*/}
      {/*    <Button variant="primary" onClick={handleDeleteTicket}>*/}
      {/*      Yes*/}
      {/*    </Button>*/}
      {/*  </Modal.Footer>*/}
      {/*</Modal>*/}

      <header className="jumbotron">
        {error && <h3>{error}</h3>}
        <div style={{ margin: 10 }}>
          <Button variant="primary" onClick={handleShowCreateTicketModal}>
            Create Ticket
          </Button>
        </div>
        <DataTable
          paginationPerPage={10}
          paginationRowsPerPageOptions={[10, 25, 50]}
          title={"Tickets"}
          columns={columns}
          data={tickets}
          pagination={true}
        />
      </header>
    </div>
  );
};

export default TicketList;
