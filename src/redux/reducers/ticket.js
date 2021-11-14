const initialState = {
  ticketList: {}
};

export const ticket = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_TICKETS":
      return {
        ...state,
        ticketList: action.payload,
        isTicketChanged: false
      };
    case "CHANGE_TICKET_STATUS":
      return {
        ...state,
        ticketList: action.payload,
      };
    default:
      return state;
  }
};
