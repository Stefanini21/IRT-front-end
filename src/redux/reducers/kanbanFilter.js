import {SET_BACKLOG_FIRST_FILTER_VALUE, SET_FILTERED_TICKETS, RESET_FILTERED_TICKETS} from '../actions/types'

const initialState = {
    backlogFirstFilterValue: {},
    filteredTickets: {},
    isFilterActive: false
};

export const kanbanFilter = (state = initialState, action) => {
    switch (action.type) {
        case SET_BACKLOG_FIRST_FILTER_VALUE:
            return {
                ...state,
                backlogFirstFilterValue: action.payload
            }
        case SET_FILTERED_TICKETS:
            return {
                ...state,
                filteredTickets: action.payload,
                isFilterActive: true
            }
        case RESET_FILTERED_TICKETS:
            return {
                ...state,
                filteredTickets: {},
                isFilterActive: false
            }
        default:
            return state;
    }
}