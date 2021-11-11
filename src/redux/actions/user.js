import {routes} from "../../config/routes";
import {HttpService} from "../../services/httpService";

export const userActions = {
    SET_USER_ID: "SET_USER_ID",
    // GET_USER_ID: "GET_USER_ID",
    GET_USER_BY_ID: "GET_USER_BY_ID",
    CLOSE_MODAL: "CLOSE_MODAL",
    UPDATE_USER_BY_ID: "UPDATE_USER_BY_ID",
    GET_USER_LIST: "GET_USER_LIST",
    RECEIVE_DUPLICATE_ENTRY: "RECEIVE_DUPLICATE_ENTRY"
}

export const setUserId = (userId) => (dispatch) => {
    return dispatch({
        type: userActions.SET_USER_ID,
        payload: userId
    })
}

export const closeModal = () => (dispatch) => {
    return dispatch({
        type: userActions.CLOSE_MODAL,
    })
}

export const getUserList = () => (dispatch) => {
    const url = routes.BASIC_URL + routes.BASIC_PATH + routes.USER_BY_ID

    return HttpService.get(url)
        .then(response => {
            return dispatch({
                type: userActions.GET_USER_LIST,
                payload: response
            })
        })
}

export const getUserById = (userId) => (dispatch) => {
    const url = routes.BASIC_URL + routes.BASIC_PATH + routes.USER_BY_ID + userId;

    return HttpService.get(url, userId)
        .then(response => {
            return dispatch({
                type: userActions.GET_USER_BY_ID,
                payload: response
            })
        })
}

export const updateUserById = (userData, userId) => (dispatch) => {
    const url = routes.BASIC_URL + routes.BASIC_PATH + routes.USER_BY_ID + userId;

    return HttpService.put(url, userData)
        .then(response => {
            if (response === 403) {
                return dispatch({
                    type: userActions.RECEIVE_DUPLICATE_ENTRY
                })
            }
            else {
                return dispatch({
                    type: userActions.UPDATE_USER_BY_ID,
                    payload: response
                })
            }
        })
}