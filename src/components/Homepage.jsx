import { useContext, useState, useEffect } from "react";
import SearchFilter from "./SearchFilter";
import "../css/Homepage.css";
import HomepageCard from "./HomepageCard";
import Context from "../context/context";

const Homepage = () => {

  const { postCard, setPostCard, filterContainer, setOriginalPostCard, originalPostCard } = useContext(Context);


  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('');
  const [selectedSalary , setSelectedSalary] = useState('')

  useEffect(() => {

    if (originalPostCard.length === 0) {
      setOriginalPostCard(postCard);
    }
  }, [postCard, originalPostCard, setOriginalPostCard]);

  const singlePositions = [...new Set(originalPostCard.map(post => post.position))];
  const singleLocations = [...new Set(originalPostCard.map(post => post.location))];

  const searchVacancy = () => {
  const filteredCards = originalPostCard.filter(card => {
    const locationMatch = selectedLocation ? card.location === selectedLocation : true;
    const positionMatch = selectedPosition ? card.position === selectedPosition : true;


    let salaryMatch = true; 
    const salary = parseInt(card.salary); 

    if (isNaN(salary)) {
      salaryMatch = true;
    } else {
      if (selectedSalary === "0-500") {
        salaryMatch = salary < 500;
      } else if (selectedSalary === "500-1000") {
        salaryMatch = salary >= 500 && salary <= 1000;
      } else if (selectedSalary === "1000-1500") {
        salaryMatch = salary > 1000 && salary <= 1500;
      } else if (selectedSalary === "1500-2000") {
        salaryMatch = salary > 1500 && salary <= 2000;
      } else if (selectedSalary === "2000+") {
        salaryMatch = salary > 2000;
      }
    }

    return locationMatch && positionMatch && salaryMatch;
  });

  setPostCard(filteredCards.length ? filteredCards : []);
};

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
          <select name="" id="" onChange={e=>setSelectedSalary(e.target.value)}>
            <option value="">Maaş</option>
            <option value="0-500">0-500</option>
            <option value="500-1000">500-1000</option>
            <option value="1000-1500">1000-1500</option>
            <option value="1500-2000">1500-2000</option>
            <option value="2000+">2000+</option>
          </select>
          <select name="" id="" onChange={e => setSelectedLocation(e.target.value)}>
            <option value="">Ərazi</option>
            {singleLocations.map((location, index) => (
              <option value={location} key={index}>{location}</option>
            ))}
            {
              singleLocations.map((location, index) => (
                <option value={location} key={index}>{location}</option>
              ))
            }
          </select>
          <button className="search-btn" onClick={searchVacancy}>Search</button>
        </div>
          {
            postCard.map(post => (
              <div className="advertisement" key={post.id}>
                <HomepageCard post={post} />
              </div>
            ))
          }
        </div>
    </>
  );
};


export default Homepage;
