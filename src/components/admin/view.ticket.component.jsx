import React from "react";
import {Badge} from "react-bootstrap";


const ViewTicket = (props) => {

    return (
        <div className="container">
            <header className="jumbotron">
                <h3 style={{overflow: 'hidden'}}>
                    Ticket Title <strong>{props.ticket.title}</strong>
                </h3>
            </header>
            <div style={{overflow: 'hidden'}}>
                <strong>Description : </strong> {props.ticket.description}
            </div>
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
            </p>
        </div>
    );
}

export default ViewTicket
