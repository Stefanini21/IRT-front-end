import {GET_ALL_USERS_START, GET_ALL_USERS_SUCCESS, GET_ALL_USERS_ERROR} from '../actions/actionTypes'

const initialState = {
    currentUser: {},
    activeTab: '1',
    users: [],
    loading: false,
    error: null
}

export default function userListReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_USERS_START:
            return {
                ...state,
                loading: true
            }
        case GET_ALL_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                currentUser: action.currentUser,
                users: action.allUsers,
                activeTab: action.activeTab
            }
        case GET_ALL_USERS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state
    }
} 