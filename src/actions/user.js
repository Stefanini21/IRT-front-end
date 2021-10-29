import UserService from "../services/user.service";
import {CREATE_USER_FAIL, CREATE_USER_SUCCESS, DELETE_USER_FAIL, DELETE_USER_SUCCESS, SET_MESSAGE} from "./types";

export const deleteUser = (userId) => (dispatch) => {
    return UserService.deleteUser(userId)
        .then((response) => {
                dispatch({
                    type: DELETE_USER_SUCCESS,
                });

                dispatch({
                    type: SET_MESSAGE,
                    payload: response.data.message,
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
                    type: DELETE_USER_FAIL,
                });

                dispatch({
                    type: SET_MESSAGE,
                    payload: message,
                });

                return Promise.reject();
            }
        );
};

export const createUser = (username, firstname, lastname, specialty, role, email, password) => (dispatch) => {
    return UserService.createUser(username, firstname, lastname, specialty, role, email, password)
        .then((response) => {
                dispatch({
                    type: CREATE_USER_SUCCESS,
                    payload: response.data,
                });

                dispatch({
                    type: SET_MESSAGE,
                    payload: response.data.message,
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
                    type: CREATE_USER_FAIL,
                });

                dispatch({
                    type: SET_MESSAGE,
                    payload: message,
                });

                return Promise.reject();
            }
        );
};