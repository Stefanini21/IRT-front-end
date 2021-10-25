import axios from 'axios'
import { GET_ALL_USERS_START, GET_ALL_USERS_SUCCESS, GET_ALL_USERS_ERROR } from './actionTypes'

export function fetchAllUsers() {
    return dispatch => {
        fetchAllUsersStart()
        axios.get('http://89.28.31.132:8081/admin/users')
            .then(response => {
                console.log(response);
                fetchAllUsersSuccess(response.data)

            }).catch((e) => {
                fetchAllUsersError(e)
            })
    }
}

export function fetchAllUsersStart() {
    return {
        type: GET_ALL_USERS_START
    }
}

export function fetchAllUsersSuccess(data) {
    return {
        type: GET_ALL_USERS_SUCCESS,
        allUsers: data
    }
}

export function fetchAllUsersError(e) {
    return {
        type: GET_ALL_USERS_ERROR,
        console: e
    }
}