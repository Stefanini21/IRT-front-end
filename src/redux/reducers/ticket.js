import {ticketActions} from "../actions/ticket";

const initialState = {
    ticketId: {},
    ticketById: {},
    ticketList: {}
}

export const ticket = (state = initialState, action) => {
    switch (action.type) {
        case ticketActions.SET_TICKET_ID:
            return {
                ...state,
                ticketId: action.payload
            };
        case ticketActions.GET_TICKET_BY_ID:
            return {
                ...state,
                ticketById: action.payload
            };
        case ticketActions.GET_TICKET_LIST:
            return {
                ...state,
                ticketList: action.payload
            }
        default:
            return state;
    }
}

