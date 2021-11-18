import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/users';

class UserService {

    postEmail(toEmail) {
        return axios.post(API_URL + "/" + toEmail + "/emails/reset-password", {headers: authHeader()});
    }

    changePassword(userId,currentPassword, newPassword, newPasswordConfirmation) {
        return axios
            .post(API_URL + "/" + userId + "/change-password", {
                currentPassword,
                newPassword,
                newPasswordConfirmation
            }, {headers: authHeader()});
    }

    getRoles() {
        return axios.get(API_URL + "/roles", {headers: authHeader()});
    }

    getSpecialties() {
        return axios.get(API_URL + "/specialties", {headers: authHeader()});
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
        console.log("in get user by id")
        return axios
            .get(url + JSON.stringify(userId), {headers: authHeader()})
            .then((response) => {
                // console.log(response.data)
                return response.data;
            });
    }

    getUserByUsername(url, userName) {
        return axios
            .get(url + JSON.stringify(userName), {headers: authHeader()})
            .then((response) => {
                return response.data;
            });
    }
}

export default new UserService();
