import {routes} from "../../config/routes";
import {HttpService} from "../../services/httpService";

export const AuthActions = {
    RECEIVE_USER_AUTH: "RECEIVE_USER_AUTH",
    RECEIVE_USER_SIGNOUT: "RECEIVE_USER_SIGNOUT"
}

export const authUser = (userData, history) => (dispatch) => {
    const url = routes.BASIC_URL + routes.BASIC_PATH + routes.AUTH_URL;

    return HttpService.post(url, userData)
        .then(response => {
            // console.log("response in then: " + response)
            response !== 500 && dispatch({
                type: AuthActions.RECEIVE_USER_AUTH,
                payload: response
            });
        });
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