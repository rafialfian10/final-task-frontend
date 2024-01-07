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
  TransactionsData: [],
  TransactionData: {},
  loading: true,
  errorMessage: "",
};

export const TransactionReducer = (state = initialstateTransaction, action) => {
  switch (action.type) {
    case MAKE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FAIL_REQUEST:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };
    case GET_TRANSACTIONS_ADMIN:
      return {
        loading: false,
        errorMessage: "",
        TransactionsData: action.payload,
        TransactionData: {},
      };
      case GET_TRANSACTIONS_USER:
      return {
        loading: false,
        errorMessage: "",
        TransactionsData: action.payload,
        TransactionData: {},
      };
      case GET_TRANSACTION:
      return {
        ...state,
        loading: false,
        TransactionData: action.payload,
      };
    case CREATE_TRANSACTION:
      return {
        ...state,
        loading: false,
      };
    case UPDATE_TRANSACTION_ADMIN:
      return {
        ...state,
        loading: false,
      };
      case UPDATE_TRANSACTION_USER:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
