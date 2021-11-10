import {userActions} from "../actions/user";

const initialState = {
    userDataLoaded: false,
    isDuplicatedEntry: false,
    successfulCreated: false
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
            }
        default:
            return state;
    }
}
