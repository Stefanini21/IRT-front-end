import {DECREMENT_TIME, SET_DECREMENT_TIME} from "./types";

export const setDecrementTime = (value) => (dispatch) => {
    return dispatch({
        type: SET_DECREMENT_TIME,
        payload: value
    });
};
export const decrementTime = (value) => (dispatch) => {
    return dispatch({
        type: DECREMENT_TIME,
        payload: value
    });
};