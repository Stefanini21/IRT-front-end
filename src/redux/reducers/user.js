import { userActions } from "../actions/user";
import { selectRolesFetching } from "../selectors/user";

const initialState = {
  userId: {},
  userById: {},
  updatedUser: {},
  createdUser: {},
  userList: {},
  specialties: {},
  specialtiesFetching: true,
  roles: {},
  rolesFetching: true,
  isFetching: true,

};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case userActions.GET_USER_LIST:
      return {
        ...state,
        userList: action.payload,
        isFetching: false,
      };
    case userActions.SET_USER_ID:
      return {
        ...state,
        userId: action.payload,
      };
    case userActions.GET_USER_BY_ID:
      const userById = action.payload;
      return {
        ...state,
        userById: userById,
      };
    case userActions.CREATE_USER_SUCCESS:
      return {
        ...state,
        createdUser: action.payload,
      };
    case userActions.GET_SPECIALTIES:
      return {
        ...state,
        specialties: action.payload,
        specialtiesFetching: false,
      };
    case userActions.GET_ROLES:
      return {
        ...state,
        roles: action.payload,
        rolesFetching: false,
      };
    default:
      return state;
  }
};
