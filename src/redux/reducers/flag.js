import {userActions} from "../actions/user";

const initialState = {
    userDataLoaded: false,
    userDataUpdated: false
}

export const flipFlag = (state = initialState, action) => {
    switch (action.type) {
        case userActions.CLOSE_MODAL:
            return {
                ...state,
                userDataLoaded: true
            };
        case userActions.GET_USER_BY_ID:
            return {
                ...state,
                userDataUpdated: true
            }
        default:
            return state;
    }
}
