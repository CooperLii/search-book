import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { searchbookApi } from "../../apis/searchbookApi";

export const updateKeyword = createAsyncThunk(
  "searchbookSlice/updateKeyword",
  async (keyword, { getState }) => {
    const { itemsPerPage } = getState().searchbookSlice;
    const result = await searchbookApi(keyword, 1, itemsPerPage);
    return result;
  }
);

export const changePage = createAsyncThunk(
  "searchbookSlice/changePage",
  async (targetPage, { getState, rejectWithValue }) => {
    const { totalPages, keyword, itemsPerPage } = getState().searchbookSlice;
    if (isNaN(targetPage) || targetPage < 1 || targetPage > totalPages)
      return rejectWithValue("invalid page number!");
    const result = await searchbookApi(keyword, targetPage, itemsPerPage);
    return result;
  }
);

const searchbookSlice = createSlice({
  name: "searchbookSlice",
  initialState: {
    bookList: [],
    keyword: "",
    currentPage: 1,
    totalItems: 0,
    totalPages: 1,
    itemsPerPage: 5,
    isLoading: false,
  },

  // reducers: {
  //   loadSearchResult: (state, action) => {
  //     state.searchResult = action.payload;
  //   },
  //   updateTotalItems: (state, action) => {
  //     state.totalItems = action.payload;
  //   },
  //   updateCurrentPage: (state, action) => {
  //     state.currentPage = action.payload;
  //   },
  //   incrementCurrentPage: (state) => {
  //     state.currentPage = state.currentPage + 1;
  //   },
  //   decrementCurrentPage: (state) => {
  //     state.currentPage = state.currentPage - 1;
  //   },
  //   updateKeyword: (state, action) => {
  //     state.keyword = action.payload;
  //   },
  // },

  extraReducers: {
    [updateKeyword.pending]: (state, action) => {
      const keyword = action.meta.arg;
      state.keyword = keyword;
      state.isLoading = true;
    },
    [updateKeyword.fulfilled]: (state, action) => {
      const items = action?.payload?.data?.items || [];
      const totalItems = action?.payload?.data?.totalItems || 0;
      const totalPages = Math.ceil(totalItems / state.itemsPerPage);
      state.isLoading = false;
      state.bookList = items;
      state.totalItems = totalItems;
      state.totalPages = totalPages;
      state.currentPage = 1;
    },
    [updateKeyword.rejected]: (state, action) => {
      state.isLoading = false;
      alert("request failed");
    },
    [changePage.pending]: (state, action) => {
      state.isLoading = true;
    },

    [changePage.fulfilled]: (state, action) => {
      const items = action?.payload?.data?.items || [];
      const totalItems = action?.payload?.data?.totalItems || 0;
      const totalPages = Math.ceil(totalItems / state.itemsPerPage);
      state.isLoading = false;
      state.bookList = items;
      state.totalItems = totalItems;
      state.totalPages = totalPages;
      state.currentPage = action.meta.arg;
    },
    [changePage.rejected]: (state, action) => {
      state.isLoading = false;
      alert(action.payload);
    },
  },
});

// export const {
//   loadSearchResult,
//   updateTotalItems,
//   updateCurrentPage,
//   incrementCurrentPage,
//   decrementCurrentPage,
//   updateKeyword,
// } = searchbookSlice.actions;
export default searchbookSlice.reducer;
