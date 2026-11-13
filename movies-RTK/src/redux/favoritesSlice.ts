import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { MovieShort } from "../types";

interface FavoritesState {
  movies: MovieShort[];
}

const initialState: FavoritesState = {
  movies: [],
};

const favoritesSlice = createSlice({
  name: "favorites",

  initialState,

  reducers: {
    addFavorite: (state, action: PayloadAction<MovieShort>) => {
      const exists = state.movies.some(
        (movie) => movie.imdbID === action.payload.imdbID
      );

      if (!exists) {
        state.movies.push(action.payload);
      }
    },

    removeFavorite: (state, action: PayloadAction<string>) => {
      state.movies = state.movies.filter(
        (movie) => movie.imdbID !== action.payload
      );
    },
  },
});

export const { addFavorite, removeFavorite } =
  favoritesSlice.actions;

  export default favoritesSlice.reducer;