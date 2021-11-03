import { userActions } from "../actions/user";

const initialState = {
    userId: {}
}

export const setUserId = (state = initialState, action) => {
    switch (action.type) {
        case userActions.SET_USER_ID:
            console.log(action.payload + "actionpayload")
            return {
                ...state,
                userId: action.payload
            };
        default:
            return state;
    }
}
