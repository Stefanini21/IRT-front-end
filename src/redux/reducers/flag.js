import {userActions} from "../actions/user";
import {flagActions} from "../actions/flag";
import {UPDATE_TICKET_BY_ID,
    RECEIVE_DUPLICATE_TITLE, CREATE_TICKET_SUCCESS, CREATE_TICKET_FAIL} from "../actions/types"

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
}

export const flipFlag = (state = initialState, action) => {
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
          successfulCreated: true,
        };
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
      case flagActions.RESET_EDIT_USER_FLAGS:
        return {
          ...state,
          userDataUpdated: false,
          isDuplicatedEntry: false,
        };
      case userActions.UPDATE_PASSWORD_SUCCESS:
        return {
          ...initialState,
          successfulPasswordUpdated: true,
        };
      case userActions.FAIL_PASSWORD_UPDATE:
        return {
          ...initialState,
          failPasswordUpdate: true,
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
      default:
        return state;
    }
}
