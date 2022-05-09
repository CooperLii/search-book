import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementCurrentPage,
  incrementCurrentPage,
  updateCurrentPage,
} from "../../redux/slices/searchbookSlice";

import ReactPaginate from "react-paginate";
import "./Pagination.css";
// const Pagination = ({ children, itemsPerPage }) => {

//   const currentPage = useSelector((state) => state.searchbookSlice.currentPage);
//   const totalItems = useSelector((state) => state.searchbookSlice.totalItems);

//   const dispatch = useDispatch();

//   const totalPages = Math.ceil(totalItems / itemsPerPage);
//   const handleClickPrev = () => {
//     if (currentPage <= 1) {
//       return;
//     }
//     dispatch(decrementCurrentPage());
//   };

//   const handleClickNext = () => {
//     if (currentPage >= totalPages) {
//       return;
//     }
//     dispatch(incrementCurrentPage());
//   };
//     return (
//       <div>
//         {children}
//         <div>
//           {totalPages > 1 && (
//             <>
//               <button disabled={currentPage <= 1} onClick={handleClickPrev}>
//                 Prev
//               </button>
//               <span>{currentPage}</span>
//               <button
//                 disabled={currentPage >= totalPages}
//                 onClick={handleClickNext}
//               >
//                 Next
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     );

// };

// export default Pagination;

/** const Pagination = ({ children, itemsPerPage }) => {
  const currentPage = useSelector((state) => state.searchbookSlice.currentPage);
  const totalItems = useSelector((state) => state.searchbookSlice.totalItems);
  const searchResult = useSelector(
    (state) => state.searchbookSlice.searchResult
  );

  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    dispatch(updateCurrentPage(Number(event.target.id)));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchResult.slice(indexOfFirstItem, indexOfLastItem);

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={currentPage === number ? "active" : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  const handleNextbtn = () => {
    dispatch(incrementCurrentPage());

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    dispatch(decrementCurrentPage());

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
  }

  return (
    <div>
      {children}
      <ul className="pageNumbers">
        <li>
          <button
            onClick={handlePrevbtn}
            disabled={currentPage === pages[0] ? true : false}
          >
            Prev
          </button>
        </li>
        {pageDecrementBtn}
        {renderPageNumbers}
        {pageIncrementBtn}

        <li>
          <button
            onClick={handleNextbtn}
            disabled={currentPage === pages[pages.length - 1] ? true : false}
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination; **/

const Pagination = ({ children, itemsPerPage }) => {
  const currentPage = useSelector((state) => state.searchbookSlice.currentPage);
  const totalItems = useSelector((state) => state.searchbookSlice.totalItems);

  const dispatch = useDispatch();

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleClickPage = (e) => {
    dispatch(updateCurrentPage(e.selected + 1));
  };

  return (
    <div className="pagination__container">
      {children}

      <ReactPaginate
        previousLabel="<"
        nextLabel=">"
        pageCount={totalPages}
        onPageChange={handleClickPage}
        pageRangeDisplayed={4}
        marginPagesDisplayed={1}
        pageClassName="page-item"
        breakLabel="..."
        containerClassName="pagination"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default Pagination;
