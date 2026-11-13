import { useAppSelector } from "../redux/hooks";
import MovieCard from "../components/MovieCard";

export default function FavoritesPage() {
  const favorites = useAppSelector(
    (state) => state.favorites.movies
  );

  return (
    <main>
      <h1>Избранные фильмы</h1>

      {favorites.length === 0 ? (
        <p>Вы ещё не добавили ни одного фильма.</p>
      ) : (
        <div className="movies-grid">
          {favorites.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
            />
          ))}
        </div>
      )}
    </main>
  );
}