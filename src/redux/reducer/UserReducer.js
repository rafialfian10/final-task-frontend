// components books type
import {
  MAKE_REQUEST,
  FAIL_REQUEST,
  GET_USERS,
  GET_USER,
  UPDATE_USER,
  DELETE_USER,
} from "../ActionType";
// -----------------------------------------------

const initialstateUser = {
  usersData: [],
  userData: {},
  loadingUser: true,
  errorMessageUser: "",
};

export const UserReducer = (state = initialstateUser, action) => {
  switch (action.type) {
    case MAKE_REQUEST:
      return {
        ...state,
        loadingUser: true,
      };
    case FAIL_REQUEST:
      return {
        ...state,
        loadingUser: false,
        errorMessageUser: action.payload,
      };
    case GET_USERS:
      return {
        loadingUser: false,
        errorMessageUser: "",
        usersData: action.payload,
        userData: {},
      };
      case GET_USER:
      return {
        ...state,
        loadingUser: false,
        userData: action.payload,
      };
    case UPDATE_USER:
      return {
        ...state,
        loadingUser: false,
      };
    case DELETE_USER:
      return {
        ...state,
        loadingUser: false,
      };
    default:
      return state;
  }
};
