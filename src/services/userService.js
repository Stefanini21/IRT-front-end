import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/users';

const UserService = () => {
  const getUsers = () => {
    return axios.get(API_URL, { headers: authHeader() });
  }

  const deleteUser = (userId) => {
    return axios.delete(API_URL + "/" + userId, { headers: authHeader() });
  }

  const createUser = (username, firstname, lastname, specialty, role, email, password) => {
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
      { headers: authHeader() }
    );
  }

  const getUserById = (url, userId) => {
    return axios
      .get(url + JSON.stringify(userId), { headers: authHeader() })
      .then((response) => {
        // console.log(response.data)
        return response.data;
      });
  }

  //getUserByUsername
  const getUserByUsername = (url, userName) => {
    return axios
      .get(url + JSON.stringify(userName), { headers: authHeader() })
      .then((response) => {
        // console.log(response.data)
        return response.data;
      });
  }
}

export default UserService;