import { createSlice } from "@reduxjs/toolkit";

export const searchbookSlice = createSlice({
  name: "searchbookSlice",
  initialState: {
    searchResult: [],
    totalItems: 0,
    currentPage: 1,
    keyword: "",
  },

  reducers: {
    loadSearchResult: (state, action) => {
      state.searchResult = action.payload;
    },
    updateTotalItems: (state, action) => {
      state.totalItems = action.payload;
    },
    updateCurrentPage: (state, action) => {
      console.log(state.currentPage);
      state.currentPage = action.payload;
    },
    incrementCurrentPage: (state) => {
      state.currentPage = state.currentPage + 1;
    },
    decrementCurrentPage: (state) => {
      state.currentPage = state.currentPage - 1;
    },
    updateKeyword: (state, action) => {
      state.keyword = action.payload;
    },
  },
});

export const {
  loadSearchResult,
  updateTotalItems,
  updateCurrentPage,
  incrementCurrentPage,
  decrementCurrentPage,
  updateKeyword,
} = searchbookSlice.actions;
export default searchbookSlice.reducer;
