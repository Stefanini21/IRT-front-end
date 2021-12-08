import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://34.116.181.108:8080/api/users';
const API_URL_TICKETS = 'http://34.116.181.108:8080/api/tickets';

class UserService {

    getTicketsFor(id) {
        return axios.get(API_URL_TICKETS + "/user-tickets/" + id, {headers: authHeader()});
    }

    postEmail(toEmail) {
        return axios.post(API_URL + "/" + toEmail + "/emails/reset-password", {headers: authHeader()});
    }

    changePassword(userId, currentPassword, newPassword, newPasswordConfirmation) {
        return axios
            .post(API_URL + "/" + userId + "/change-password", {
                currentPassword,
                newPassword,
                newPasswordConfirmation
            }, {headers: authHeader()});
    }

    changeForgottenPassword(email, verificationCode, newPassword, newPasswordConfirmation) {
        return axios
            .post(API_URL + "/change-forgotten-password", {
                email,
                verificationCode,
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
        return axios
            .get(url + JSON.stringify(userId), {headers: authHeader()})
            .then((response) => {
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
