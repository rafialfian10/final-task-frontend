// components books type
import { MAKE_REQUEST, FAIL_REQUEST, GET_BOOKS_PROMO } from "../ActionType";
// -----------------------------------------------

const initialstateBookPromo = {
  booksPromoData: [],
  bookPromoData: {},
  loadingBookPromo: true,
  errorMessagePromo: "",
};

export const BookPromoReducer = (state = initialstateBookPromo, action) => {
  switch (action.type) {
    case MAKE_REQUEST:
      return {
        ...state,
        loadingBookPromo: true,
      };
    case FAIL_REQUEST:
      return {
        ...state,
        loadingBookPromo: false,
        errorMessagePromo: action.payload,
      };
    case GET_BOOKS_PROMO:
      return {
        loadingBookPromo: false,
        errorMessagePromo: "",
        booksPromoData: action.payload,
      };
    default:
      return state;
  }
};
