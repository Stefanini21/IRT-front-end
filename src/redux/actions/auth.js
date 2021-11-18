import {routes} from "../../config/routes";
import {HttpService} from "../../services/httpService";
import AuthService from "../../services/auth.service";
import {CLEAR_MESSAGE, SET_MESSAGE} from "./types";

export const AuthActions = {
    RECEIVE_USER_AUTH: "RECEIVE_USER_AUTH",
    RECEIVE_USER_SIGNOUT: "RECEIVE_USER_SIGNOUT",
    CHANGE_PASSWORD: "CHANGE_PASSWORD",
}


export const authUser = (userData, history) => (dispatch) => {
    AuthService.login(userData.email, userData.password)
        .then((data) => {
                dispatch({
                    type: AuthActions.RECEIVE_USER_AUTH,
                    payload: data,
                });
                dispatch({
                    type: CLEAR_MESSAGE,
                });
                history.push("/home");
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

                return Promise.reject();
            }
        );
}

export const signOutUser = (history) => (dispatch) => {
    const url = routes.BASIC_URL + routes.BASIC_PATH + routes.LOGOUT_URL;

    return HttpService.postSignOut(url)
        .then(() => {
            dispatch({
                type: AuthActions.RECEIVE_USER_SIGNOUT
            });
            history.push("/login");
        })
}