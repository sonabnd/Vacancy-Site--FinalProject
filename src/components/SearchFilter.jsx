import { useContext, useEffect } from "react";
import "../css/SearchFilter.css";
import { CiSearch } from "react-icons/ci";
import { FaFilter } from "react-icons/fa";
import Context from "../context/context";
import { IoMdClose } from "react-icons/io";

const SearchFilter = () => {
  const { searchInput, setSearchInput,postCard,setPostCard,filterContainer, showHideFilter,originalPostCard,setOriginalPostCard } = useContext(Context);
  

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
        <div className="input-container">
          <CiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Sayt üzrə axtarış"
            value={searchInput}
            onChange={getValueInput}
          />
        </div>
        <div className="search-filter" onClick={showHideFilter}>
          <span className="search-label"></span>
          <span  >
            {filterContainer ? <IoMdClose className="filter-icon" style={{color : "red", fontSize : "16px"}} /> : <FaFilter className="filter-icon" />}
          </span>
          <span className="filter-text" style={{color : filterContainer ? "red" : "#0C4DDE"}} >{filterContainer ? "Bağla" : "Filterlər"}</span>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
