import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
//import TicketService from "../../services/ticket.service";
//import EventBus from "../../common/EventBus";
import CreateTicketModal from "./create.ticket.component";
import DataTable from "react-data-table-component";
import ViewTicket from "../view.ticket.component";
import { useDispatch, useSelector } from "react-redux";
import {getTicketList, setTicketId, deleteTicketById,} from "../../redux/actions/ticket";
import { selectTicketList, selectIsFetching} from "../../redux/selectors/ticket";
import Loader from "react-loader-spinner";
//import { closeModal, setUserId } from "../../redux/actions/user";

const TicketList = () => {

  const dispatch = useDispatch();

  const [showCreateTicketModal, setShowCreateTicketModal] = useState(false);
  const [showDeleteTicketModal, setShowDeleteTicketModal] = useState(false);
  const [showViewTicketModal, setShowViewTicketModal] = useState(false);
  const [showEditTicketModal, setShowEditTicketModal] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState("");
  const [ticketIdToDelete, setTicketIdToDelete] = useState("");
  const [ticketTitleToDelete, setTicketTitleToDelete] = useState("");
  const [ticketToView, setTicketToView] = useState([]);
  const [loading, setLoading] = useState(true);

  const ticketList = useSelector(selectTicketList);
  const fetching = useSelector(selectIsFetching);

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
      name: "Developer",
      selector: (row) => row.developer,
      sortable: true,
    },
    {
      name: "Creator",
      selector: (row) => row.creator,
      sortable: true,
    },
    {
      name: "Created date",
      selector: (row) => row.createdDate,
      sortable: true,
    },

    {
      name: "View Ticket",
      cell: (row) => (
        <Button
          variant="outline-secondary"
          onClick={() => handleShowViewTicketModal(row)}
        >
          View
        </Button>
      ),
      grow: 0.3,
    },
    {
      name: "Edit Ticket",
      cell: (row) => (
        <Button
          variant="outline-secondary"
          onClick={() => handleEditTicketModal(row)}
        >
          Edit
        </Button>
      ),
      grow: 0.3,
    },
    {
      name: "Delete Ticket",
      cell: (row) => (
        <Button
          variant="outline-secondary"
          onClick={() => handleShowDeleteTicketModal(row.id, row.title)}>
          Delete
        </Button>
      ),
      grow: 1,
    },
  ];

  const handleEditTicketModal = (ticketToEdit) => {
    dispatch(setTicketId(ticketToEdit.id));
    setShowEditTicketModal(true);
    setTicketToView(ticketToEdit);
  };

  const handleCloseEditTicketModal = () => {
    setShowEditTicketModal(false);
    dispatch(getTicketList());
  };

  const handleShowCreateTicketModal = () => {
    setShowCreateTicketModal(true);
  };

  const handleCloseCreateTicketModal = () => {
    setShowCreateTicketModal(false);
    window.location.reload();
  };

  const handleShowViewTicketModal = (ticketToView) => {
    // setUserId(userToView.id)
    dispatch(setTicketId(ticketToView.id));
    setShowViewTicketModal(true);
    setTicketToView(ticketToView);
  };

  const handleCloseViewTicketModal = () => {
    setShowViewTicketModal(false);
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
    dispatch(deleteTicketById(ticketIdToDelete)).then(() => {
      dispatch(getTicketList());
    });
    setShowDeleteTicketModal(false);
  };
    
    useEffect(() => {
    setTickets(ticketList)
      setLoading(fetching)
  }, [ticketList])

   useEffect(() =>{
    dispatch(getTicketList())
  }, [])

  return <>
    {loading ?  <Loader className="loader-spinner"
                            type="TailSpin"
                            color="#4f677f"
                            height={50}
                            width={50}
            /> :
    (<div>
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

      <Modal show={showViewTicketModal} onHide={handleCloseViewTicketModal}>
        <Modal.Header closeButton>
          <Modal.Title>View Ticket</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ViewUser currentTicket={ticketToView} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseViewTicketModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteTicketModal} onHide={handleCloseDeleteTicketModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Ticket</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="jumbotron">
            <h4>Are you sure you want to delete: <strong>{ticketTitleToDelete}</strong>?</h4>
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
          <Button className="button_create" variant="dark" onClick={handleShowCreateTicketModal}>
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
    </div>)
  }</>
}



export default TicketList;
