import {SEND_COUNTER_TOKEN_TO_BACK} from '../actions/types'

const initialState = {
    jwtCounterValue: null,
    jwtCounterValueFromBack: null,
};

export const jwtCounter = (state = initialState, action) => {
    switch (action.type) {
        case SEND_COUNTER_TOKEN_TO_BACK:
            return {
                ...state,
                jwtCounterValueFromBack: action.payload
            }
        default:
            return state;
    }
}
