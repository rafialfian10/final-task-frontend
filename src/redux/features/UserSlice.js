// components books type
import {
  MAKE_REQUEST,
  FAIL_REQUEST,
  GET_USERS,
  GET_USER,
  UPDATE_USER,
  DELETE_USER,
} from "../ActionType";

// api
import { API } from "../../config/api";
// ------------------------------------------------------------

export const makeRequest = () => {
  return {
    type: MAKE_REQUEST,
  };
};

export const failRequest = (err) => {
  return {
    type: FAIL_REQUEST,
    payload: err,
  };
};

export const getUsers = (data) => {
  return {
    type: GET_USERS,
    payload: data,
  };
};

export const getUser = (data) => {
  return {
    type: GET_USER,
    payload: data,
  };
};

export const updateUser = () => {
  return {
    type: UPDATE_USER,
  };
};

export const deleteUser = () => {
  return {
    type: DELETE_USER,
  };
};

export const FunctionGetUsers = () => {
  const config = {
    headers: {
      "Content-type": "multipart/form-data",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  return async (dispatch) => {
    dispatch(makeRequest());
    try {
      const response = await API.get(`/users`, config);
      if (response.data.code === 200) {
        const users = response.data.data;
        dispatch(getUsers(users));
      }
    } catch (err) {
      dispatch(failRequest(err.message));
    }
  };
};

export const FunctionGetUser = (id) => {
  const config = {
    headers: {
      "Content-type": "multipart/form-data",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  return async (dispatch) => {
    dispatch(makeRequest());
    try {
      const response = await API.get(`/user/${id}`, config);
      if (response.data.code === 200) {
        const user = response.data.data;
        dispatch(getUser(user));
      }
    } catch (err) {
      dispatch(failRequest(err.message));
    }
  };
};

export const FunctionUpdateUser = (formData, id) => {
  const config = {
    headers: {
      "Content-type": "multipart/form-data",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  return async (dispatch) => {
    dispatch(makeRequest());
    try {
      const response = await API.patch(`/user/${id}`, formData, config);
      const user = response.data.data;
      dispatch(updateUser(user));

      return response;
    } catch (err) {
      dispatch(failRequest(err.message));
    }
  };
};

export const FunctionDeleteUser = (id) => {
  const config = {
    headers: {
      "Content-type": "multipart/form-data",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  return async (dispatch) => {
    dispatch(makeRequest());
    try {
      const response = await API.delete(`/user/${id}`, config);
      dispatch(deleteUser());

      return response;
    } catch (err) {
      dispatch(failRequest(err.message));
    }
  };
};

