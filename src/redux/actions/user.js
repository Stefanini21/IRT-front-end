import {routes} from "../../config/routes";
import {HttpService} from "../../services/httpService";

export const userActions = {
    GET_ALL_USERS: "GET_ALL_USERS",
    GET_USER_BY_ID: "GET_USER_BY_ID",
    UPDATE_USER: "UPDATE_USER",
    DELETE_USER: "DELETE_USER"
}

export const saveUser = (newUser) => (dispatch) => {
    const url = routes.BASIC_URL + routes.BASIC_PATH + routes.ALL_USERS_URL;
    console.log(url);

    return HttpService.post(url, newUser)
        .then(response => {
            return dispatch({
                type: userActions.GET_ALL_USERS,
                payload: response
            })
        })
}

// export const signOutUser = (history) => (dispatch) => {
//     const url = routes.BASIC_URL + routes.BASIC_PATH + routes.LOGOUT_URL;

//     return HttpService.postSignOut(url)
//         .then(() => {
//             dispatch({
//                 type: authActions.RECEIVE_USER_SIGNOUT
//             });
//             history.push("/");
//         })
// }