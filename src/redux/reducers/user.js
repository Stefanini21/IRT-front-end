import {userActions} from "../actions/user";

const initialState = {
    userId: {},
    userById: {},
    //updatedUser: {},
    userList: {},
    isDeleted: false
}

export const user = (state = initialState, action) => {
    switch (action.type) {
        case userActions.SET_USER_ID:
            console.log(action.payload + "actionpayload")
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
        case userActions.GET_USER_LIST:
            const userList = action.payload
            return {
                ...state,
                userList: userList
            };
        case userActions.DELETE_USER_BY_ID:
            console.log(action.payload + "actionpayload for delete")
            return {
                ...state,
                userId: action.payload,
                isDeleted: true
            };
        default:
            return state;
    }
}
