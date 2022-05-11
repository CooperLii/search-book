import React, { useEffect } from "react";
import SearchResult from "./SearchResult";
import { searchbookApi } from "../../apis/searchbookApi";
import { useDispatch, useSelector } from "react-redux";
import {
  loadSearchResult,
  updateTotalItems,
  decrementCurrentPage,
  incrementCurrentPage,
  updateCurrentPage,
} from "../../redux/slices/searchbookSlice";
import Pagination from "../Pagination/Pagination";

const HomePage = () => {
  const dispatch = useDispatch();

  const keyword = useSelector((state) => state.searchbookSlice.keyword);
  const currentPage = useSelector((state) => state.searchbookSlice.currentPage);
  const totalItems = useSelector((state) => state.searchbookSlice.totalItems);
  const itemsPerPage = 5;

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

  const handleClickPage = (targetPageNumber) => {
    dispatch(updateCurrentPage(targetPageNumber));
  };

  useEffect(() => {
    (async () => {
      if (keyword === "") return;
      const result = await searchbookApi(keyword, currentPage, 5);

      if (result?.data?.totalItems !== undefined) {
        dispatch(updateTotalItems(result.data.totalItems));
      }
      if (result?.data?.items !== undefined) {
        dispatch(loadSearchResult(result.data.items));
      }

      window.scrollTo(0, 0);
    })();
  }, [currentPage, keyword]);

  return (
    <section className="bookList-section">
      <Pagination
        itemsPerPage={itemsPerPage}
        handleClickNext={handleClickNext}
        handleClickPrev={handleClickPrev}
        currentPage={currentPage}
        totalItems={totalItems}
        handleClickPage={handleClickPage}
        totalPages={totalPages}
      >
        <SearchResult></SearchResult>
      </Pagination>
    </section>
  );
};

export default HomePage;
