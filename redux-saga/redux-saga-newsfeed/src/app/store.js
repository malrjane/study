import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import newsReducer from "../features/newsSlice";
import { watchNews } from "../features/newsSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    news: newsReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(watchNews);