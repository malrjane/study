import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { loadRequested } from "../features/newsSlice";
import NewsCard from "./NewsCard";

function NewsFeed() {
  const dispatch = useDispatch();

  const { items, loading, hasMore } = useSelector(
    (state) => state.news
  );

  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      dispatch(loadRequested());
    }
  }, [dispatch]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      dispatch(loadRequested());
    }
  };

  return (
    <main className="news-feed">
      <h1>Лента новостей</h1>

      {items.map((news) => (
        <NewsCard
          key={news.id}
          news={news}
        />
      ))}

      {loading && (
        <div className="loading">
          <div className="spinner" />
          <p>Загрузка новостей...</p>
        </div>
      )}

      {!loading && hasMore && (
        <button
          className="load-more"
          onClick={handleLoadMore}
        >
          К предыдущим записям
        </button>
      )}
    </main>
  );
}

export default NewsFeed;