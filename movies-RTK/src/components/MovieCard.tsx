import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addFavorite, removeFavorite } from "../redux/favoritesSlice";
import type { MovieShort } from "../types";

interface MovieCardProps {
  movie: MovieShort;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const dispatch = useAppDispatch();

  const isFavorite = useAppSelector((state) =>
    state.favorites.movies.some(
      (item) => item.imdbID === movie.imdbID
    )
  );

  const handleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(movie.imdbID));
    } else {
      dispatch(addFavorite(movie));
    }
  };

  return (
    <article className="movie-card">
      <Link to={`/movie/${movie.imdbID}`}>
        {movie.Poster !== "N/A" ? (
          <img src={movie.Poster} alt={movie.Title} />
        ) : (
          <div className="no-poster">Нет постера</div>
        )}

        <h3>{movie.Title}</h3>
      </Link>

      <p>Год: {movie.Year}</p>

      <button onClick={handleFavorite}>
        {isFavorite
          ? "Удалить из избранного"
          : "Добавить в избранное"}
      </button>
    </article>
  );
}