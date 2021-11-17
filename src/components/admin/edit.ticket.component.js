import {useDispatch, useSelector} from "react-redux";
import {selectTicketById, selectTicketId} from "../../redux/selectors/ticket";
import {
    selectDuplicatedTitleFlag,
    selectTicketUpdatedFlag,
} from "../../redux/selectors/flag";
import {selectRoles, selectSpecialties} from "../../redux/selectors/user";
import React, {useEffect, useState} from "react";
import {resetEditTicketFlags} from "../../redux/actions/flag";
import {getTicketById, getTicketList, updateTicketById} from "../../redux/actions/ticket";
import {setMessage} from "../../redux/actions/message";
import {Form} from "react-bootstrap";
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

const EditTicketComponent = (props) => {
    const dispatch = useDispatch();
    const ticketId = useSelector(selectTicketId);
    const ticketById = useSelector(selectTicketById);
    const ticketUpdatedSuccess = useSelector(selectTicketUpdatedFlag);
    const duplicatedTitleFlag = useSelector(selectDuplicatedTitleFlag);
    const specialties = useSelector(selectSpecialties);
    const roles = useSelector(selectRoles);

    const [titleForm, setTitle] = useState("");
    const [descriptionForm, setDescription] = useState("");
    const [priorityForm, setPriority] = useState("");
    const [specialtyForm, setSpecialty] = useState("");
    const [statusForm, setStatus] = useState("");
    const [developerForm, setDeveloper] = useState("");
    const [message, setMessage] = useState("");


    useEffect(() => {
        dispatch(resetEditTicketFlags())
        dispatch(getTicketById(ticketId))
    }, [])

    useEffect(() => {
        setTitle(ticketById.title);
        setDescription(ticketById.description);
        setPriority(ticketById.priority);
        setSpecialty(ticketById.status);
        setStatus(ticketById.status);
        setDeveloper(ticketById.developer);
    }, [ticketById])

    const onChangeTitle = (e) => {
        setTitle(e.target.value)
    }

    const onChangeDescription = (e) => {
        setDescription(e.target.value)
    }

    const onChangePriority = (e) => {
        setPriority(e.target.value)
    }

    const onChangeSpecialty = (e) => {
        setSpecialty(e.target.value)
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
            setMessage('Ticket id: ' + ticketId + ' successfully updated!')});
    }
    return <>
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
                            //validations={[required, vtitle]}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Title</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="description"
                            value={descriptionForm}
                            onChange={onChangeDescription}
                            //validations={[required, vdescription]}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="priority">Priority</label>
                        <select
                            className="form-control"
                            name="priority"
                            defaultValue={priorityForm}
                            value={priorityForm}
                            validations={[required]}
                            onChange={onChangePriority}>
                            {roles.map((r, i) =>
                                <option value={r}>{r}</option>
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
                            validations={[required]}
                            {specialties.map((s, i) =>
                                <option value={s}>{s}</option>
                            )}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="status">Status</label>
                        <select
                            className="form-control"
                            name="specialty"
                            defaultValue={statusForm}
                            value={statusForm}
                            onChange={onChangeStatus}>
                            validations={[required]}
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
                            validations={[required]}
                            {specialties.map((s, i) =>
                                <option value={s}>{s}</option>
                            )}
                        </select>
                        <br/>
                    </div>

                    <div className="form-group">
                        <button className="primary_button btn-block">Update</button>
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

                </div>
            </Form>
        </div>
    </div>
    </>
}

export default EditTicketComponent;