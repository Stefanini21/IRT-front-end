import { store } from "../store/store";

export class RoleService {
  static isAdmin() {
    const state = store.getState();
    const { userData } = state.auth;
    const role = userData?.role;

    if(role === "ADMIN") {
        return true;
    }
    return false;
  }

  static isUser() {
    const state = store.getState();
    const { userData } = state.auth;
    const role = userData?.role;

    if(role === "USER") {
        return true;
    }
    return false;
  }
}
