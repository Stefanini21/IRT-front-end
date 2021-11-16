import {
  CHANGE_TICKET_STATUS,
  GET_ALL_TICKETS_FOR_KANBAN,
  SET_TICKET_ID,
  GET_TICKET_BY_ID,
  GET_TICKET_LIST,
  // CLOSE_TICKET,
} from "../actions/types";

const initialState = {
  ticketId: {},
  ticketById: {},
  ticketList: {},
};

export const ticket = (state = initialState, action) => {
  switch (action.type) {
    case SET_TICKET_ID:
      return {
        ...state,
        ticketId: action.payload,
      };
    case GET_TICKET_BY_ID:
      return {
        ...state,
        ticketById: action.payload,
      };
    case GET_ALL_TICKETS_FOR_KANBAN:
      return {
        ...state,
        ticketList: action.payload,
      };
    case GET_TICKET_LIST:
      return {
        ...state,
        ticketList: action.payload,
      };
    case CHANGE_TICKET_STATUS:
      return {
        ...state,
        ticketList: action.payload,
      };
    // case CLOSE_TICKET:
    //   return {
    //     ...state,
    //     ticketList: action.payload,
    //   };
    default:
      return state;
  }
};
