import { CLEAR_MESSAGE, SET_MESSAGE, CHECK_TOKEN_VALIDITY, RECEIVE_USER_AUTH, RECEIVE_USER_SIGNOUT, CHANGE_PASSWORD } from "../actions/types";

const initialState = {
    userData: {},
    currentUserLoaded: false,
    tokenValidity: false
}

export const auth = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_USER_AUTH:
            return {
                ...state,
                userData: action.payload,
                currentUserLoaded: true
            };
        case RECEIVE_USER_SIGNOUT:
            return {
                ...state,
                userData: null,
                currentUserLoaded: false
            }
        case CHECK_TOKEN_VALIDITY:
            return {
                ...state,
                tokenValidity: action.payload
            }
        default:
            return state;
    }
}
