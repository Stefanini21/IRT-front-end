import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/users/';

class UserService {

  getUserBoard() {
    return axios.get(API_URL + JSON.parse(localStorage.getItem('user')).id, { headers: authHeader() });
  }
}

export default new UserService();
