import { routes } from "../../config/routes";
import { HttpService } from "../../services/httpService";

export const deleteActions = {
    DELETE_USER_BY_ID: "DELETE_USER_BY_ID"
};

export const deleteUserById = (userId) => (dispatch) => {
    const url = routes.BASIC_URL + routes.BASIC_PATH + routes.USER_BY_ID + userId;
   
    return HttpService.delete(url, userId)
        .then(response => {
            return dispatch({
                type: deleteActions.DELETE_USER_BY_ID,
                payload: response
            })
        })
};