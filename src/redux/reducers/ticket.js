import { TicketActions } from "../actions/ticket";

const initialState = {
    message: null,
    userList: {}
};


export const ticket = (state = initialState, action) => {
  switch (action.type) {
    case TicketActions.CREATE_TICKET_SUCCESS:
      return {
        ...state,
      };
    case TicketActions.SELECTED_SPECIALTY:
      return {
        ...state,
        usersList: action.payload,
      };
    default:
      return state;
  }
};
