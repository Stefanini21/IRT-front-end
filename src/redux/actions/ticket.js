import {routes} from "../../config/routes";
import {HttpService} from "../../services/httpService";
import {
    CHANGE_TICKET_DEVELOPER,
    CHANGE_TICKET_STATUS,
    CREATE_TICKET_FAIL,
    CREATE_TICKET_SUCCESS,
    DELETE_TICKET_BY_ID,
    GET_ALL_TICKETS_FOR_KANBAN,
    GET_PRIORITIES,
    GET_STATUSES,
    GET_TICKET_BY_ID,
    GET_TICKET_LIST,
    IS_DUPLICATE_TICKET_TITLE,
    RECEIVE_DUPLICATE_TITLE,
    SELECTED_SPECIALTY,
    SET_TICKET_ID,
    UPDATE_TICKET_BY_ID
} from "./types";

export const createTicket = (newTicket) => (dispatch) => {
    const url = routes.BASIC_URL + routes.BASIC_PATH + routes.CREATE_TICKET;
    return HttpService.post(url, newTicket)
        .then(
            (response) => {
                if (typeof response === 'object' && response !== null) {
                    dispatch({
                        type: CREATE_TICKET_SUCCESS,
                        payload: response.data,
                    });
                    return "Ticket created successefully"
                } else {
                    dispatch({
                        type: CREATE_TICKET_FAIL,
                        payload: response,
                    });
                    return "Ticket is not created";
                }
            })
};

export const getAllUsersBySpecialty = (specialty) => (dispatch) => {
    const url = routes.BASIC_URL + routes.BASIC_PATH + routes.USERS_BY_SPECIALTY;

    return HttpService.get(url + "/" + specialty, {}).then((response) => {
        return dispatch({
            type: SELECTED_SPECIALTY,
            payload: response
        });
    });
};

export const checkIfTicketTitleExist = (title) => (dispatch) => {
    const url = routes.BASIC_URL + routes.BASIC_PATH + routes.CHECK_IF_TICKET_TITLE_EXIST;

    return HttpService.get(url + "/" + title, {}).then((response) => {
        return dispatch({
            type: IS_DUPLICATE_TICKET_TITLE,
            payload: response
        })
    })
}

export const setTicketId = (ticketId) => (dispatch) => {
    return dispatch({
        type: SET_TICKET_ID,
        payload: ticketId,
    });
};

export const getTicketById = (ticketId) => (dispatch) => {
    const url = routes.BASIC_URL + routes.BASIC_PATH + routes.TICKETS + "dto/" + ticketId;

    return HttpService.get(url, ticketId).then((response) => {
        return dispatch({
            type: GET_TICKET_BY_ID,
            payload: response,
        });
    });
};

export const getTicketList = () => (dispatch) => {
    const url =
      routes.BASIC_URL + routes.BASIC_PATH + routes.ALL_TICKETS_FOR_KANBAN;

    return HttpService.get(url).then((response) => {
        return dispatch({
            type: GET_TICKET_LIST,
            payload: response,
        });
    });
};

export const deleteTicketById = (ticketId) => (dispatch) => {
    const url = routes.BASIC_URL + routes.BASIC_PATH + routes.TICKET_BY_ID + ticketId;

    return HttpService.delete(url).then((response) => {
        return dispatch({
            type: DELETE_TICKET_BY_ID,
            payload: response,
        });
    });
};

export const getTicketListForKanban = () => (dispatch) => {
    const url = routes.BASIC_URL + routes.BASIC_PATH + routes.ALL_TICKETS_FOR_KANBAN;
    return HttpService.get(url, {}).then((response) => {
        return dispatch({
            type: GET_ALL_TICKETS_FOR_KANBAN,
            payload: response,
        });
    });
};

export const changeTicketStatus = (id, status) => (dispatch) => {
    const url =
        routes.BASIC_URL + routes.BASIC_PATH + routes.CHANGE_TICKET_STATUS;
    return HttpService.put(url + id + "/" + status, {}).then((response) => {
        console.log("in action changeTicketStatus response: " + response.status);
        return dispatch({
            type: CHANGE_TICKET_STATUS,
            payload: response,
        });
    });
};

export const changeTicketDeveloper = (id, developer) => (dispatch) => {
    const url =
        routes.BASIC_URL + routes.BASIC_PATH + routes.CHANGE_TICKET_DEVELOPER;
    return HttpService.put(url + "add/" + id + "/" + developer, {})
    .then((response) => {
        console.log("In CHANGE_TICKET_DEVELOPER, response: " + response);
        console.log("In CHANGE_TICKET_DEVELOPER, response.data: " + response.data);
        return dispatch({
            type: CHANGE_TICKET_DEVELOPER,
            payload: response,
        });
    });
};

export const updateTicketById = (ticketData, ticketId) => (dispatch) => {
    const url = routes.BASIC_URL + routes.BASIC_PATH + routes.TICKET_BY_ID + ticketId;
    return HttpService.put(url, ticketData)
        .then(response => {
            if (response === 403) {
                return dispatch({
                    type: RECEIVE_DUPLICATE_TITLE
                })
            } else {
                return dispatch({
                    type: UPDATE_TICKET_BY_ID,
                    payload: response
                })
            }
        })
}

export const getStatuses = () => (dispatch) => {
    const url = routes.BASIC_URL + routes.BASIC_PATH + routes.TICKETS + routes.STATUSES

    return HttpService.get(url)
        .then(response => {
            return dispatch({
                type: GET_STATUSES,
                payload: response
            })
        })
}

export const getPriorities = () => (dispatch) => {
    const url = routes.BASIC_URL + routes.BASIC_PATH + routes.TICKETS + routes.PRIORITIES

    return HttpService.get(url)
        .then(response => {
            return dispatch({
                type: GET_PRIORITIES,
                payload: response
            })
        })
}
