import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/users';
const SEND_EMAIL_URL = "http://localhost:8080/api/email/sendMail";


class UserService {

    postEmail(toEmail) {
        return axios.post(SEND_EMAIL_URL,
            {
                toEmail
            },
            {headers: authHeader()}
        );
    }

    changePassword(userId, newPassword, newPasswordConfirmation) {
        return axios
            .post(API_URL + "/" + userId + "/change-password", {
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
