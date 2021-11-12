import {ticketActions} from "../actions/ticket";

const initialState = {
    ticketId: {},
    ticketById: {}
}

export const ticket = (state = initialState, action) => {
    switch (action.type) {

        case ticketActions.GET_TICKET_BY_ID:
            const ticketById = action.payload
            return {
                ...state,
                ticketById: ticketById
            };
        case ticketActions.SET_TICKET_ID:
            const ticketId = action.payload
            return {
                ...state,
                ticketId: ticketId
            };

        default:
            return state;
    }
}