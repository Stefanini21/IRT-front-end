import axios from 'axios'
import { LOGIN_START, LOGIN_SUCCESS, LOGIN_ERROR, EMAIL, PASSWORD} from './actionTypes'

export function introEmail(email) {
    return {
        type: EMAIL,
        email: email
    }
}
export function introPassword(password) {
    return {
        type: PASSWORD,
        password: password
    }
}

export function fetchLogin() {
    return dispatch => {
        fetchLoginStart(formData)
    }
}

export function fetchLoginStart(formData) {
    axios.post('http://89.28.31.132:8081/login/' + JSON.stringify(formData))
            .then(response => {
                console.log(response);
                fetchLoginSuccess(response.data)
            }).catch((e) => {
                fetchLoginError(e)
            })
    return {
        type: LOGIN_START,
        loading: true
    }
}

export function fetchAllUsersSuccess(data) {
    return {
        type: LOGIN_SUCCESS,
        currentUser: data,
        loading: false
    }
}

export function fetchAllUsersError(e) {
    return {
        type: LOGIN_ERROR,
        loading: false,
        error: e
    }
}