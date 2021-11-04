import {userActions} from "../actions/user";

const initialState = {
    userDataLoaded: false
}

export const flipFlag = (state = initialState, action) => {
    switch (action.type) {
        case userActions.CLOSE_MODAL:
            return {
                ...state,
                userDataLoaded: true
            };
        default:
            return state;
    }
}
