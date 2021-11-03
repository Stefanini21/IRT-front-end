import { userActions } from "../actions/user";
import UserService from "../../services/user.service";

const initialState = {
    userId: {},
    userById: {}
}

export const setUserId = (state = initialState, action) => {
    switch (action.type) {
        case userActions.SET_USER_ID:
            console.log(action.payload + "actionpayload")
            return {
                ...state,
                userId: action.payload
            };
        case userActions.GET_USER_BY_ID:
            console.log(action.payload + "this payload")
            const userById = UserService.getUserById(action.payload)
            console.log("bla bla bla " + userById)
            return {
                ...state,
                userById: userById
            };
        default:
            return state;
    }
}

