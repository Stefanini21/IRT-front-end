import { LOGIN_START, LOGIN_SUCCESS, LOGIN_ERROR, EMAIL, PASSWORD} from '../actions/actionTypes'

const initialState = {
    email: "",
    password: "",
    currentUser: {},
    authenticated: false,
    loading: false
}

export default function loginReducer(state = initialState, action) {
    switch (action.type) {
        case EMAIL:
            return {
                ...state,
                email: action.email
            }
        case PASSWORD:
            return {
                ...state,
                password: action.password
            }
        case LOGIN_START:
            return {
                ...state,
                loading: true
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                authenticated: true,
                currentUser: action.data
            }
        case LOGIN_ERROR:
            return {
                ...state,
                loading: false,
                authenticated: true,
                error: action.error
            }
        default:
            return state
    }
} 