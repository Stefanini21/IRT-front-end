import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectUserById, selectUserId} from "../../redux/selectors/user";
import {Badge, Dropdown, DropdownButton, Modal} from "react-bootstrap";
import UserService from "../../services/user.service";
import {getUserById} from "../../redux/actions/user";
import "./css/view.user.component.css";
import {FaLaptopCode} from "react-icons/fa";
import ViewTicket from "./view.ticket.component";


const ViewUser = (props) => {

    const userId = useSelector(selectUserId);
    const userById = useSelector(selectUserById);

    const [tickets, setTickets] = useState([]);
    const [ticketToView, setTicketToView] = useState([]);
    const [showViewTicketModal, setShowViewTicketModal] = useState(false);
    const [isVisibleViewTicketModal, setIsVisibleViewTicketModal] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getUserById(userId))

        UserService.getTicketsFor(userId).then(
            response => {
                setTickets(response.data)
            },
        );
    }, [])


    const handleShowViewTicketModal = (ticketToView) => {
        setShowViewTicketModal(true);
        setIsVisibleViewTicketModal(true);
        setTicketToView(ticketToView);
    };

    const handleCloseViewTicketModal = () => {
        setShowViewTicketModal(false);
        setIsVisibleViewTicketModal(false);

    };

    return (
        <div>
            {!isVisibleViewTicketModal ?
                <div>

                    <div className="container">

                        <header className="jumbotron">
                            <h3>
                                User <strong>{userById.username}</strong>
                            </h3>
                        </header>
                        <p>
                            <div className="row">
                                <div className="col-sm-5"><strong>User's ID:</strong></div>
                                <div className="row-cols-sm-5">{userById.id}</div>
                            </div>
                        </p>
                        <p>
                            <div className="row">
                                <div className="col-sm-5"><strong>First Name:</strong></div>
                                <div className="row-cols-sm-5">{userById.firstName}</div>
                            </div>
                        </p>
                        <p>
                            <div className="row">
                                <div className="col-sm-5"><strong>Last Name:</strong></div>
                                <div className="row-cols-sm-5">{userById.lastName}</div>
                            </div>
                        </p>
                        <p>
                            <div className="row" style={{'white-space': 'initial'}}>
                                <div className="col-sm-5"><strong>Email:</strong></div>
                                <div className="row-cols-sm-5">{userById.email}</div>
                            </div>
                        </p>
                        <p>
                            <div className="row">
                                <div className="col-sm-5"><strong>Specialty:</strong></div>
                                <div className="row-cols-sm-5">{userById.specialty}</div>
                            </div>
                        </p>
                        <p>
                            <div className="row">
                                <div className="col-sm-5"><strong>Role:</strong></div>
                                <div className="row-cols-sm-5">{userById.role}</div>
                            </div>
                        </p>

                        <p>

                            <DropdownButton title={"User's Tickets"} style={{marginTop: 30}}>
                                {tickets.map((ticket) => (
                                    <div>
                                        <Dropdown.Item onClick={() => handleShowViewTicketModal(ticket)}
                                                       style={{marginTop: 15, borderBottom: '2px solid #4588ba'}}>

                                            <div style={{display: "flex"}}>

                                                <div style={{'flex-grow': 1, 'margin-right': 25}}>
                                                    <Badge bg="primary">
                                                        <FaLaptopCode size={15}/>
                                                    </Badge>
                                                </div>

                                                <div style={{'white-space': 'initial'}}>
                                                    {ticket.title}
                                                </div>
                                            </div>

                                        </Dropdown.Item>
                                    </div>
                                ))}
                            </DropdownButton>
                        </p>
                    </div>
                </div>
                :
                <Modal show={showViewTicketModal} onHide={handleCloseViewTicketModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>View Ticket</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ViewTicket ticket={ticketToView}/>
                    </Modal.Body>
                </Modal>}
        </div>
    );
}

export default ViewUser

