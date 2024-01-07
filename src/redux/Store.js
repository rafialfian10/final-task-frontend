// components redux
import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import { thunk } from "redux-thunk";
// import logger from "redux-logger";

import { API } from "../config/api";

// components reducers
import { BookReducer } from "./reducer/BookReducer";
import { TransactionReducer } from "./reducer/TransactionReducer";
// ----------------------------------------------------------

const rootreducer = combineReducers({
  book: BookReducer,
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
