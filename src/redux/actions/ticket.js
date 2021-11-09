import TicketService from "../../services/ticket.service";
import {
  CREATE_TICKET_FAIL,
  CREATE_TICKET_SUCCESS,
  SET_MESSAGE
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
