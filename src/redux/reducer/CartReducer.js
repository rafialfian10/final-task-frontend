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
// -----------------------------------------------

const initialstateCart = {
  cartsData: [],
  cartData: {},
  loadingCart: true,
  errorMessageCart: "",
};

export const CartReducer = (state = initialstateCart, action) => {
  switch (action.type) {
    case MAKE_REQUEST:
      return {
        ...state,
        loadingCart: true,
      };
    case FAIL_REQUEST:
      return {
        ...state,
        loadingCart: false,
        errorMessageCart: action.payload,
      };
    case GET_CARTS:
      return {
        loadingCart: false,
        errorMessageCart: "",
        cartsData: action.payload,
        cartData: {},
      };
      case GET_CART:
      return {
        ...state,
        loadingCart: false,
        cartData: action.payload,
      };
    case CREATE_CART:
      return {
        ...state,
        loadingCart: false,
      };
    case UPDATE_CART:
      return {
        ...state,
        loadingCart: false,
      };
    case DELETE_CART:
      return {
        ...state,
        loadingCart: false,
      };
    default:
      return state;
  }
};
