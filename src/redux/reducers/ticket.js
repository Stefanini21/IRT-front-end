import { ticketActions } from "../actions/ticket";

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
    case ticketActions.CREATE_TICKET_SUCCESS:
      return {
        ...state,
      };
    case ticketActions.SELECTED_SPECIALTY:
      return {
        ...state,
        usersList: action.payload,
      };
    case ticketActions.SET_TICKET_ID:
      return {
        ...state,
        ticketId: action.payload,
      };
    case ticketActions.GET_TICKET_BY_ID:
      return {
        ...state,
        ticketById: action.payload,
      };
    case ticketActions.GET_TICKET_LIST:
      return {
        ...state,
        ticketList: action.payload,
        isFetching: false,
      };
    case ticketActions.DELETE_TICKET_BY_ID:
      return {
        ...state,
        isDeleted: true,
      };
    default:
      return state;
  }
};
