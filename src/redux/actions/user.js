
export const userActions = {
    SET_USER_ID: "SET_USER_ID",
    // GET_USER_ID: "GET_USER_ID",
    GET_USER_BY_ID: "GET_USER_BY_ID"
}

export const setUserId = (userId) => (dispatch) => {

    return dispatch({
        type: userActions.SET_USER_ID,
        payload: userId
    })

}

export const getUserById = (userId) => (dispatch) => {

    return dispatch ({
        type: userActions.GET_USER_BY_ID,
        payload: userId
    })
}

// export const signOutUser = (history) => (dispatch) => {
//     const url = routes.BASIC_URL + routes.BASIC_PATH + routes.LOGOUT_URL;
//
//     return HttpService.postSignOut(url)
//         .then(() => {
//             dispatch({
//                 type: authActions.RECEIVE_USER_SIGNOUT
//             });
//             history.push("/home");
//         })
// }