import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementCurrentPage,
  incrementCurrentPage,
} from "../../redux/slices/searchbookSlice";

const Pagination = ({ children, itemsPerPage }) => {
  const currentPage = useSelector((state) => state.searchbookSlice.currentPage);
  const totalItems = useSelector((state) => state.searchbookSlice.totalItems);

  const dispatch = useDispatch();

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const handleClickPrev = () => {
    if (currentPage <= 1) {
      return;
    }
    dispatch(decrementCurrentPage());
  };

  const handleClickNext = () => {
    if (currentPage >= totalPages) {
      return;
    }
    dispatch(incrementCurrentPage());
  };
  return (
    <div>
      {children}
      <div>
        {totalPages > 1 && (
          <>
            <button disabled={currentPage <= 1} onClick={handleClickPrev}>
              Prev
            </button>
            <span>{currentPage}</span>
            <button
              disabled={currentPage >= totalPages}
              onClick={handleClickNext}
            >
              Next
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Pagination;
