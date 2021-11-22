import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectUserById, selectUserId} from "../../redux/selectors/user";
import {Accordion, Badge} from "react-bootstrap";
import UserService from "../../services/user.service";
import {getUserById} from "../../redux/actions/user";


const ViewUser = () => {

    const userId = useSelector(selectUserId);
    const userById = useSelector(selectUserById);
    const [tickets, setTickets] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getUserById(userId))

        UserService.getTicketsFor(userId).then(
            response => {
                setTickets(response.data)
            },
        );
    }, [])

    return (
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

                <Accordion style={{'margin-top': '30px'}}>
                    {tickets.map((ticket, index) => {
                        return <Accordion.Item eventKey={index}
                                               style={{'margin-top': '30px', border: '2px solid #3b6a9a'}}>
                            <Accordion.Header>
                                <a href="#" style={{color: 'black'}}>{ticket.title}</a>
                            </Accordion.Header>
                            <Accordion.Body>
                                {ticket.description}
                            </Accordion.Body>
                        </Accordion.Item>
                    })}


                </Accordion>
            </p>


        </div>
    );
}

export default ViewUser
