// components redux
import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import { thunk } from "redux-thunk";
// import logger from "redux-logger";

import { API } from "../config/api";

// components reducers
import { UserReducer } from "./reducer/UserReducer";
import { BookReducer } from "./reducer/BookReducer";
import { BookPromoReducer } from "./reducer/BookPromoReducer";
import { TransactionReducer } from "./reducer/TransactionReducer";
import { CartReducer } from "./reducer/CartReducer";
// ----------------------------------------------------------

const rootreducer = combineReducers({
  user: UserReducer,
  book: BookReducer,
  bookPromo: BookPromoReducer,
  cart: CartReducer,
  transaction: TransactionReducer,
});

const Store = configureStore({
  reducer: rootreducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: API,
      },
    }),
});

export default Store;
