import {routes} from "../../config/routes";
import {HttpService} from "../../services/httpService";

export const authActions = {
    RECEIVE_USER_AUTH: "RECEIVE_USER_AUTH",
    RECEIVE_USER_SIGNOUT: "RECEIVE_USER_SIGNOUT"
}

export const authUser = (userData) => (dispatch) => {
    const url = routes.BASIC_URL + routes.BASIC_PATH + routes.AUTH_URL;

    return HttpService.post(url, userData)
        .then(response => {
            return dispatch({
                type: authActions.RECEIVE_USER_AUTH,
                payload: response
            })
        })
}

export const signOutUser = (history) => (dispatch) => {
    const url = routes.BASIC_URL + routes.BASIC_PATH + routes.LOGOUT_URL;

    return HttpService.postSignOut(url)
        .then(() => {
            dispatch({
                type: authActions.RECEIVE_USER_SIGNOUT
            });
            history.push("/home");
        })
}