import React, { useState } from "react";
import { updateKeyword } from "../../redux/slices/searchbookSlice";
import { useDispatch } from "react-redux";

const SuggestionsList = ({
  setInput,
  setShowSuggestions,
  filteredSuggestions,
  setFilteredSuggestions,
}) => {
  const dispatch = useDispatch();
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);

  const handleClickForSuggestions = (e) => {
    // e.preventDefault();
    setFilteredSuggestions([]);
    setInput(e.target.innerText);
    //dispatch(updateKeyword(e.target.innerText));
    console.log(e.target.innerText);
    setActiveSuggestionIndex(0);
    setShowSuggestions(false);
  };

  return filteredSuggestions?.length ? (
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
            onMouseDown={handleClickForSuggestions}
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

export default SuggestionsList;
