import { ticketActions } from "../actions/ticket";

const initialState = {
  ticketList: {},
  isChangedTicketStatus: false
};

export const ticket = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_TICKETS":
      return {
        ...state,
        ticketList: action.payload,
      };
    case "CHANGE_TICKET_STATUS":
      return {
        ...state,
        isChangedTicketStatus: true
      };
    default:
      return state;
  }
};
