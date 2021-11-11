import {userActions} from "../actions/user";
import {flagActions} from "../actions/flag";

const initialState = {
    userDataLoaded: false,
    successfulCreated: false,
    userDataUpdated: false,
    isDuplicatedEntry: false
}

export const flipFlag = (state = initialState, action) => {
    switch (action.type) {
        case userActions.CLOSE_MODAL:
            return {
                ...state,
                userDataLoaded: true
            }
        case userActions.RECEIVE_DUPLICATE_ENTRY:
            return {
                ...initialState,
                isDuplicatedEntry: true
            }

        case userActions.CREATE_USER_SUCCESS:
            return {
                ...initialState,
                successfulCreated: true
            };
        case userActions.UPDATE_USER_BY_ID:
            return {
                ...state,
                userDataUpdated: true
            };
        case flagActions.RESET_EDIT_USER_FLAGS:
            return {
                ...state,
                userDataUpdated: false,
                isDuplicatedEntry: false
            }
        default:
            return state;
    }
}
