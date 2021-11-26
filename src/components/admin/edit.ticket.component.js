import {useDispatch, useSelector} from "react-redux";
import {
    getUserListBySpecialty,
    selectPriorities,
    selectStatuses,
    selectTicketById,
    selectTicketId, selectUsersFetching
} from "../../redux/selectors/ticket";
import {selectDuplicatedTitleFlag, selectTicketUpdatedFlag,} from "../../redux/selectors/flag";
import {selectSpecialties} from "../../redux/selectors/user";
import React, {useEffect, useState} from "react";
import {resetEditTicketFlags} from "../../redux/actions/flag";
import {getAllUsersBySpecialty, getTicketById, updateTicketById} from "../../redux/actions/ticket";
import Loader from "react-loader-spinner";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const vtitle = (value) => {
    if (value.length < 3 || value.length > 30) {
        return (
            <div className="alert alert-danger" role="alert">
                Title must be between 3 and 30 characters.
            </div>
        );
    }
};

const vdescription = (value) => {
    if (value.length < 3) {
        return (
            <div className="alert alert-danger" role="alert">
                Description must be more than 3 characters.
            </div>
        );
    }
};


const EditTicketComponent = () => {
    const dispatch = useDispatch();
    const ticketId = useSelector(selectTicketId);
    const ticketById = useSelector(selectTicketById);
    const ticketUpdatedSuccess = useSelector(selectTicketUpdatedFlag);
    const duplicatedTitleFlag = useSelector(selectDuplicatedTitleFlag);
    const specialties = useSelector(selectSpecialties);
    const statuses = useSelector(selectStatuses);
    const priorities = useSelector(selectPriorities);
    const userListBySpecialty = useSelector(getUserListBySpecialty);
    const userListBySpecialtyLoaded = useSelector(selectUsersFetching);

    const [titleForm, setTitle] = useState(" ");
    const [descriptionForm, setDescription] = useState("");
    const [priorityForm, setPriority] = useState("");
    const [specialtyForm, setSpecialty] = useState("");
    const [statusForm, setStatus] = useState("");
    const [developerForm, setDeveloper] = useState("");
    const [message, setMessage] = useState("");
    const [usersBySpecialty, setUsersBySpecialty] = useState(["NOT SET"]);
    const [usersBySpecialtyLoaded, setUsersBySpecialtyLoaded] = useState(false)


    useEffect(() => {
        dispatch(resetEditTicketFlags())
        dispatch(getTicketById(ticketId))
    }, [])

    useEffect(() => {
        setTitle(ticketById.title);
        setDescription(ticketById.description);
        setPriority(ticketById.priority);
        setSpecialty(ticketById.specialty);
        setStatus(ticketById.status);
        if (ticketById.developer) {
            setDeveloper(ticketById.developer);
        }
        else {
            setDeveloper("NOT SET")
        }
        dispatch(getAllUsersBySpecialty(ticketById.specialty));
        //setUsersBySpecialty(userListBySpecialty);

    }, [ticketById])

    const onChangeTitle = (e) => {
        setTitle(e.target.value)
        dispatch(resetEditTicketFlags())
    }

    const onChangeDescription = (e) => {
        setDescription(e.target.value)
    }

    const onChangePriority = (e) => {
        setPriority(e.target.value)
    }

    const onChangeSpecialty = (e) => {
        setSpecialty(e.target.value)
        dispatch(getAllUsersBySpecialty(e.target.value));
        setUsersBySpecialty(userListBySpecialty);
    }

    const onChangeStatus = (e) => {
        setStatus(e.target.value)
    }

    const onChangeDeveloper = (e) => {
        setDeveloper(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const formattedData = {
            id: ticketId,
            title: titleForm,
            description: descriptionForm,
            priority: priorityForm,
            specialty: specialtyForm,
            status: statusForm,
            developer: developerForm
        }

        dispatch(updateTicketById(formattedData, ticketId))
            .then(() => {
                setMessage('Ticket id: ' + ticketId + ' successfully updated!')
            });
    }

    return <>
        {(priorityForm) ?
            <div className="col-md-12">
                <div className="card card-container">
                    <Form onSubmit={handleSubmit}>
                        <div>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    value={titleForm}
                                    onChange={onChangeTitle}
                                    validations={[required, vtitle]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="description"
                                    value={descriptionForm}
                                    onChange={onChangeDescription}
                                    validations={[required, vdescription]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="priority">Priority</label>
                                <select
                                    className="form-control"
                                    name="priority"
                                    defaultValue={priorityForm}
                                    value={priorityForm}
                                    onChange={onChangePriority}>
                                    {priorities.map((r, i) =>
                                        <option value={r}>{r}</option>
                                    )}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="status">Status</label>
                                <select
                                    className="form-control"
                                    name="status"
                                    defaultValue={statusForm}
                                    value={statusForm}
                                    onChange={onChangeStatus}>
                                    validations={[required]}
                                    {statuses.map((s, i) =>
                                        <option value={s}>{s}</option>
                                    )}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="specialty">Specialty</label>
                                <select
                                    className="form-control"
                                    name="specialty"
                                    defaultValue={specialtyForm}
                                    value={specialtyForm}
                                    onChange={onChangeSpecialty}>
                                    {specialties.map((s, i) =>
                                        <option value={s}>{s}</option>
                                    )}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="developer">Developer</label>
                                <select
                                    className="form-control"
                                    name="developer"
                                    defaultValue={developerForm}
                                    value={developerForm}
                                    onChange={onChangeDeveloper}>
                                    {(userListBySpecialty === ["NOT SET"]) ?
                                        <option value={"NOT SET"}>{"NOT SET"}</option>
                                     : (userListBySpecialty.map((s, i) =>
                                            <option value={s}>{s}</option>))
                                    }
                                </select>
                                <br/>
                            </div>

                            {titleForm.length > 2 && titleForm.length < 31 &&
                            descriptionForm.length > 2 ? (
                                    <div className="form-group">
                                        <button className="primary_button btn-block">Update</button>
                                    </div>)
                                :
                                <div className="form-group">
                                    <button disabled className="primary_button btn-block">Update</button>
                                </div>
                            }
                        </div>

                        {duplicatedTitleFlag && (
                            <div className="form-group">
                                <div className="alert alert-danger"
                                     role="alert">
                                    There is another ticket with this title.
                                </div>
                            </div>
                        )}

                        {ticketUpdatedSuccess && (
                            <div className="form-group">
                                <div className="alert alert-success"
                                     role="alert">
                                    {message}
                                </div>
                            </div>
                        )}
                    </Form>
                </div>
            </div>
            :
            <Loader className="loader-spinner"
                    type="TailSpin"
                    color="#4f677f"
                    height={50}
                    width={50}
            />}
    </>
}

export default EditTicketComponent;