import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { clearMovies, searchMovies } from "../redux/moviesSlice";

import MovieCard from "../components/MovieCard";

export default function SearchPage() {
  const dispatch = useAppDispatch();

  const [query, setQuery] = useState("");

  const { movies, loading, error, hasSearched } = useAppSelector(
    (state) => state.movies
  );

  useEffect(() => {
    if (!query.trim()) {
      dispatch(clearMovies());
      return;
    }

    const timer = setTimeout(() => {
      dispatch(searchMovies(query));
    }, 500);

    return () => clearTimeout(timer);
  }, [query, dispatch]);

  const handleSearch = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQuery(event.target.value);
  };

  return (
    <main>
      <h1>Поиск фильмов</h1>

      <input
        type="text"
        placeholder="Введите название фильма..."
        value={query}
        onChange={handleSearch}
      />

      {loading && <p className="loader">Загрузка...</p>}

      {error && <p className="error">{error}</p>}

      {!loading && !error && hasSearched && movies.length === 0 && (
        <p>Фильмы не найдены</p>
      )}

      <div className="movies-grid">
        {!loading &&
          movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
            />
          ))}
      </div>
    </main>
  );
}