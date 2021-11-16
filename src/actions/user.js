import UserService from "../services/user.service";
import {DELETE_USER_FAIL, DELETE_USER_SUCCESS, SET_MESSAGE} from "../redux/actions/types";

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
