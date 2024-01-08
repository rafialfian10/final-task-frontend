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
  loadingBook: true,
  errorMessageBook: "",
};

export const BookReducer = (state = initialstateBook, action) => {
  switch (action.type) {
    case MAKE_REQUEST:
      return {
        ...state,
        loadingBook: true,
      };
    case FAIL_REQUEST:
      return {
        ...state,
        loadingBook: false,
        errorMessageBook: action.payload,
      };
    case GET_BOOKS:
      return {
        loadingBook: false,
        errorMessageBook: "",
        booksData: action.payload,
        bookData: {},
      };
    case GET_BOOK:
      return {
        ...state,
        loadingBook: false,
        bookData: action.payload,
      };
    case CREATE_BOOK:
      return {
        ...state,
        loadingBook: false,
      };
    case UPDATE_BOOK:
      return {
        ...state,
        loadingBook: false,
      };
    case UPDATE_PROMO:
      return {
        ...state,
        loadingBook: false,
      };
    case DELETE_BOOK:
      return {
        ...state,
        loadingBook: false,
      };
    case DELETE_PDF:
      return {
        ...state,
        loadingBook: false,
      };
    case DELETE_THUMBNAIL:
      return {
        ...state,
        loadingBook: false,
      };
    default:
      return state;
  }
};
