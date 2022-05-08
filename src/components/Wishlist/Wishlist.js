import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteWishlist } from "../../redux/slices/wishlistSlice";
const Wishlist = () => {
  const dispatch = useDispatch();

  const wishlist = useSelector((state) => state.wishlistSlice.wishlist);

  return (
    <div>
      <h3>Wishlist</h3>
      <h4>{wishlist.length} books</h4>
      <ul>
        {wishlist.map((book) => {
          return (
            <li key={book?.id}>
              <span>{book?.volumeInfo?.title}</span>
              <button
                onClick={() => {
                  dispatch(deleteWishlist(book.id));
                }}
              >
                delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Wishlist;
