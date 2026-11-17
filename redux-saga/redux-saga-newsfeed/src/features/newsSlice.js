import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  loading: false,
  hasMore: true,
};

const newsSlice = createSlice({
  name: "news",

  initialState,

  reducers: {
    loadRequested(state) {
      state.loading = true;
    },

    loadSucceeded(state, action) {
      const newItems = action.payload;

      state.items.push(...newItems);

      state.loading = false;

      state.hasMore = newItems.length === 5;
    },
  },
});

export const {
  loadRequested,
  loadSucceeded,
} = newsSlice.actions;

export default newsSlice.reducer;