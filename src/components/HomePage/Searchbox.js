import React, { useEffect, useState, useCallback } from "react";
import _ from "lodash";
import { useDispatch } from "react-redux";
import {
  updateCurrentPage,
  updateKeyword,
} from "../../redux/slices/searchbookSlice";
import { searchbookApi } from "../../apis/searchbookApi";

const Searchbox = () => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const cachedDebouncedFn = useCallback(
    _.debounce((input) => {
      if (input.trim() === "") return;
      searchbookApi(input, 1, 10).then((res) => {
        setSuggestions(res?.data?.items || []);
      });
    }, 500),
    []
  );

  useEffect(() => {
    if (showSuggestions) {
      cachedDebouncedFn(input);
    }

    if (input.trim() === "") {
      setError("Please enter a word to search");
    } else {
      setError("");
    }
  }, [input, showSuggestions]);

  const handleChange = (e) => {
    if (e.target.value.trim() === "") {
      setShowSuggestions(false);
    } else {
      setShowSuggestions(true);
    }
    setInput((prev) => {
      return e.target.value;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateKeyword(input));
    dispatch(updateCurrentPage(1));
  };
  const onFocus = () => {
    setShowSuggestions(true);
  };
  const onBlur = () => {
    setShowSuggestions(false);
  };
  const handleClickSuggestion = (title) => {
    dispatch(updateKeyword(title));
    setInput(title);
  };

  return (
    <form className="searchbook-form">
      <div className="search-and-suggest">
        <div className="search-and-submit">
          <input
            value={input}
            onChange={handleChange}
            onFocus={onFocus}
            onBlur={onBlur}
          />
          <button onClick={handleSubmit}>submit</button>
        </div>

        {showSuggestions && (
          <div>
            <ul className="suggestions">
              {suggestions.map((item) => {
                return (
                  <li
                    key={item.id}
                    onMouseDown={() =>
                      handleClickSuggestion(item?.volumeInfo?.title || "")
                    }
                  >
                    {item?.volumeInfo?.title || ""}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
      <p>{error}</p>
    </form>
  );
};

export default Searchbox;
