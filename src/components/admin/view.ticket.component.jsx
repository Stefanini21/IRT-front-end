import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectTicketById, selectTicketId} from "../../redux/selectors/ticket";
import {getTicketById} from "../../redux/actions/ticket";
import {Badge} from "react-bootstrap";


const ViewTicket = () => {

    const ticketId = useSelector(selectTicketId);
    const ticketById = useSelector(selectTicketById);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTicketById(ticketId));
        console.log("ticketId: " + ticketId);

    }, [])

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>
                    Ticket Title <strong>{ticketById.title}</strong>
                </h3>
            </header>
            <p>
                <strong>Description : </strong> {ticketById.description}
            </p>
            <p>
                <strong>Specialty : </strong>
                <Badge bg="dark" text="light">
                    {ticketById.specialty}
                </Badge>
            </p>
            <p>
                <strong>Priority : </strong>
                <Badge bg="warning">
                    {ticketById.priority}
                </Badge>
            </p>
            <p>
                <strong>Status : </strong>
                <Badge bg="primary">
                    {ticketById.status}
                </Badge>

            </p>
            <p>
                {/*<strong>Developer : </strong> {ticketById.developer}*/}
            </p>
        </div>
    );
}

export default ViewTicket
