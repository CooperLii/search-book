import React, { useEffect } from "react";
import "./Pagination.css";
import { useDispatch, useSelector } from "react-redux";

const Pagination = ({
  children,
  itemsPerPage,
  handleClickNext,
  handleClickPrev,
  totalItems,
  currentPage,
  handleClickPage,
  totalPages,
}) => {
  //const totalPages = Math.ceil(totalItems / itemsPerPage);
  const keyword = useSelector((state) => state.searchbookSlice.keyword);

  // useEffect(() => {
  //   console.log("Total items: " + totalItems);
  //   console.log("total pages:", totalPages);
  //   console.log("keyword", keyword);
  // }, [totalItems]);

  const renderPaginationButtons = () => {
    const prevBtnEl = (
      <button onClick={handleClickPrev} disabled={currentPage === 1}>
        Prev
      </button>
    );
    const firstPageBtnEl =
      totalPages >= 2 ? (
        <button
          disabled={currentPage === 1}
          onClick={() => {
            handleClickPage(1);
          }}
        >
          1
        </button>
      ) : (
        <></>
      );
    const leftEllipsisEl = currentPage >= 4 ? <>...</> : <></>;

    const leftNeighbourBtnEl =
      currentPage >= 3 ? (
        <button
          onClick={() => {
            handleClickPage(currentPage - 1);
          }}
        >
          {currentPage - 1}
        </button>
      ) : (
        <></>
      );
    const currentPageBtnEl =
      currentPage >= 2 && currentPage <= totalPages - 1 ? (
        <button
          disabled
          onClick={() => {
            handleClickPage(currentPage);
          }}
        >
          {currentPage}
        </button>
      ) : (
        <></>
      );
    const rightNeighbourBtnEl =
      currentPage <= totalPages - 2 ? (
        <button
          onClick={() => {
            handleClickPage(currentPage + 1);
          }}
        >
          {currentPage + 1}
        </button>
      ) : (
        <></>
      );

    const rightEllipsisEl = currentPage <= totalPages - 3 ? <>...</> : <></>;
    const lastPageBtnEl =
      totalPages >= 2 ? (
        <button
          disabled={currentPage === totalPages}
          onClick={() => {
            handleClickPage(totalPages);
          }}
        >
          {totalPages}
        </button>
      ) : (
        <></>
      );
    const nextBtnEl = (
      <button onClick={handleClickNext} disabled={currentPage === totalPages}>
        Next
      </button>
    );

    return (
      <>
        {prevBtnEl}
        {firstPageBtnEl}
        {leftEllipsisEl}
        {leftNeighbourBtnEl}
        {currentPageBtnEl}
        {rightNeighbourBtnEl}
        {rightEllipsisEl}
        {lastPageBtnEl}
        {nextBtnEl}
      </>
    );
  };
  return (
    <div className="pagination__container">
      {children}
      <div className="pagination__button-set">
        {totalItems > 0 && renderPaginationButtons()}
      </div>
    </div>
  );
};

export default Pagination;
