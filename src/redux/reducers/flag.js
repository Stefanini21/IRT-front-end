import {userActions} from "../actions/user";
import {flagActions} from "../actions/flag";
import {CREATE_TICKET_FAIL, CREATE_TICKET_SUCCESS, RECEIVE_DUPLICATE_TITLE, UPDATE_TICKET_BY_ID} from "../actions/types"

const initialState = {
    userDataLoaded: false,
    successfulCreated: false,
    userDataUpdated: false,
    successfulPasswordUpdated: false,
    successfulSendEmail: false,
    failSendEmail: false,
    failPasswordUpdate: false,
    isDuplicatedEntry: false,
    ticketDataUpdated: false,
    isDuplicatedTitle: false,
    successfulForgotPasswordUpdated: false,
    failForgotPasswordUpdate: false,
    withTasks: false,

}

export const flipFlag = (state = initialState, action, history) => {
    switch (action.type) {
        case userActions.CLOSE_MODAL:
            return {
                ...state,
                userDataLoaded: true,
            };
        case userActions.RECEIVE_DUPLICATE_ENTRY:
            return {
                ...initialState,
                isDuplicatedEntry: true,
            };

        case userActions.CREATE_USER_SUCCESS:
            return {
                ...initialState,
                successfulCreated: true
            };
        case flagActions.RESET_EDIT_USER_FLAGS:
            return {
                ...state,
                userDataUpdated: false,
                isDuplicatedEntry: false
            }
        case userActions.UPDATE_PASSWORD_SUCCESS:
            return {
                ...initialState,
                successfulPasswordUpdated: true
            }
        case userActions.UPDATE_FORGOTTEN_PASSWORD_SUCCESS:
            return {
                ...initialState,
                successfulForgotPasswordUpdated: true
            }
        case userActions.FAIL_FORGOTTEN_PASSWORD_UPDATE:
            return {
                ...initialState,
                failForgotPasswordUpdate: true
            }
        case userActions.FAIL_PASSWORD_UPDATE:
            return {
                ...initialState,
                failPasswordUpdate: true
            }
        case CREATE_TICKET_SUCCESS:
            return {
                ...state,
                buttonCreateTicketPressed: true,
            };
        case CREATE_TICKET_FAIL:
            return {
                ...state,
                buttonCreateTicketPressed: true,
            };
        case userActions.UPDATE_USER_BY_ID:
            return {
                ...state,
                userDataUpdated: true,
            };
        case userActions.SEND_EMAIL_SUCCESS:
            return {
                ...initialState,
                successfulSendEmail: true,
            };
        case userActions.FAIL_SEND_EMAIL:
            return {
                ...initialState,
                failSendEmail: true,
            };
        case UPDATE_TICKET_BY_ID:
            return {
                ...state,
                ticketDataUpdated: true,
            };
        case RECEIVE_DUPLICATE_TITLE:
            return {
                ...state,
                isDuplicatedTitle: true,
            };
        case flagActions.RESET_EDIT_TICKET_FLAGS:
            return {
                ...state,
                ticketDataUpdated: false,
                isDuplicatedTitle: false,
            };
        case userActions.RECEIVE_USER_WITH_TASKS:
            return {
                ...initialState,
                withTasks: true
            };
        default:
            return state;
    }
}
