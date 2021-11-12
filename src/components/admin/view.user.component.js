import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUserById} from "../../redux/actions/user";
import {selectUserById, selectUserId} from "../../redux/selectors/user";
import {Badge} from "react-bootstrap";


const ViewUser = () => {

    const userId = useSelector(selectUserId);
    const userById = useSelector(selectUserById);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserById(userId))
        console.log("dispatch(getUserById(userId))")
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
        </div>
    );
}

export default ViewUser
