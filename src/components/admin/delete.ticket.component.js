import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {resetDeleteUserFlags} from "../../redux/actions/flag";
import {deleteTicketById, getTicketList} from "../../redux/actions/ticket";
import {selectIsDeletedFlag} from "../../redux/selectors/flag";
import {selectTicketById} from "../../redux/selectors/ticket";

const DeleteTicketModal = (props) => {

    const dispatch = useDispatch();

    const ticketById = useSelector(selectTicketById);
    const isDeleted = useSelector(selectIsDeletedFlag)

    useEffect(() => {
        dispatch(resetDeleteUserFlags())
    }, [])

    const handleDeleteTicket = () => {
        dispatch(deleteTicketById(ticketById.id))
            .then(() => {
                dispatch(getTicketList())
            })
    }

    return <>
        <div className="col-md-12">
            <div className="card card-container">
                
                {!isDeleted && (
                    <div>
                        <div className="jumbotron">
                            <h4>Delete: <strong>{ticketById.title}</strong> ?</h4>
                        </div>
                        <button className="primary_button btn-block" onClick={props.handleCloseDeleteTicketModal}>
                            No
                        </button>
                        <button className="primary_button btn-block" onClick={handleDeleteTicket}>
                            Yes
                        </button>
                    </div>
                )}

                {isDeleted && (
                    <div>
                        <div className={"alert alert-danger"} role="alert">
                            Ticket <strong> {ticketById.title} </strong> deleted!
                        </div>
                        <button className="primary_button btn-block" onClick={props.handleCloseDeleteTicketModal}>
                            OK
                        </button>
                    </div>
                )}
            </div>
        </div>
    </>
}

export default DeleteTicketModal