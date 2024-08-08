import React from "react";
import "../css/SearchFilter.css";
import { CiSearch } from "react-icons/ci";
import { FaFilter } from "react-icons/fa";

const SearchFilter = () => {
  return (
    <div className="search-filter-container">
      <div className="search">
        <input type="text" placeholder="Sayt üzrə axtarış" />
        <span className="search-icon">
          <CiSearch />
        </span>
        <div className="search-filter">
          <span className="search-label"></span>
          <span className="filter-icon">
            <FaFilter />
          </span>
          <span className="filter-text">Filterlər</span>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
