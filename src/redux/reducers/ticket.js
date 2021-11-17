import {
  CHANGE_TICKET_STATUS,
  GET_ALL_TICKETS_FOR_KANBAN,
  CREATE_TICKET_SUCCESS,
  SELECTED_SPECIALTY,
  CREATE_TICKET_FAIL,
  SET_MESSAGE,
  GET_TICKET_BY_ID,
  GET_TICKET_LIST,
  DELETE_TICKET_BY_ID,
  SET_TICKET_ID
} from "../actions/types";

const initialState = {
  message: null,
  userList: {},
  ticketId: {},
  ticketById: {},
  ticketList: {},
  isFetching: true,
  isDeleted: false
};


export const ticket = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TICKET_SUCCESS:
      return {
        ...state,
      };
    case SELECTED_SPECIALTY:
      return {
        ...state,
        usersList: action.payload,
      };
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
    case GET_TICKET_LIST:
      return {
        ...state,
        ticketList: action.payload,
        isFetching: false,
      };
      case GET_ALL_TICKETS_FOR_KANBAN:
      return {
        ...state,
        ticketList: action.payload,
      };
    case CHANGE_TICKET_STATUS:
      return {
        ...state,
        ticketList: action.payload,
      };
    case DELETE_TICKET_BY_ID:
      return {
        ...state,
        isDeleted: true,
      };
    default:
      return state;
  }
};
