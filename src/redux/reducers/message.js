import {SET_MESSAGE, CLEAR_MESSAGE} from "../actions/types";


const initialState = {msg : ""};

export const message = (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case SET_MESSAGE:
            return {msg: payload};

        case CLEAR_MESSAGE:
            return {msg: ""};

        default:
            return state;
    }
}