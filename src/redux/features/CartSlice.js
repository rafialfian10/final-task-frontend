// components books type
import {
  MAKE_REQUEST,
  FAIL_REQUEST,
  GET_CARTS,
  GET_CART,
  CREATE_CART,
  UPDATE_CART,
  DELETE_CART,
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

export const getCarts = (data) => {
  return {
    type: GET_CARTS,
    payload: data,
  };
};

export const getCart = (data) => {
  return {
    type: GET_CART,
    payload: data,
  };
};

export const createcart = () => {
  return {
    type: CREATE_CART,
  };
};

export const updateCart = () => {
  return {
    type: UPDATE_CART,
  };
};

export const deleteCart = () => {
  return {
    type: DELETE_CART,
  };
};

export const FunctionGetCarts = () => {
  const config = {
    headers: {
      "Content-type": "multipart/form-data",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  return async (dispatch) => {
    dispatch(makeRequest());
    try {
      const response = await API.get(`/carts`, config);
      if (response.data.code === 200) {
        const carts = response.data.data;
        dispatch(getCarts(carts));
      }
    } catch (err) {
      dispatch(failRequest(err.message));
    }
  };
};

export const FuntionGetCart = (id) => {
  const config = {
    headers: {
      "Content-type": "multipart/form-data",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  return async (dispatch) => {
    dispatch(makeRequest());
    try {
      const response = await API.get(`/cart/${id}`, config);
      if (response.data.code === 200) {
        const cart = response.data.data;
        dispatch(getCart(cart));
      }
    } catch (err) {
      dispatch(failRequest(err.message));
    }
  };
};

export const FunctionCreateCart = (formData) => {
  const config = {
    headers: {
      "Content-type": "multipart/form-data",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  return async (dispatch) => {
    dispatch(makeRequest());
    try {
      const response = await API.post("/cart", formData, config);
      dispatch(createcart());

      return response;
    } catch (err) {
      dispatch(failRequest(err.message));
    }
  };
};

export const FunctionUpdateCart = (event, id) => {
  return async (dispatch) => {
    dispatch(makeRequest());
    try {
      const response = await API.patch(`/cart/${id}`, {event: event});
      const cart = response.data.data;
      dispatch(updateCart(cart));

      return response;
    } catch (err) {
      dispatch(failRequest(err.message));
    }
  };
};

export const FunctionDeleteCart = (id) => {
  const config = {
    headers: {
      "Content-type": "multipart/form-data",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  return async (dispatch) => {
    dispatch(makeRequest());
    try {
      const response = await API.delete(`/cart/${id}`, config);
      dispatch(deleteCart());

      return response;
    } catch (err) {
      dispatch(failRequest(err.message));
    }
  };
};

