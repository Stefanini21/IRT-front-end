import { SET_BACKLOG_FIRST_FILTER_VALUE, SET_FILTERED_TICKETS, RESET_FILTERED_TICKETS } from "./types";
import { routes } from "../../config/routes";
import { HttpService } from "../../services/httpService";

export const setBacklogFirstFilterValue = (filterValue) => (dispatch) => {
  return dispatch({
    type: SET_BACKLOG_FIRST_FILTER_VALUE,
    payload: filterValue,
  });
};

export const setFilteredTickets = (firstArg, seconArg) => (dispatch) => {
  const url = routes.BASIC_URL + routes.BASIC_PATH + routes.ALL_TICKETS_FOR_KANBAN;
  console.log("in action setFilteredTickets, url: " + url);
  HttpService.get(url, {}).then((response) => {
    console.log("response: " + response);
    const filteredTickets = [];
    const tickets = response;
    if (firstArg === "creator") {
      console.log("in action setFilteredTickets, firtArg: " + seconArg);
      tickets.forEach((ticket) => {
        console.log(
          "in action setFilteredTickets, ticket.creator: " + ticket.creator
        );
          if (ticket.creator === seconArg) {
            filteredTickets.push(ticket);
          }
      });
    }
    return dispatch({
      type: SET_FILTERED_TICKETS,
      payload: filteredTickets,
    });
  });
};
export const resetFilteredTickets = () => (dispatch) => {
    return dispatch({
      type: RESET_FILTERED_TICKETS
    });
};
