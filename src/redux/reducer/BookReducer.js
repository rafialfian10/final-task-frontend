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
// -----------------------------------------------

const initialstateBook = {
  booksData: [],
  bookData: {},
  loading: true,
  errorMessage: "",
};

export const BookReducer = (state = initialstateBook, action) => {
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
    case GET_BOOKS:
      return {
        loading: false,
        errorMessage: "",
        booksData: action.payload,
        bookData: {},
      };
      case GET_BOOK:
      return {
        ...state,
        loading: false,
        bookData: action.payload,
      };
    case CREATE_BOOK:
      return {
        ...state,
        loading: false,
      };
    case UPDATE_BOOK:
      return {
        ...state,
        loading: false,
      };
      case UPDATE_PROMO:
        return {
          ...state,
          loading: false,
        };
    case DELETE_BOOK:
      return {
        ...state,
        loading: false,
      };
      case DELETE_PDF:
      return {
        ...state,
        loading: false,
      };
      case DELETE_THUMBNAIL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
