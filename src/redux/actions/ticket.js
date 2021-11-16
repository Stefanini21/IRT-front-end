import { routes } from "../../config/routes";
import { HttpService } from "../../services/httpService";

export const ticketActions = {
  CREATE_TICKET_FAIL: "CREATE_TICKET_FAIL",
  CREATE_TICKET_SUCCESS: "CREATE_TICKET_SUCCESS",
  SET_MESSAGE: "SET_MESSAGE",
  SELECTED_SPECIALTY: "SELECTED_SPECIALTY",

  SET_TICKET_ID: "SET_TICKET_ID",
  GET_TICKET_BY_ID: "GET_TICKET_BY_ID",
  GET_TICKET_LIST: "GET_TICKET_LIST",
  DELETE_TICKET_BY_ID: "DELETE_TICKET_BY_ID"
};

export const createTicket = (newTicket) => (dispatch) => {
  const url = routes.BASIC_URL + routes.BASIC_PATH + routes.CREATE_TICKET;
  return HttpService.post(url, newTicket).then(
    (response) => {
      dispatch({
        type: ticketActions.CREATE_TICKET_SUCCESS,
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
    const url =
      routes.BASIC_URL + routes.BASIC_PATH + routes.USERS_BY_SPECIALTY;

    return HttpService.get(url + "/" + specialty, {}).then((response) => {
      return dispatch({
        type: ticketActions.SELECTED_SPECIALTY,
        payload: response,
      });
    });
  };

  export const setTicketId = (ticketId) => (dispatch) => {
    return dispatch({
      type: ticketActions.SET_TICKET_ID,
      payload: ticketId,
    });
  };

  export const getTicketById = (ticketId) => (dispatch) => {
    const url =
      routes.BASIC_URL + routes.BASIC_PATH + routes.TICKETS + ticketId;

    return HttpService.get(url, ticketId).then((response) => {
      return dispatch({
        type: ticketActions.GET_TICKET_BY_ID,
        payload: response,
      });
    });
  };

  export const getTicketList = () => (dispatch) => {
    const url = routes.BASIC_URL + routes.BASIC_PATH + routes.TICKETS;

    return HttpService.get(url).then((response) => {
      return dispatch({
        type: ticketActions.GET_TICKET_LIST,
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
        type: ticketActions.DELETE_TICKET_BY_ID,
        payload: response,
      });
    });
  };

