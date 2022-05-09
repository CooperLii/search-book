import React from "react";
import BookInfo from "./BookInfo";
import { useSelector } from "react-redux";

const SearchResult = () => {
  const items = useSelector((state) => state.searchbookSlice.searchResult);

  return (
    <div>
      <h3>Book List</h3>
      <ul className="book-result-list">
        {items.length === 0 ? (
          <h3 style={{ color: "red" }}>No books found!</h3>
        ) : (
          items.map((item) => <BookInfo key={item.id} item={item} />)
        )}
      </ul>
    </div>
  );
};

export default SearchResult;
