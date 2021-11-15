import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/users';


class UserService {

    getUsers() {
        return axios.get(API_URL, {headers: authHeader()});
    }

    getRoles() {
        return axios.get(API_URL + "/roles", {headers: authHeader()});
    }

    getSpecialties() {
        return axios.get(API_URL + "/specialties", {headers: authHeader()});
    }

    deleteUser(userId) {
        return axios.delete(API_URL + "/" + userId, {headers: authHeader()});
    }

    changePassword(userId, newPassword, newPasswordConfirmation) {
        return axios
            .post(API_URL + "/" + userId + "/change-password", {
                newPassword,
                newPasswordConfirmation
            }, {headers: authHeader()});
    }

    createUser(username, firstname, lastname, specialty, role, email, password) {
        return axios.post(
            API_URL,
            {
                username,
                firstName: firstname,
                lastName: lastname,
                specialty,
                role,
                email,
                password,
            },
            {headers: authHeader()}
        );
    }

    getUserById(url, userId) {
        return axios
            .get(url + JSON.stringify(userId), {headers: authHeader()})
            .then((response) => {
                // console.log(response.data)
                return response.data;
            });
    }

    //getUserByUsername
    getUserByUsername(url, userName) {
        return axios
            .get(url + JSON.stringify(userName), {headers: authHeader()})
            .then((response) => {
                // console.log(response.data)
                return response.data;
            });
    }
}

export default new UserService();
