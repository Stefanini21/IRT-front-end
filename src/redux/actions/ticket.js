import { routes } from "../../config/routes";
import { HttpService } from "../../services/httpService";
import {
  CHANGE_TICKET_STATUS,
  GET_ALL_TICKETS_FOR_KANBAN,
  CREATE_TICKET_SUCCESS,
  SELECTED_SPECIALTY,
  CREATE_TICKET_FAIL,
  SET_MESSAGE,
  GET_TICKET_BY_ID,
  GET_TICKET_LIST,
  DELETE_TICKET_BY_ID,
  SET_TICKET_ID
} from "../actions/types";

export const createTicket = (newTicket) => (dispatch) => {
  const url = routes.BASIC_URL + routes.BASIC_PATH + routes.CREATE_TICKET;
  return HttpService.post(url, newTicket).then(
    (response) => {
      dispatch({
        type: CREATE_TICKET_SUCCESS,
        payload: response.data,
      });

      dispatch({
        type: ticketActions.SET_MESSAGE,
        payload: response.data.message,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: CREATE_TICKET_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const getAllUsersBySpecialty = (specialty) => (dispatch) => {
  const url = routes.BASIC_URL + routes.BASIC_PATH + routes.USERS_BY_SPECIALTY;

  return HttpService.get(url + "/" + specialty, {}).then((response) => {
    return dispatch({
      type: SELECTED_SPECIALTY,
      payload: response,
    });
  });
};

export const setTicketId = (ticketId) => (dispatch) => {
  return dispatch({
    type: SET_TICKET_ID,
    payload: ticketId,
  });
};

export const getTicketById = (ticketId) => (dispatch) => {
  const url = routes.BASIC_URL + routes.BASIC_PATH + routes.TICKETS + ticketId;
  return HttpService.get(url, ticketId).then((response) => {
    return dispatch({
      type: GET_TICKET_BY_ID,
      payload: response,
    });
  });
};

export const getTicketList = () => (dispatch) => {
  const url = routes.BASIC_URL + routes.BASIC_PATH + routes.TICKETS;

  return HttpService.get(url).then((response) => {
    return dispatch({
      type: GET_TICKET_LIST,
      payload: response,
    });
  });
};

export const deleteTicketById = (ticketId) => (dispatch) => {
  const url =
    routes.BASIC_URL + routes.BASIC_PATH + routes.TICKET_BY_ID + ticketId;

  console.log(ticketId + " this is id inside delete function");
  console.log(url + " this is url inside delete function");

  return HttpService.delete(url).then((response) => {
    return dispatch({
      type: DELETE_TICKET_BY_ID,
      payload: response,
    });
  });
};

export const getTicketListForKanban = () => (dispatch) => {
  const url =
    routes.BASIC_URL + routes.BASIC_PATH + routes.ALL_TICKETS_FOR_KANBAN;
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
