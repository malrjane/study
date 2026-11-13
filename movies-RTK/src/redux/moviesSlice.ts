import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { MovieShort, MovieFull } from "../types";

const API_KEY = "64405bd2";
const BASE_URL = "https://www.omdbapi.com/";

interface SearchResponse {
  Search?: MovieShort[];
  Response: string;
  Error?: string;
}

interface DetailsResponse extends MovieFull {
  Response: string;
  Error?: string;
}

interface MoviesState {
  movies: MovieShort[];
  selectedMovie: MovieFull | null;
  loading: boolean;
  detailsLoading: boolean;
  error: string | null;
  detailsError: string | null;
  hasSearched: boolean;
}

const initialState: MoviesState = {
  movies: [],
  selectedMovie: null,
  loading: false,
  detailsLoading: false,
  error: null,
  detailsError: null,
  hasSearched: false,
};

export const searchMovies = createAsyncThunk(
  "movies/searchMovies",
  async (query: string): Promise<MovieShort[]> => {
    const params = new URLSearchParams({
      apikey: API_KEY,
      s: query,
      type: "movie",
    });

    const response = await fetch(`${BASE_URL}?${params}`);

    if (!response.ok) {
      throw new Error("Ошибка соединения с сервером");
    }

    const data: SearchResponse = await response.json();

    if (data.Response === "False") {
      if (data.Error === "Movie not found!") {
        return [];
      }

      throw new Error(data.Error || "Ошибка поиска");
    }

    return data.Search ?? [];
  },
);

export const fetchMovieById = createAsyncThunk(
  "movies/fetchMovieById",
  async (id: string): Promise<MovieFull> => {
    const params = new URLSearchParams({
      apikey: API_KEY,
      i: id,
      plot: "full",
    });

    const response = await fetch(`${BASE_URL}?${params}`);

    if (!response.ok) {
      throw new Error("Ошибка соединения с сервером");
    }

    const data: DetailsResponse = await response.json();

    if (data.Response === "False") {
      throw new Error(data.Error || "Фильм не найден");
    }

    return data;
  },
);

const moviesSlice = createSlice({
  name: "movies",
  initialState,

  reducers: {
    clearMovies: (state) => {
      state.movies = [];
      state.error = null;
        state.hasSearched = false;

    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(searchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.hasSearched = false;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
        state.hasSearched = true;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.loading = false;
        state.hasSearched = false;

        state.movies = [];
        state.error = action.error.message || "Ошибка поиска";
      })

      .addCase(fetchMovieById.pending, (state) => {
        state.detailsLoading = true;
        state.detailsError = null;
        state.selectedMovie = null;
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.detailsLoading = false;
        state.selectedMovie = action.payload;
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.detailsLoading = false;
        state.detailsError = action.error.message || "Ошибка загрузки фильма";
      });
  },
});

export const { clearMovies } = moviesSlice.actions;

export default moviesSlice.reducer;
