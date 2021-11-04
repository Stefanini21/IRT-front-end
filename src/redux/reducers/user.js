import {userActions} from "../actions/user";

const initialState = {
    userId: {},
    userById: {}
}

export const user = (state = initialState, action) => {
    switch (action.type) {
        case userActions.SET_USER_ID:
            console.log(action.payload + "actionpayload")
            return {
                ...state,
                userId: action.payload
            };
        case userActions.GET_USER_BY_ID:
            console.log(action.payload + "this payload")
            const userById = action.payload
            console.log("bla bla bla " + userById)
            return {
                ...state,
                userById: userById
            };
        default:
            return state;
    }
}
