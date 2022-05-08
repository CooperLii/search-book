import React, { useEffect, useState, useCallback } from "react";
import _ from "lodash";
import { useDispatch } from "react-redux";
import {
  updateCurrentPage,
  updateKeyword,
} from "../../redux/slices/searchbookSlice";

const Searchbox = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const cachedDebouncedFn = useCallback(
    _.debounce((input) => {
      dispatch(updateKeyword(input));
      dispatch(updateCurrentPage(1));
    }, 2000),
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
    dispatch(updateKeyword(input));
    dispatch(updateCurrentPage(1));
  };

  return (
    <form className="searchbook-form">
      <input value={input} onChange={handleChange} />
      <button onClick={handleClick}>submit</button>
      <p>{error}</p>
    </form>
  );
};

export default Searchbox;
