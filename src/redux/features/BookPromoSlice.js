// components books type
import {
  MAKE_REQUEST,
  FAIL_REQUEST,
  GET_BOOKS_PROMO,
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

export const getBooksPromo = (data) => {
  return {
    type: GET_BOOKS_PROMO,
    payload: data,
  };
};

export const FunctionGetBooksPromo = () => {
  return async (dispatch) => {
    dispatch(makeRequest());
    try {
      const response = await API.get(`/books-promo`);
      if (response.data.code === 200) {
        const booksPromo = response.data.data;
        dispatch(getBooksPromo(booksPromo));
      }
    } catch (err) {
      dispatch(failRequest(err.message));
    }
  };
};
