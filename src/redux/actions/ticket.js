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

  export const getAllUsersBySpecialty = (specialty) => (dispatch) => {
    const url = routes.BASIC_URL + routes.BASIC_PATH + routes.USER_BY_ID + userId;
    console.log(userId + " this is userid")
    console.log(url + " urlllll")

    return HttpService.get(url, userId)
        .then(response => {
            return dispatch({
                type: userActions.GET_USER_BY_ID,
                payload: response
            })
        })
      }
