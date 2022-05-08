import React from "react";
import BookInfo from "./BookInfo";
import { useSelector } from "react-redux";

const SearchResult = () => {
  const items = useSelector((state) => state.searchbookSlice.searchResult);

  return (
    <ul>
      {items.length === 0 ? (
        <h3>No books found!</h3>
      ) : (
        items.map((item) => <BookInfo key={item.id} item={item} />)
      )}
    </ul>
  );
};

export default SearchResult;
