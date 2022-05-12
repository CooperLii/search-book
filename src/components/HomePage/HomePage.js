import React from "react";
import SearchResult from "./SearchResult";
import { useDispatch, useSelector } from "react-redux";
import { changePage } from "../../redux/slices/searchbookSlice";
import Pagination from "../Pagination/Pagination";

const HomePage = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.searchbookSlice.currentPage);
  const totalItems = useSelector((state) => state.searchbookSlice.totalItems);
  const itemsPerPage = useSelector(
    (state) => state.searchbookSlice.itemsPerPage
  );
  const totalPages = useSelector((state) => state.searchbookSlice.totalPages);
  const handleClickPrev = () => {
    dispatch(changePage(currentPage - 1));
  };

  const handleClickNext = () => {
    dispatch(changePage(currentPage + 1));
  };

  const handleClickPage = (targetPage) => {
    dispatch(changePage(targetPage));
  };

  return (
    <section className="bookList-section">
      <Pagination
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        handleClickPrev={handleClickPrev}
        handleClickNext={handleClickNext}
        totalItems={totalItems}
        currentPage={currentPage}
        handleClickPage={handleClickPage}
      >
        <SearchResult></SearchResult>
      </Pagination>
    </section>
  );
};

export default HomePage;
