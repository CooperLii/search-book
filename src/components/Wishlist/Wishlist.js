import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../components/Pagination/Pagination";
import {
  changePage,
  deleteBookFromWishlist,
  nextPage,
  prevPage,
} from "../../redux/slices/wishlistSlice";

const Wishlist = () => {
  const dispatch = useDispatch();

  const wishlist = useSelector((state) => state.wishlistSlice.wishlist);
  const wishlistForCurPage = useSelector(
    (state) => state.wishlistSlice.wishlistForCurPage
  );
  const itemsPerPage = useSelector((state) => state.wishlistSlice.itemsPerPage);
  const currentPage = useSelector((state) => state.wishlistSlice.currentPage);
  const totalItems = wishlist.length;
  const totalPages = useSelector((state) => state.wishlistSlice.totalPages);

  const handleDeleteWishlist = (id) => {
    dispatch(deleteBookFromWishlist(id));
  };

  const handleClickNext = () => {
    dispatch(nextPage());
  };
  const handleClickPrev = () => {
    dispatch(prevPage());
  };
  const handleClickPage = (targetPage) => {
    dispatch(changePage(targetPage));
  };

  return (
    <div className="wishlist-section">
      <div className="wishlist-header">
        <h3 style={{ display: "inline" }}>Wishlist</h3>
        <h4 style={{ display: "inline" }}>{wishlist.length} books</h4>
      </div>
      <Pagination
        itemsPerPage={itemsPerPage}
        handleClickNext={handleClickNext}
        handleClickPage={handleClickPage}
        handleClickPrev={handleClickPrev}
        currentPage={currentPage}
        totalItems={totalItems}
        totalPages={totalPages}
      >
        <ul className="wishlist">
          {wishlistForCurPage.map((book) => {
            return (
              <li key={book?.id}>
                <span>
                  {book?.volumeInfo?.title === undefined
                    ? "N/A"
                    : book?.volumeInfo?.title}
                </span>
                <button
                  className="btn-delete"
                  onClick={() => {
                    handleDeleteWishlist(book.id);
                  }}
                >
                  delete
                </button>
              </li>
            );
          })}
        </ul>
      </Pagination>
    </div>
  );
};

export default Wishlist;
