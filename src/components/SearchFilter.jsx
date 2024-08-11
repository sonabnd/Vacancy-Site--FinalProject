import React, { useContext, useEffect, useState } from "react";
import "../css/SearchFilter.css";
import { CiSearch } from "react-icons/ci";
import { FaFilter } from "react-icons/fa";
import Context from "../context/context";

const SearchFilter = () => {
  const { searchInput, setSearchInput, postCard, setPostCard } = useContext(Context);
  const [originalPostCard, setOriginalPostCard] = useState([]);

  useEffect(() => {
    if (postCard.length > 0 && originalPostCard.length === 0) {
      setOriginalPostCard(postCard);
    }
  }, [postCard]);

  const getValueInput = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    
    if (value === "") {
      setPostCard(originalPostCard);
    } else {
      const filtered = originalPostCard.filter((post) =>
        post.position.toLowerCase().includes(value.toLowerCase())
      );
      setPostCard(filtered);
    }
  };

  return (
    <div className="search-filter-container">
      <div className="search">
        <input
          type="text"
          placeholder="Sayt üzrə axtarış"
          value={searchInput}
          onChange={getValueInput}
        />
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
