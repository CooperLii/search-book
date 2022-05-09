import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteWishlist } from "../../redux/slices/wishlistSlice";
const Wishlist = () => {
  const dispatch = useDispatch();

  const wishlist = useSelector((state) => state.wishlistSlice.wishlist);

  return (
    <div className="wishlist-section">
      <div className="wishlist-header">
        <h3 style={{ display: "inline" }}>Wishlist</h3>
        <h4 style={{ display: "inline" }}>{wishlist.length} books</h4>
      </div>
      <ul className="wishlist">
        {wishlist.map((book) => {
          return (
            <li key={book?.id}>
              <span>{book?.volumeInfo?.title}</span>
              <button
                className="btn-delete"
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
