import TicketService from "../../services/ticket.service";
import { routes } from "../../config/routes";
import { HttpService } from '../../services/httpService'
import {
  CREATE_TICKET_FAIL,
  CREATE_TICKET_SUCCESS,
  SET_MESSAGE
} from "./types";

export const ticketActions = {
  GET_ALL_TICKETS: "GET_ALL_TICKETS",
  CHANGE_TICKET_STATUS: "CHANGE_TICKET_STATUS"
};


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

  export const getTicketList = () => (dispatch) => {
    const url = routes.BASIC_URL + routes.BASIC_PATH + routes.ALL_TICKETS;
    console.log("url: " + url);
  
    return HttpService.get(url,{})
        .then(response => {
          console.log("response: " + response)
            return dispatch({
                type: "GET_ALL_TICKETS",
                payload: response
            })
        })
  }

  export const changeTicketStatus = (ticket) => (dispatch) => {
    const url = routes.BASIC_URL + routes.BASIC_PATH + routes.CHANGE_TICKET_STATUS
    console.log("url: " + url);
    console.log("in action status: " + status);
    return HttpService.put(url, ticket)
        .then(response => {
            return dispatch({
                type: ticketActions.CHANGE_TICKET_STATUS,
                payload: response
            })
        })
  }
