import { useContext } from "react";
import SearchFilter from "./SearchFilter";
import "../css/Homepage.css";
import { IoIosMenu } from "react-icons/io";
import HomepageCard from "./HomepageCard";
import Context from "../context/context";

const Homepage = () => {
  const {postCard} = useContext(Context);
  return (
    <>
      <div className="homepage-container">
        {/* <div className="menu">
          <div className="logo-img">
            <img src="src/img/logo.c9da023 (1).png" alt="logo" />
          </div>
          <span className="menu-icon"><IoIosMenu /></span>
        </div> */}
        <SearchFilter />
        <div className="filter-container">
          <select name="" id="">
            <option value="">Vəzifə</option>
            <option value="">Direktor</option>
            <option value="">Menecer</option>
            <option value="">Köməkçi</option>
          </select>
          <select name="" id="">
            <option value="">Maaş</option>
            <option value="">Direktor</option>
            <option value="">Menecer</option>
            <option value="">Köməkçi</option>
          </select>
          <select name="" id="">
            <option value="">Ərazi</option>
            <option value="">Direktor</option>
            <option value="">Menecer</option>
            <option value="">Köməkçi</option>
          </select>
          <button className="search-btn">Search</button>
        </div>
        <div className="advertisement-lists">
            {
              postCard.map(post=>(
                <div className="advertisement" key={post.id}>
                  <HomepageCard post={post}/>
                </div>
              ))
            }
        </div>
      </div>
    </>
  );
};

export default Homepage;

