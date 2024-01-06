// components redux
import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import { thunk } from "redux-thunk";
// import logger from "redux-logger";

import { API } from "../config/api";

// components reducers
import { BookReducer } from "./reducer/BookReducer";
// ----------------------------------------------------------

const rootreducer = combineReducers({ book: BookReducer });

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
