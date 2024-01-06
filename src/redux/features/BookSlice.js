// components books type
import {
  MAKE_REQUEST,
  FAIL_REQUEST,
  GET_BOOKS,
  GET_BOOK,
  CREATE_BOOK,
  UPDATE_BOOK,
  UPDATE_PROMO,
  DELETE_BOOK,
  DELETE_PDF,
  DELETE_THUMBNAIL,
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

export const getBooks = (data) => {
  return {
    type: GET_BOOKS,
    payload: data,
  };
};

export const getBook = (data) => {
  return {
    type: GET_BOOK,
    payload: data,
  };
};

export const createBook = () => {
  return {
    type: CREATE_BOOK,
  };
};

export const updateBook = () => {
  return {
    type: UPDATE_BOOK,
  };
};

export const updatePromo = () => {
  return {
    type: UPDATE_PROMO,
  };
};

export const deleteBook = () => {
  return {
    type: DELETE_BOOK,
  };
};

export const deletePdf = () => {
  return {
    type: DELETE_PDF,
  };
};

export const deleteThumbnail = () => {
  return {
    type: DELETE_THUMBNAIL,
  };
};

export const FunctionGetBooks = () => {
  const config = {
    headers: {
      "Content-type": "multipart/form-data",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  return async (dispatch) => {
    dispatch(makeRequest());
    try {
      const response = await API.get(`/books`, config);
      if (response.data.code === 200) {
        const books = response.data.data;
        dispatch(getBooks(books));
      }
    } catch (err) {
      dispatch(failRequest(err.message));
    }
  };
};

export const FuntionGetBook = (id) => {
  const config = {
    headers: {
      "Content-type": "multipart/form-data",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  return async (dispatch) => {
    dispatch(makeRequest());
    try {
      const response = await API.get(`/book/${id}`, config);
      if (response.data.code === 200) {
        const book = response.data.data;
        dispatch(getBook(book));
      }
    } catch (err) {
      dispatch(failRequest(err.message));
    }
  };
};

export const FunctionCreateBook = (formData) => {
  const config = {
    headers: {
      "Content-type": "multipart/form-data",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  return async (dispatch) => {
    dispatch(makeRequest());
    try {
      const response = await API.post("/book", formData, config);
      dispatch(createBook());

      return response;
    } catch (err) {
      dispatch(failRequest(err.message));
    }
  };
};

export const FunctionUpdateBook = (formData, id) => {
  const config = {
    headers: {
      "Content-type": "multipart/form-data",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  return async (dispatch) => {
    dispatch(makeRequest());
    try {
      const response = await API.patch(`/book/${id}`, formData, config);
      const book = response.data.data;
      dispatch(updateBook(book));

      return response;
    } catch (err) {
      dispatch(failRequest(err.message));
    }
  };
};

export const FunctionUpdatePromo = (formData, id) => {
  const config = {
    headers: {
      "Content-type": "multipart/form-data",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  return async (dispatch) => {
    dispatch(makeRequest());
    try {
      const response = await API.patch(`/book-promo/${id}`, formData, config);
      const book = response.data.data;
      dispatch(updatePromo(book));

      return response;
    } catch (err) {
      dispatch(failRequest(err.message));
    }
  };
};

export const FunctionDeleteBook = (id) => {
  const config = {
    headers: {
      "Content-type": "multipart/form-data",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  return async (dispatch) => {
    dispatch(makeRequest());
    try {
      const response = await API.delete(`/book/${id}`, config);
      dispatch(deleteBook());

      return response;
    } catch (err) {
      dispatch(failRequest(err.message));
    }
  };
};

export const FunctionDeletePdf = (id) => {
  const config = {
    headers: {
      "Content-type": "multipart/form-data",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  return async (dispatch) => {
    dispatch(makeRequest());
    try {
      const response = await API.delete(`/book/${id}/book`, config);
      dispatch(deletePdf());

      return response;
    } catch (err) {
      dispatch(failRequest(err.message));
    }
  };
};

export const FunctionDeleteThumbnail = (id) => {
  const config = {
    headers: {
      "Content-type": "multipart/form-data",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  return async (dispatch) => {
    dispatch(makeRequest());
    try {
      const response = await API.delete(`/book/${id}/thumbnail`, config);
      dispatch(deleteThumbnail());

      return response;
    } catch (err) {
      dispatch(failRequest(err.message));
    }
  };
};
