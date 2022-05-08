import { createSlice } from "@reduxjs/toolkit";

export const wishlistSlice = createSlice({
  name: "wishlistSlice",
  initialState: {
    wishlist: JSON.parse(localStorage.getItem("wishlist") || "[]"),
  },

  reducers: {
    loadWishlist: (state, action) => {
      state.wishlist = action.payload;
    },
    addWishlist: (state, action) => {
      const prev = state.wishlist;
      const bookMap = {};
      const newWishlist = [action.payload, ...prev];
      // ensure unique books in the wishlist
      newWishlist.forEach((book) => {
        bookMap[book.id] = book;
      });
      state.wishlist = Object.values(bookMap);
    },
    deleteWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { loadWishlist, addWishlist, deleteWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
