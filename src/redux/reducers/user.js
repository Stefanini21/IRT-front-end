import {userActions} from "../actions/user";

const initialState = {
    userId: {},
    userById: {},
    updatedUser: {},
    userList: {}
}

export const user = (state = initialState, action) => {
    switch (action.type) {
        case userActions.GET_USER_LIST:
            const userList = action.payload
            return {
                ...state,
                userList: userList
            }
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
        case userActions.UPDATE_USER_BY_ID:
            return {
                ...state,
                updatedUser: action.payload
            }
        default:
            return state;
    }
}
