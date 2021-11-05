import { AuthActions } from "../actions/auth";

const initialState = {
    userData: {},
    currentUserLoaded: false
}

export const auth = (state = initialState, action) => {
    switch (action.type) {
        case AuthActions.RECEIVE_USER_AUTH:
            return {
                ...state,
                userData: action.payload,
                currentUserLoaded: true
            };
        case AuthActions.RECEIVE_USER_SIGNOUT:
            return {
                ...state,
                userData: null,
                currentUserLoaded: false
            }
        default:
            return state;
    }
}
