import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectTicketById, selectTicketId} from "../../redux/selectors/ticket";
import {getTicketById} from "../../redux/actions/ticket";
import {Badge} from "react-bootstrap";


const ViewTicket = (props) => {

    const ticketId = useSelector(selectTicketId);
    const ticketById = useSelector(selectTicketById);

    const dispatch = useDispatch();

    useEffect(() => {
        // dispatch(getTicketById(ticketId));
        dispatch(getTicketById(props.ticket.id));

        console.log("ticketId: " + props.ticket.id);

    }, [])

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>
                    Ticket Title <strong>{props.ticket.title}</strong>
                </h3>
            </header>
            <p>
                <strong>Description : </strong> {props.ticket.description}
            </p>
            <p>
                <strong>Specialty : </strong>
                <Badge bg="dark" text="light">
                    {props.ticket.specialty}
                </Badge>
            </p>
            <p>
                <strong>Priority : </strong>
                <Badge bg="warning">
                    {props.ticket.priority}
                </Badge>
            </p>
            <p>
                <strong>Status : </strong>
                <Badge bg="primary">
                    {props.ticket.status}
                </Badge>

            </p>
            <p>
                {/*<strong>Developer : </strong> {ticketById.developer}*/}
            </p>
        </div>
    );
}

export default ViewTicket
