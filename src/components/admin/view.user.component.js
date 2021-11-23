import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectUserById, selectUserId} from "../../redux/selectors/user";
import {Badge, Dropdown, DropdownButton, Modal} from "react-bootstrap";
import UserService from "../../services/user.service";
import {getUserById} from "../../redux/actions/user";
import "./css/view.user.component.css";

import ViewTicket from "./view.ticket.component";


const ViewUser = () => {

    const userId = useSelector(selectUserId);
    const userById = useSelector(selectUserById);
    const [tickets, setTickets] = useState([]);
    const [ticketToView, setTicketToView] = useState([]);


    const [showViewTicketModal, setShowViewTicketModal] = useState(false);


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
        setTicketToView(ticketToView);

    };

    const handleCloseViewTicketModal = () => {
        setShowViewTicketModal(false);
    };

    return (
        <div>

            <div className="container">

                <header className="jumbotron">
                    <h3>
                        User <strong>{userById.username}</strong>
                    </h3>
                </header>
                <p>
                    <strong>First Name : </strong> {userById.firstName}
                </p>
                <p>
                    <strong>Last Name : </strong> {userById.lastName}
                </p>
                <p>
                    <strong>Email : </strong> {userById.email}
                </p>
                <p>
                    <strong>Specialty : </strong>
                    <Badge bg="dark" text="light">
                        {userById.specialty}
                    </Badge>
                </p>
                <p>
                    <strong>Role : </strong>
                    <Badge bg="success" text="light">
                        {userById.role}
                    </Badge>
                </p>

                <p>
                    <strong>User Tickets : </strong>

                    <DropdownButton
                        bsStyle="default"
                        bsSize="small"
                        style={{maxHeight: "28px"}}
                        title={"Tickets Titles"}
                        key={1}
                        id="dropdown-size-small"
                    >

                        {tickets.map((ticket, index) => {
                            return <div>
                                <Dropdown.Item eventKey={index}>
                                    <span onClick={() => handleShowViewTicketModal(ticket)}>
                                        {ticket.title}
                                    </span>
                                </Dropdown.Item>

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
                            </div>
                        })}
                    </DropdownButton>
                </p>
            </div>
        </div>
    );
}

export default ViewUser
