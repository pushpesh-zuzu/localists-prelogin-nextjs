import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const searchService = createAsyncThunk(
  "search/searchService",
  async (serviceData, { rejectWithValue }) => {
    try {
      // Dynamically import axios
      const axios = (await import("./axios")).default;
      const response = await axios.post("users/search-services", serviceData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    services: [],
    loading: false,
    error: null,
    selectedSearchService: null,
  },
  reducers: {
    setService: (state, action) => {
      state.services = action.payload;
    },
    setsearchServiceLoader: (state, action) => {
      state.loading = action.payload;
    },
    clearSearch: (state) => {
      state.services = [];
      state.error = null;
    },
    setSelectedSearchService: (state, action) => {
      state.selectedSearchService = action.payload;
    },
    clearSelectedSearchService: (state) => {
      state.selectedSearchService = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchService.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload?.data || [];
      })
      .addCase(searchService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setService,
  setsearchServiceLoader,
  clearSearch,
  setSelectedSearchService,
  clearSelectedSearchService,
} = searchSlice.actions;
export default searchSlice.reducer;
