import {deleteActions} from "../actions/delete-user";

const initialState = {
    userId: {},
    isDeleted: false
}

export const user = (state = initialState, action) => {
    switch (action.type) {
        case deleteActions.DELETE_USER_BY_ID:
            console.log(action.payload + "actionpayload")
            return {
                ...state,
                userId: action.payload,
                isDeleted: true
            };

        default:
            return state;
    }
}