import {authActions} from "./auth";
import {routes} from "../../config/routes";
import UserService from "../../services/user.service"

export const userActions = {
    SET_USER_ID: "SET_USER_ID",
    // GET_USER_ID: "GET_USER_ID",
    GET_USER_BY_ID: "GET_USER_BY_ID",
}

export const setUserId = (userId) => (dispatch) => {

    return dispatch({
        type: userActions.SET_USER_ID,
        payload: userId
    })

}

export const getUserById = (userId) => (dispatch) => {
    const url = routes.BASIC_URL + routes.BASIC_PATH + routes.USER_BY_ID;
    console.log(userId + " this is userid")
    console.log(url + " urlllll")

    return UserService.getUserById(url, userId)
        .then(response => {
            return dispatch ({
                type: userActions.GET_USER_BY_ID,
                payload: response
            })
        })
}