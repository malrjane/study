import { configureStore } from "@reduxjs/toolkit";
import { createEpicMiddleware } from "redux-observable";

import servicesReducer from "../services/servicesSlice";
import { rootEpic } from "../services/servicesEpic";

const epicMiddleware = createEpicMiddleware();

export const store = configureStore({
  reducer: {
    services: servicesReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(epicMiddleware),
})

epicMiddleware.run(rootEpic);