import {routes} from "../../components/config/routes";
import {HttpService} from "../../services/httpService";

export const authActions = {
    GET_ALL_USERS: "GET_ALL_USERS",
    GET_USER_BY_ID: "GET_USER_BY_ID",
    UPDATE_USER: "UPDATE_USER",
    DELETE_USER: "DELETE_USER"
}

// export const authUser = (userData) => (dispatch) => {
//     const url = routes.BASIC_URL + routes.BASIC_PATH + routes.AUTH_URL;
//     console.log(url);

//     return HttpService.post(url, userData)
//         .then(response => {
//             return dispatch({
//                 type: authActions.RECEIVE_USER_AUTH,
//                 payload: response
//             })
//         })
// }

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