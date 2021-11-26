import { routes } from "../../config/routes";
import { HttpService } from "../../services/httpService";
import AuthService from "../../services/auth.service";
import { CLEAR_MESSAGE, SET_MESSAGE, CHECK_TOKEN_VALIDITY, RECEIVE_USER_AUTH, RECEIVE_USER_SIGNOUT, CHANGE_PASSWORD } from "./types";

export const authUser = (userData, history) => (dispatch) => {
  AuthService.login(userData.email, userData.password).then(
    (data) => {
      dispatch({
        type: RECEIVE_USER_AUTH,
        payload: data,
      });
      dispatch({
        type: CLEAR_MESSAGE,
      });
      history.push("/home");
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const signOutUser = (history) => (dispatch) => {
  const url = routes.BASIC_URL + routes.BASIC_PATH + routes.LOGOUT_URL;

  return HttpService.postSignOut(url).then(() => {
    dispatch({
      type: RECEIVE_USER_SIGNOUT,
    });
    history.push("/login");
  });
};

export const checkTokenValidity = (token, history) => (dispatch) => {
    console.log("In checkTokenValidity, token: " + token);
  if (token > Math.ceil(Date.now() / 1000)) {
    dispatch({
      type: CHECK_TOKEN_VALIDITY,
      payload: true,
    });
  } else {
    dispatch({
      type: CHECK_TOKEN_VALIDITY,
      payload: false,
    });
    // history.push("/logout");
  }
};
