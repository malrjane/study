import {
  call,
  delay,
  put,
  select,
  takeLeading,
} from "redux-saga/effects";

import {
  loadRequested,
  loadSucceeded,
} from "./newsSlice";

const API_URL = "http://localhost:7070/api/news";

function fetchNews(lastSeenId) {
  const url = new URL(API_URL);

  if (lastSeenId !== null) {
    url.searchParams.set("lastSeenId", lastSeenId);
  }

  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    return response.json();
  });
}

function* loadNewsWorker() {
  const { items, hasMore } = yield select(
    (state) => state.news
  );

  if (!hasMore) {
    return;
  }

  const lastSeenId =
    items.length > 0
      ? items[items.length - 1].id
      : null;

  while (true) {
    try {
      const news = yield call(fetchNews, lastSeenId);

      yield put(loadSucceeded(news));

      break;
    } catch (error) {
      console.error("Ошибка запроса. Повтор через 3 секунды:", error);

      yield delay(3000);
    }
  }
}

export function* watchNews() {
  yield takeLeading(loadRequested.type, loadNewsWorker);
}