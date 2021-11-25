import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectUserById, selectUserId} from "../../redux/selectors/user";
import {Badge, Dropdown, DropdownButton, Modal} from "react-bootstrap";
import UserService from "../../services/user.service";
import {getUserById} from "../../redux/actions/user";
import "./css/view.user.component.css";

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
            {isVisibleViewTicketModal !== true ?
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
                            <DropdownButton title={"User Tickets Titles"} style={{marginTop: 15}}>
                                {tickets.map((ticket) => (
                                    <div>
                                        <Dropdown.Item onClick={() => handleShowViewTicketModal(ticket)}>
                                            {ticket.title}
                                        </Dropdown.Item>

                                        {/*<Modal show={showViewTicketModal} onHide={handleCloseViewTicketModal}>*/}
                                        {/*    <Modal.Header closeButton>*/}
                                        {/*        <Modal.Title>View Ticket</Modal.Title>*/}
                                        {/*    </Modal.Header>*/}
                                        {/*    <Modal.Body style={{height: 400}}>*/}
                                        {/*        <ViewTicket ticket={ticketToView}/>*/}
                                        {/*    </Modal.Body>*/}
                                        {/*</Modal>*/}
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
                    <Modal.Body style={{height: 400}}>
                        <ViewTicket ticket={ticketToView}/>
                    </Modal.Body>
                </Modal>}
        </div>
    );
}

export default ViewUser
