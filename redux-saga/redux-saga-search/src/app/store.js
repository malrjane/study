import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import searchReducer from "./searchSlice";
import { watchSearch } from "./searchSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    search: searchReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(watchSearch);