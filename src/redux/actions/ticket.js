import { routes } from "../../config/routes";
import { HttpService } from "../../services/httpService";

export const TicketActions = {
  CREATE_TICKET_FAIL: "CREATE_TICKET_FAIL",
  CREATE_TICKET_SUCCESS: "CREATE_TICKET_SUCCESS",
  SET_MESSAGE: "SET_MESSAGE",
  SELECTED_SPECIALTY: "SELECTED_SPECIALTY",
};

export const createTicket = (newTicket, admin_id, developer) => (dispatch) => {
  const url = routes.BASIC_URL + routes.BASIC_PATH + routes.CREATE_TICKET;
  return HttpService.post(url + "/" + admin_id + "/" + developer, newTicket).then(
    (response) => {
      dispatch({
        type: TicketActions.CREATE_TICKET_SUCCESS,
        payload: response.data,
      });

      dispatch({
        type: TicketActions.SET_MESSAGE,
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
    console.log(specialty + " this is specialty");
    console.log(url + " urlllll");

    return HttpService.get(url + "/" + specialty, {}).then((response) => {
      return dispatch({
        type: TicketActions.SELECTED_SPECIALTY,
        payload: response,
      });
    });
  };
