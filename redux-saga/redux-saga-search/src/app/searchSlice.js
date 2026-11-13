import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  query: "",
  items: [],
  loading: false,
  error: null,
};

const searchSlice = createSlice({
  name: "search",

  initialState,

  reducers: {
    queryChanged(state, action) {
      state.query = action.payload;
      state.items = [];
      state.loading = action.payload.trim() !== "";
      state.error = null;
    },

    searchSucceeded(state, action) {
      state.items = action.payload;
      state.loading = false;
    },

    searchFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  queryChanged,
  searchSucceeded,
  searchFailed,
} = searchSlice.actions;

export default searchSlice.reducer;