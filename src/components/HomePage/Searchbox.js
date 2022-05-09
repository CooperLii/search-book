import React, { useEffect, useState, useCallback } from "react";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCurrentPage,
  updateKeyword,
} from "../../redux/slices/searchbookSlice";
import { searchbookApi } from "../../apis/searchbookApi";
import axios from "axios";

const Searchbox = () => {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const searchResult = useSelector(
    (state) => state.searchbookSlice.searchResult
  );

  const cachedDebouncedFn = useCallback(
    _.debounce((input) => {
      (async () => {
        const res = await searchbookApi(input, 1, 30);

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

  //   useEffect(() => {
  //     const userInput = input; // Filter suggestions that don't contain the user's input
  //     const unLinked = suggestions.filter((suggestion) =>
  //       suggestion?.toLowerCase().includes(userInput?.toLowerCase())
  //     );

  //     console.log("unLinked", unLinked);

  //     setFilteredSuggestions(unLinked);
  //     setActiveSuggestionIndex(0);
  //   }, [searchResult]);

  const handleClickForSuggestions = (e) => {
    e.preventDefault();
    setFilteredSuggestions([]);
    setInput(e.target.innerText);
    console.log("hello");
    console.log(e.target.innerText);
    setActiveSuggestionIndex(0);
    setShowSuggestions(false);
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

  const SuggestionsListComponent = () => {
    return filteredSuggestions.length ? (
      <ul className="suggestions">
        {filteredSuggestions.map((suggestion, index) => {
          let className;
          // Flag the active suggestion with a class
          if (index === activeSuggestionIndex) {
            className = "suggestion-active";
          }
          return (
            <li
              className={className}
              key={index}
              onClick={handleClickForSuggestions}
            >
              {suggestion}
            </li>
          );
        })}
      </ul>
    ) : (
      <div className="no-suggestions">
        <em>No suggestions</em>
      </div>
    );
  };

  return (
    <form className="searchbook-form">
      <div className="search-and-suggest">
        <input
          value={input}
          onChange={handleChange}
          onFocus={onFocus}
          //onBlur={onBlur}
        />
        <button onClick={handleClick}>submit</button>
        {showSuggestions && input && <SuggestionsListComponent />}
      </div>

      <p>{error}</p>
    </form>
  );
};

export default Searchbox;
