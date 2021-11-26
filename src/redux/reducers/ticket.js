import {
  CHANGE_TICKET_DEVELOPER,
  CHANGE_TICKET_STATUS,
  CREATE_TICKET_SUCCESS,
  SELECTED_SPECIALTY,
  CREATE_TICKET_FAIL,
  SET_MESSAGE,
  GET_TICKET_BY_ID,
  GET_TICKET_LIST,
  SET_TICKET_ID,
  GET_STATUSES,
  DELETE_TICKET_BY_ID,
  GET_ALL_TICKETS_FOR_KANBAN,
  GET_PRIORITIES,
  IS_DUPLICATE_TICKET_TITLE,
} from "../actions/types";

const initialState = {
  message: null,
  userList: {},
  ticketId: {},
  ticketById: {},
  ticketList: {},
  ticketListForKanban: {},
  isFetching: true,
  statuses: {},
  priorities: {},
  ticketListFor: {},
  allTicketCreators: {},
  allTicketDevelopers: {},
  isDuplicateTitle: false,
};


export const ticket = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TICKET_SUCCESS:
      return {
        ...state,
        ticketList: action.payload,
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
    case IS_DUPLICATE_TICKET_TITLE:
      return {
        ...state,
        isDuplicateTitle: action.payload
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
        ticketListForKanban: action.payload,
      };
      case CHANGE_TICKET_DEVELOPER:
      return {
        ...state,
        ticketListForKanban: action.payload,
      };
    case CHANGE_TICKET_STATUS:
      return {
        ...state,
        ticketList: action.payload,
      };
    case GET_STATUSES:
      return {
        ...state,
        statuses: action.payload,
      }
    case GET_PRIORITIES:
      return {
        ...state,
        priorities: action.payload,
      }
    default:
      return state;
  }
};
