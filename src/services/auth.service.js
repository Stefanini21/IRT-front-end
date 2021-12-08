import axios from "axios";

const API_URL = "http://34.116.181.108:8080/api/auth/";

class AuthService {
    login(email, password) {
        return axios
            .post(API_URL + "login", {
                email,
                password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("token", response.data.accessToken);
                }
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("token");
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();
