import {
  delay,
  put,
  takeLatest,
} from "redux-saga/effects";

import {
  queryChanged,
  searchSucceeded,
  searchFailed,
} from "./searchSlice";

const data = [
  "Game",
  "Football",
  "Game football",
  "Food",
  "Books",
  "Shopping",
  "Books shopping",
  "Maps",
];

function* searchWorker(action) {
  const query = action.payload.trim();

  if (!query) {
    return;
  }

  try {
    yield delay(500);

    const results = data.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );

    yield put(searchSucceeded(results));
  } catch (error) {
    yield put(searchFailed(error.message));
  }
}

export function* watchSearch() {
  yield takeLatest(queryChanged.type, searchWorker);
}