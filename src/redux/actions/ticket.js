import TicketService from "../../services/ticket.service";
import { routes } from "../../config/routes";
import { HttpService } from "../../services/httpService";
import {
  CREATE_TICKET_FAIL,
  CREATE_TICKET_SUCCESS,
  SET_MESSAGE,
  CHANGE_TICKET_STATUS,
  SET_TICKET_ID,
  GET_TICKET_BY_ID,
  GET_TICKET_LIST,
  GET_USER_BY_ID,
//   CLOSE_TICKET,
  GET_ALL_TICKETS_FOR_KANBAN
} from "./types";

export const createTicket =
  (title, description, priority, specialty, status, developer) =>
  (dispatch) => {
    return TicketService.createTicket(
      title,
      description,
      priority,
      specialty,
      status,
      developer
    ).then(
      (response) => {
        dispatch({
          type: CREATE_TICKET_SUCCESS,
          payload: response.data,
        });

        dispatch({
          type: SET_MESSAGE,
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
    const url = routes.BASIC_URL + routes.BASIC_PATH + routes.TICKETS

    return HttpService.get(url)
        .then(response => {
            return dispatch({
                type: GET_TICKET_LIST,
                payload: response
            })
        })
}

export const getTicketListForKanban = () => (dispatch) => {
  const url = routes.BASIC_URL + routes.BASIC_PATH + routes.ALL_TICKETS_FOR_KANBAN;
  console.log("url: " + url);

  return HttpService.get(url, {}).then((response) => {
    console.log("response: " + response);
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

export const getAllUsersBySpecialty = (specialty) => (dispatch) => {
  const url = routes.BASIC_URL + routes.BASIC_PATH + routes.USER_BY_ID + userId;
  console.log(userId + " this is userid");
  console.log(url + " urlllll");

  return HttpService.get(url, userId).then((response) => {
    return dispatch({
      type: GET_USER_BY_ID,
      payload: response,
    });
  });
};
