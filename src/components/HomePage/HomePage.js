import React, { useEffect } from "react";
import Searchbox from "./Searchbox";
import SearchResult from "./SearchResult";
import { searchbookApi } from "../../apis/searchbookApi";
import { useDispatch, useSelector } from "react-redux";
import {
  loadSearchResult,
  updateTotalItems,
} from "../../redux/slices/searchbookSlice";
import Pagination from "../Pagination/Pagination";

const HomePage = () => {
  const dispatch = useDispatch();

  const keyword = useSelector((state) => state.searchbookSlice.keyword);
  const currentPage = useSelector((state) => state.searchbookSlice.currentPage);
  //const totalItems = useSelector((state) => state.searchbookSlice.totalItems);

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
      <Pagination itemsPerPage={5}>
        <SearchResult></SearchResult>
      </Pagination>
    </section>
  );
};

export default HomePage;
