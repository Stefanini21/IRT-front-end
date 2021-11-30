import {RESET_FILTERED_TICKETS, SET_BACKLOG_FIRST_FILTER_VALUE, SET_FILTERED_TICKETS} from "./types";
import {routes} from "../../config/routes";
import {HttpService} from "../../services/httpService";

export const setBacklogFirstFilterValue = (filterValue) => (dispatch) => {
    return dispatch({
        type: SET_BACKLOG_FIRST_FILTER_VALUE,
        payload: filterValue,
    });
};

export const setFilteredTickets = (firstArg, seconArg) => (dispatch) => {
  const url = routes.BASIC_URL + routes.BASIC_PATH + routes.ALL_TICKETS_FOR_KANBAN;
  HttpService.get(url, {}).then((response) => {
    const filteredTickets = [];
    const tickets = response;
    if (firstArg === "creator") {
      tickets.forEach((ticket) => {
          if (ticket.creator === seconArg) {
            filteredTickets.push(ticket);
          }
      });
    }
    if (firstArg === "developer") {
      tickets.forEach((ticket) => {
          if (ticket.developer === seconArg) {
            filteredTickets.push(ticket);
          }
      });
    }
    if (firstArg === "specialty") {
      tickets.forEach((ticket) => {
          if (ticket.specialty === seconArg) {
            filteredTickets.push(ticket);
          }
      });
    }
    if (firstArg === "priority") {
      tickets.forEach((ticket) => {
          if (ticket.priority === seconArg) {
            filteredTickets.push(ticket);
          }
      });
    }
    return dispatch({
      type: SET_FILTERED_TICKETS,
      payload: filteredTickets,
    });
});
}
export const resetFilteredTickets = () => (dispatch) => {
    return dispatch({
        type: RESET_FILTERED_TICKETS
    });
};
