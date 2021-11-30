import React from "react";


const ViewTicket = (props) => {

    return (
        <div className="container">
            <header className="jumbotron">
                <h3 style={{overflow: 'hidden'}}>
                    <p>Ticket Title</p>
                    <p><strong>{props.ticket.title}</strong></p>
                </h3>
            </header>
            <p>
                <div className="row">
                    <div className="col-sm-6"><strong>Ticket's ID:</strong></div>
                    <div className="row-cols-sm-6">{props.ticket.id}</div>
                </div>
            </p>
            <div style={{overflow: 'hidden'}}>
                <strong>Description : </strong> {props.ticket.description}
            </div>
            <p>
                <div className="row" style={{marginTop: 30}}>
                    <div className="col-sm-6"><strong>Specialty:</strong></div>
                    <div className="row-cols-sm-6">{props.ticket.specialty}</div>
                </div>
            </p>
            <p>
                <div className="row">
                    <div className="col-sm-6"><strong>Priority:</strong></div>
                    <div className="row-cols-sm-6">{props.ticket.priority}</div>
                </div>
            </p>
            <p>
                <div className="row">
                    <div className="col-sm-6"><strong>Status:</strong></div>
                    <div className="row-cols-sm-6">{props.ticket.status}</div>
                </div>
            </p>
            <p>
            </p>
        </div>
    );
}

export default ViewTicket







