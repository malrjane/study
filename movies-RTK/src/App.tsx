import { Routes, Route, NavLink } from "react-router-dom";

import SearchPage from "./pages/SearchPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import FavoritesPage from "./pages/FavoritesPage";

function App() {

  return (
   <>
      <header className="header">
        <h2>Movie Finder</h2>

        <nav>
          <NavLink to="/">Поиск</NavLink>
          <NavLink to="/favorites">Избранное</NavLink>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<SearchPage />} />

        <Route
          path="/movie/:id"
          element={<MovieDetailsPage />}
        />

        <Route
          path="/favorites"
          element={<FavoritesPage />}
        />
      </Routes>
    </>
  )
}

export default App
