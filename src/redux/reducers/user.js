import {userActions} from "../actions/user";

const initialState = {
    userId: {},
    userById: {},
    createdUser: {},
    isDeleted: false,
    userList: {},
    specialties: {},
    roles: {},
    isFetching: true
}

export const user = (state = initialState, action) => {
    switch (action.type) {
        case userActions.SET_USER_ID:
            return {
                ...state,
                userId: action.payload
            };
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
        case userActions.GET_USER_LIST:
            const userList = action.payload
            return {
                ...state,
                userList: userList,
                isFetching: false
            };
        case userActions.DELETE_USER_BY_ID:
            console.log(action.payload + " action.payload for delete")
            return {
                ...state,
                isDeleted: true
            };
        case userActions.GET_SPECIALTIES:
            return {
                ...state,
                specialties: action.payload
            };
        case userActions.GET_ROLES:
            return {
                ...state,
                roles: action.payload
            };
        default:
            return state;
    }
}