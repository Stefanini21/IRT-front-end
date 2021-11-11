import {userActions} from "../actions/user";

const initialState = {
    userId: {},
    userById: {},
    updatedUser: {},
    createdUser: {},
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
            return {
                ...state,
                userId: action.payload
            };
        // case userActions.UPDATE_USER_BY_ID:
        //     return {
        //         ...state,
        //         updatedUser: action.payload
        //     }
        case userActions.GET_USER_BY_ID:
            const userById = action.payload
            return {
                ...state,
                userById: userById
            };
        case userActions.CREATE_USER_SUCCESS:
            return {
                ...state,
                createdUser: action.payload
            };
        default:
            return state;
    }
}