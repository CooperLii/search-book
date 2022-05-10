import React, { useEffect, useState, useCallback } from "react";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCurrentPage,
  updateKeyword,
  updateTotalItems,
} from "../../redux/slices/searchbookSlice";
import { searchbookApi } from "../../apis/searchbookApi";
import axios from "axios";
import SuggestionsList from "./SuggestionsList";

const Searchbox = () => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  // const searchResult = useSelector(
  //   (state) => state.searchbookSlice.searchResult
  // );

  const cachedDebouncedFn = useCallback(
    _.debounce((input) => {
      (async () => {
        // const res = await searchbookApi(input, 1, 30);
        const res = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=intitle:${input}&startIndex=0&maxResults=10`
        );
        console.log("fetched");
        const suggestions = res.data?.items?.map((item) => {
          return item.volumeInfo.title;
        });

        let filtered = await Promise.all(
          suggestions?.filter((suggestion) =>
            suggestion?.toLowerCase().includes(input.toLowerCase())
          )
        ).catch((error) => {
          console.error(error.message);
        });
        console.log("suggestions number", filtered.length);
        setFilteredSuggestions(filtered);
        setShowSuggestions(true);
      })();

      dispatch(updateKeyword(input));
      dispatch(updateCurrentPage(1));
    }, 700),

    [dispatch]
  );

  useEffect(() => {
    if (input !== "") {
      cachedDebouncedFn(input);
      setError("");
    } else {
      setError("Please enter a keyword to search!");
    }
  }, [input, cachedDebouncedFn]);

  const handleChange = async (e) => {
    setInput((prev) => {
      return e.target.value;
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (input !== "") {
      dispatch(updateKeyword(input));
    }
    dispatch(updateCurrentPage(1));
  };
  const onFocus = () => {
    setShowSuggestions(true);
  };
  const onBlur = () => {
    setShowSuggestions(false);
  };

  return (
    <form className="searchbook-form">
      <div className="search-and-suggest">
        <input
          value={input}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        <button onClick={handleClick}>submit</button>
        {showSuggestions && input && (
          <SuggestionsList
            setShowSuggestions={setShowSuggestions}
            setInput={setInput}
            filteredSuggestions={filteredSuggestions}
            setFilteredSuggestions={setFilteredSuggestions}
          />
        )}
      </div>

      <p>{error}</p>
    </form>
  );
};

export default Searchbox;
