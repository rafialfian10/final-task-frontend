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
// -----------------------------------------------

const initialstateTransaction = {
  transactionsData: [],
  transactionData: {},
  loadingTransaction: true,
  errorMessageTransaction: "",
};

export const TransactionReducer = (state = initialstateTransaction, action) => {
  switch (action.type) {
    case MAKE_REQUEST:
      return {
        ...state,
        loadingTransaction: true,
      };
    case FAIL_REQUEST:
      return {
        ...state,
        loadingTransaction: false,
        errorMessageTransaction: action.payload,
      };
    case GET_TRANSACTIONS_ADMIN:
      return {
        loadingTransaction: false,
        errorMessageTransaction: "",
        transactionsData: action.payload,
        transactionData: {},
      };
      case GET_TRANSACTIONS_USER:
      return {
        loadingTransaction: false,
        errorMessageTransaction: "",
        transactionsData: action.payload,
        transactionData: {},
      };
      case GET_TRANSACTION:
      return {
        ...state,
        loadingTransaction: false,
        transactionData: action.payload,
      };
    case CREATE_TRANSACTION:
      return {
        ...state,
        loadingTransaction: false,
      };
    case UPDATE_TRANSACTION_ADMIN:
      return {
        ...state,
        loadingTransaction: false,
      };
      case UPDATE_TRANSACTION_USER:
      return {
        ...state,
        loadingTransaction: false,
      };
    default:
      return state;
  }
};
