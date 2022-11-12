import React, { useState, useEffect } from "react";

const [SearchText, setSearchTesxt] = useState("");
const [filteredbook, setfilteredBook] = useState(null);

useEffect(() => {
  const fitered = filteredbook.filter((item) =>
    item.name.toLowerCase().includes(SearchText)
  );
  setfilteredBook(fitered);
 
}, [SearchText]);

const Search = (props) => {
  return (
    <div>
      {
        filteredbook.map
      }
      <form className="d-flex">
        <input
          value={SearchText}
          onChange={(event) => setSearchTesxt(event.target.value)}
          className="form-control me-2 "
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button className="btn btn-outline-warning" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
