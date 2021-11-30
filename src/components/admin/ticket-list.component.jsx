import React, {useEffect, useState} from "react";
import {Modal} from "react-bootstrap";
import CreateTicketModal from "./create.ticket.component.jsx";
import DataTable from "react-data-table-component";
import ViewTicket from "./view.ticket.component";
import {useDispatch, useSelector} from "react-redux";
import {
    getAllUsersBySpecialty,
    getPriorities,
    getStatuses,
    getTicketById,
    getTicketList,
    setTicketId
} from "../../redux/actions/ticket";
import {selectIsFetching, selectTicketList} from "../../redux/selectors/ticket";
import Loader from "react-loader-spinner";
import {getSpecialties} from "../../redux/actions/user";
import EditTicketComponent from "./edit.ticket.component";
import DeleteTicketModal from "./delete.ticket.component.js";
import SessionExpirationModal from "../SessionExpirationModal";


const TicketList = () => {

    const dispatch = useDispatch();

    const [showCreateTicketModal, setShowCreateTicketModal] = useState(false);
    const [showDeleteTicketModal, setShowDeleteTicketModal] = useState(false);
    const [showViewTicketModal, setShowViewTicketModal] = useState(false);
    const [showEditTicketModal, setShowEditTicketModal] = useState(false);
    const [tickets, setTickets] = useState([]);
    const [error, setError] = useState("");
    const [ticketToView, setTicketToView] = useState([]);
    const [loading, setLoading] = useState(true);

    const ticketList = useSelector(selectTicketList);
    const fetching = useSelector(selectIsFetching);

    const columns = [
        {
            name: "Title",
            selector: (row) => row.title,
            sortable: true,
            grow: 0.2,
            width: '200px'

        },
        {
            name: "Specialty",
            selector: (row) => row.specialty,
            sortable: true,
            grow: 0.2,
            width: '100px'
        },
        {
            name: "Priority",
            selector: (row) => row.priority,
            sortable: true,
            grow: 0.1,
            width: '90px'
        },
        {
            name: "Status",
            selector: (row) => row.status,
            sortable: true,
            grow: 0.1,
            width: '90px'
        },
        {
            name: "Developer",
            selector: (row) => row.developer,
            sortable: true,
            grow: 0.1,
            width: '110px'
        },
        {
            name: "Created date",
            selector: (row) => row.createdDate,
            sortable: true,
            grow: 0.1,
            width: '130px'

        },

        {
            name: "View Ticket",
            cell: (row) =>
                <button className="secondary_button"
                        onClick={() => handleShowViewTicketModal(row)}>View</button>,
            grow: 0.1
        },
        {
            name: "Edit Ticket",
            cell: (row) =>
                <button className="secondary_button"
                        onClick={() => handleEditTicketModal(row)}>Edit</button>,
            grow: 0.1
        },
        {
            name: "Delete Ticket",
            cell: (row) =>
                <button className="secondary_button"
                        onClick={() => handleShowDeleteTicketModal(row)}>Delete</button>,
            grow: 0.3
        }
    ]

    const handleEditTicketModal = (ticketToEdit) => {
        dispatch(setTicketId(ticketToEdit.id))
        setShowEditTicketModal(true)
        setTicketToView(ticketToEdit)
    }

    const handleCloseEditTicketModal = () => {
        setShowEditTicketModal(false)
        dispatch(getTicketList())
    };

    const handleShowCreateTicketModal = () => {
        setShowCreateTicketModal(true);
    };

    const handleCloseCreateTicketModal = () => {
        setShowCreateTicketModal(false);
        window.location.reload();
    };


    const handleShowViewTicketModal = (ticketToView) => {
        dispatch(setTicketId(ticketToView.id));
        setShowViewTicketModal(true);
        setTicketToView(ticketToView);
    };

    const handleCloseViewTicketModal = () => {
        setShowViewTicketModal(false);
    };

    const handleShowDeleteTicketModal = (ticketToDelete) => {
        dispatch(getTicketById(ticketToDelete.id))
            .then(() => {
                setShowDeleteTicketModal(true)
            })
    };

    const handleCloseDeleteTicketModal = () => {
        setShowDeleteTicketModal(false)
        dispatch(getTicketList())
    };

    useEffect(() => {
        setTickets(ticketList)
        setLoading(fetching)
    }, [ticketList])

    useEffect(() => {
        dispatch(getTicketList());
        dispatch(getSpecialties());
        dispatch(getStatuses());
        dispatch(getPriorities());
        dispatch(getAllUsersBySpecialty("NONE"))

    }, [])

    return <>
        <SessionExpirationModal />
        {loading ? <Loader className="loader-spinner"
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
                        <CreateTicketModal handleCloseCreateTicketModal={handleCloseCreateTicketModal}/>
                    </Modal.Body>
                </Modal>

                <Modal show={showViewTicketModal} onHide={handleCloseViewTicketModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>View Ticket</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ViewTicket ticket={ticketToView}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="tertiary_button" onClick={handleCloseViewTicketModal}>
                            Close
                        </button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showEditTicketModal} onHide={handleCloseEditTicketModal}>
                    <Modal.Header closeButton>
                        <Modal.Title className="modal_header">Edit Ticket</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <EditTicketComponent handleCloseEditTicketModal={handleCloseEditTicketModal}/>
                    </Modal.Body>
                </Modal>

                <Modal show={showDeleteTicketModal} onHide={handleCloseDeleteTicketModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Ticket</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <DeleteTicketModal handleCloseDeleteTicketModal={handleCloseDeleteTicketModal}/>
                    </Modal.Body>
                </Modal>

                <header className="jumbotron">
                    {error && <h3>{error}</h3>}
                    <div style={{margin: 10}}>
                        <button className="primary_button" onClick={handleShowCreateTicketModal}>
                            Create Ticket
                        </button>
                    </div>
                    <DataTable
                        paginationPerPage={10}
                        paginationRowsPerPageOptions={[10, 25, 50]}
                        title={"Tickets"}
                        columns={columns}
                        data={tickets}
                        pagination={true}
                        noDataComponent={" "}
                    />
                </header>
            </div>)
        }
    </>
}

export default TicketList;
