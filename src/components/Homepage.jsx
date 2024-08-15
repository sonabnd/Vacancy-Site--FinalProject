import { useContext, useState } from "react";
import SearchFilter from "./SearchFilter";
import "../css/Homepage.css";
import { IoIosMenu } from "react-icons/io";
import HomepageCard from "./HomepageCard";
import Context from "../context/context";

const Homepage = () => {
  const { postCard, setPostCard, filterContainer, originalPostCard, setOriginalPostCard } = useContext(Context);

  const [selectedLocation, setSelectedLocation] = useState('');

  const singlePositions = [...new Set(postCard.map(post => post.position))]

  const singleLocations = [...new Set(postCard.map(post => post.location))]

  const searchVacancy = () => {
    const locationCard = postCard.filter(card => card.location == postCard.location)
    // TODO FILTER
  }
  return (
    <>
      <div className="homepage-container">
        <SearchFilter />
        <div className="filter-container" style={{ display: filterContainer ? "block" : "none" }} >
          <select name="" id="">
            <option value="">Vəzifə</option>
            {
              singlePositions.map((position, index) => (
                <option value={position} key={index}>{position}</option>
              ))
            }
          </select>
          <select name="" id="">
            <option value="">Maaş</option>
            <option value="">0-500</option>
            <option value="">500-1000</option>
            <option value="">1000-1500</option>
            <option value="">1500-2000</option>
            <option value="">2000+</option>
          </select>
          <select name="" id="" onChange={e => setSelectedLocation(e.target.value)}>
            <option value="">Ərazi</option>
            {
              singleLocations.map((location, index) => (
                <option value={location} key={index}>{location}</option>
              ))
            }
          </select>
          <button className="search-btn" onClick={searchVacancy}>Search</button>
        </div>
        <div className="advertisement-lists">
          {
            postCard.map(post => (
              <div className="advertisement" key={post.id}>
                <HomepageCard post={post} />
              </div>
            ))
          }
        </div>
      </div>
    </>
  );
};

export default Homepage;
