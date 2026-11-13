import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchMovieById } from "../redux/moviesSlice";
import { addFavorite } from "../redux/favoritesSlice";

export default function MovieDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const dispatch = useAppDispatch();

  const { selectedMovie, detailsLoading, detailsError } =
    useAppSelector((state) => state.movies);

  const isFavorite = useAppSelector((state) =>
    state.favorites.movies.some(
      (movie) => movie.imdbID === id
    )
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchMovieById(id));
    }
  }, [id, dispatch]);

  const handleAddFavorite = () => {
    if (selectedMovie && !isFavorite) {
      dispatch(addFavorite(selectedMovie));
    }
  };

  if (detailsLoading) {
    return <p className="loader">Загрузка фильма...</p>;
  }

  if (detailsError) {
    return <p className="error">{detailsError}</p>;
  }

  if (!selectedMovie) {
    return <p>Фильм не найден</p>;
  }

  return (
    <main className="details-page">
      <Link to="/">← Назад к поиску</Link>

      <div className="movie-details">
        {selectedMovie.Poster !== "N/A" ? (
          <img
            src={selectedMovie.Poster}
            alt={selectedMovie.Title}
          />
        ) : (
          <div className="no-poster">Нет постера</div>
        )}

        <div>
          <h1>{selectedMovie.Title}</h1>

          <p><strong>Год:</strong> {selectedMovie.Year}</p>
          <p><strong>Жанр:</strong> {selectedMovie.Genre}</p>
          <p><strong>Продолжительность:</strong> {selectedMovie.Runtime}</p>
          <p><strong>Режиссёр:</strong> {selectedMovie.Director}</p>
          <p><strong>Актёры:</strong> {selectedMovie.Actors}</p>
          <p><strong>Рейтинг IMDb:</strong> {selectedMovie.imdbRating}</p>
          <p><strong>Описание:</strong> {selectedMovie.Plot}</p>

          <button
            onClick={handleAddFavorite}
            disabled={isFavorite}
          >
            {isFavorite
              ? "Уже в избранном"
              : "Добавить в избранное"}
          </button>
        </div>
      </div>
    </main>
  );
}