import {store} from "../store";

export default function authHeader() {
  const state = store.getState();
  const { userData } = state.auth;
  const token = userData?.accessToken;

  if (token) {
     return { Authorization: 'Bearer ' + userData.accessToken };
  } else {
    return {};
  }
}
