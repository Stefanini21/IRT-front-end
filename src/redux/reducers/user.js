import { authActions } from "../actions/auth";

const initialState = {
  firstName,
  lastName,
  userName,
  email,
  password,
  role,
  specialty,
};

export const saveUser = (state = initialState, action) => {
  switch (action.type) {
    case userActions.GET:
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        userName: action.payload.userName,
        email: action.payload.email,
        password: action.payload.password,
        role: action.payload.role,
        specialty: action.payload.specialty,
      };
    case authActions.RECEIVE_USER_SIGNOUT:
      return {
        ...state,
        userData: null,
        currentUserLoaded: false,
      };
    default:
      return state;
  }
};
