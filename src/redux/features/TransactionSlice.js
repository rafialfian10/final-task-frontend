// components books type
import {
  MAKE_REQUEST,
  FAIL_REQUEST,
  GET_TRANSACTIONS_ADMIN,
  GET_TRANSACTIONS_USER,
  GET_TRANSACTION,
  CREATE_TRANSACTION,
  UPDATE_TRANSACTION_ADMIN,
  UPDATE_TRANSACTION_USER,
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

export const getTransactionsAdmin = (data) => {
  return {
    type: GET_TRANSACTIONS_ADMIN,
    payload: data,
  };
};

export const getTransactionsUser = (data) => {
  return {
    type: GET_TRANSACTIONS_USER,
    payload: data,
  };
};

export const getTransaction = (data) => {
  return {
    type: GET_TRANSACTION,
    payload: data,
  };
};

export const createTransaction = () => {
  return {
    type: CREATE_TRANSACTION,
  };
};

export const updateTransactionAdmin = () => {
  return {
    type: UPDATE_TRANSACTION_ADMIN,
  };
};

export const updateTransactionUser = () => {
  return {
    type: UPDATE_TRANSACTION_USER,
  };
};

export const FunctionGetTransactionsAdmin = () => {
  const config = {
    headers: {
      "Content-type": "multipart/form-data",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  return async (dispatch) => {
    dispatch(makeRequest());
    try {
      const response = await API.get(`/transactions-admin`, config);
      if (response.data.code === 200) {
        const transactionsAdmin = response.data.data;
        dispatch(getTransactionsAdmin(transactionsAdmin));
      }
    } catch (err) {
      dispatch(failRequest(err.message));
    }
  };
};

export const FunctionGetTransactionsUser = () => {
  const config = {
    headers: {
      "Content-type": "multipart/form-data",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  return async (dispatch) => {
    dispatch(makeRequest());
    try {
      const response = await API.get(`/transactions`, config);
      if (response.data.code === 200) {
        const transactionsUser = response.data.data;
        dispatch(getTransactionsUser(transactionsUser));
      }
    } catch (err) {
      dispatch(failRequest(err.message));
    }
  };
};

export const FuntionGetTransaction = (id) => {
  const config = {
    headers: {
      "Content-type": "multipart/form-data",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  return async (dispatch) => {
    dispatch(makeRequest());
    try {
      const response = await API.get(`/transaction/${id}`, config);
      if (response.data.code === 200) {
        const book = response.data.data;
        dispatch(getTransaction(book));
      }
    } catch (err) {
      dispatch(failRequest(err.message));
    }
  };
};

export const FunctionCreateTransaction = (formData) => {
  return async (dispatch) => {
    dispatch(makeRequest());
    try {
      const response = await API.post("/transaction", formData);
      dispatch(createTransaction());

      return response;
    } catch (err) {
      dispatch(failRequest(err.message));
    }
  };
};

export const FunctionUpdateTransactionAdmin = (formData, id) => {
  const config = {
    headers: {
      "Content-type": "multipart/form-data",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  return async (dispatch) => {
    dispatch(makeRequest());
    try {
      const response = await API.patch(`/transaction-admin/${id}`, formData, config);
      const transactionAdmin = response.data.data;
      dispatch(updateTransactionAdmin(transactionAdmin));

      return response;
    } catch (err) {
      dispatch(failRequest(err.message));
    }
  };
};

export const FunctionUpdateTransactionUser = (formData, id) => {
  const config = {
    headers: {
      "Content-type": "multipart/form-data",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  return async (dispatch) => {
    dispatch(makeRequest());
    try {
      const response = await API.patch(`/transaction/${id}`, formData, config);
      const transactionAdmin = response.data.data;
      dispatch(updateTransactionAdmin(transactionAdmin));

      return response;
    } catch (err) {
      dispatch(failRequest(err.message));
    }
  };
};


