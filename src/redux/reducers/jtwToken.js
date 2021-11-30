import {DECREMENT_TIME, SET_DECREMENT_TIME} from "../actions/types";

const initialState = {remainingTime: null};

export const decrementTime = (state = initialState, action) => {

    switch (action.type) {
        case SET_DECREMENT_TIME:
            console.log("in setDecrementTime: action.payload: " + action.payload)
            return {remainingTime: action.payload};
        case DECREMENT_TIME:
            console.log("in decrementTime: action.payload: " + action.payload)
            return {remainingTime: action.payload};
        default:
            return state;
    }
};
