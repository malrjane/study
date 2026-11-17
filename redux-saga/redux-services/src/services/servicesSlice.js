import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  details: null,

  listLoading: false,
  detailsLoading: false,

  listError: null,
  detailsError: null,
};

const servicesSlice = createSlice({
  name: "services",

  initialState,

  reducers: {
    fetchServicesRequest(state) {
      state.listLoading = true;
      state.listError = null;
    },

    fetchServicesSuccess(state, action) {
      state.listLoading = false;
      state.list = action.payload;
    },

    fetchServicesFailure(state, action) {
      state.listLoading = false;
      state.listError = action.payload;
    },

    fetchDetailsRequest(state) {
      state.detailsLoading = true;
      state.detailsError = null;
      state.details = null;
    },

    fetchDetailsSuccess(state, action) {
      state.detailsLoading = false;
      state.details = action.payload;
    },

    fetchDetailsFailure(state, action) {
      state.detailsLoading = false;
      state.detailsError = action.payload;
    },
  },
});

export const {
  fetchServicesRequest,
  fetchServicesSuccess,
  fetchServicesFailure,
  fetchDetailsRequest,
  fetchDetailsSuccess,
  fetchDetailsFailure,
} = servicesSlice.actions;

export default servicesSlice.reducer;