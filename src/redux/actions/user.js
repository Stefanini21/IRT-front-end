import {routes} from "../../config/routes";
import {HttpService} from "../../services/httpService";
import {CLEAR_MESSAGE, CREATE_USER_FAIL, CREATE_USER_SUCCESS, SET_MESSAGE} from "./types";
import UserService from "../../services/user.service";
import {AuthActions} from "./auth";

export const userActions = {
    SET_USER_ID: "SET_USER_ID",
    GET_USER_BY_ID: "GET_USER_BY_ID",
    CLOSE_MODAL: "CLOSE_MODAL",
    CREATE_USER_SUCCESS: "CREATE_USER_SUCCESS",
    SET_MESSAGE: "SET_MESSAGE",
    CREATE_USER_FAIL: "CREATE_USER_FAIL",
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


export const changePassword = (passwordData, history) => (dispatch) => {
    UserService.changePassword(passwordData.userId, passwordData.newPassword, passwordData.newPasswordConfirmation)
        .then((data) => {
                dispatch({
                    type: AuthActions.CHANGE_PASSWORD,
                    payload: data,
                });
                dispatch({
                    type: SET_MESSAGE,
                    payload: 'Successfully changed password!',
                });
                dispatch({
                    type: CLEAR_MESSAGE,
                });
                return Promise.resolve();
            },
            (error) => {
                const message =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                dispatch({
                    type: SET_MESSAGE,
                    payload: message,
                });

                dispatch({
                    type: CLEAR_MESSAGE,
                });


                return Promise.reject();
            }
        );
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


export const createUser = (newUser) => (dispatch) => {
    const url = routes.BASIC_URL + routes.BASIC_PATH + routes.CREATE_USER;

    return HttpService.post(url, newUser)
        .then((response) => {

                if (response === 400 || response === 500) {
                    return dispatch({
                        type: userActions.RECEIVE_DUPLICATE_ENTRY
                    })
                } else {
                    return dispatch({
                        type: userActions.CREATE_USER_SUCCESS,
                        payload: response.data
                    })
                }
            }
        );
};


export const updateUserById = (userData, userId) => (dispatch) => {
    const url = routes.BASIC_URL + routes.BASIC_PATH + routes.USER_BY_ID + userId;

    return HttpService.put(url, userData)
        .then(response => {
            if (response === 403) {
                return dispatch({
                    type: userActions.RECEIVE_DUPLICATE_ENTRY
                })
            } else {
                return dispatch({
                    type: userActions.UPDATE_USER_BY_ID,
                    payload: response
                })
            }
        })
};
