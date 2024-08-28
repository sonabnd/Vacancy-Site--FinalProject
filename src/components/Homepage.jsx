import { useContext, useState, useEffect } from "react";
import SearchFilter from "./SearchFilter";
import "../css/Homepage.css";
import HomepageCard from "./HomepageCard";
import Context from "../context/context";
import axios from "axios";
import { VscSearchStop } from "react-icons/vsc";
import { Link } from "react-router-dom";
import 'animate.css';
import Spinner from 'react-bootstrap/Spinner';

const Homepage = () => {
  const { postCard, setPostCard, filterContainer, setOriginalPostCard, originalPostCard, loading, incrementCount } = useContext(Context);

  const handleClickCount = (id) => {
    incrementCount(); 
  };

  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('');
  const [selectedSalary, setSelectedSalary] = useState('');

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
      const salary = parseInt(card.salary, 10);
  
      if (!isNaN(salary)) {
        switch (selectedSalary) {
          case "0-500":
            salaryMatch = salary < 500;
            break;
          case "500-1000":
            salaryMatch = salary >= 500 && salary <= 1000;
            break;
          case "1000-1500":
            salaryMatch = salary > 1000 && salary <= 1500;
            break;
          case "1500-2000":
            salaryMatch = salary > 1500 && salary <= 2000;
            break;
          case "2000+":
            salaryMatch = salary > 2000;
            break;
          default:
            salaryMatch = true;
            break;
        }
      }
  
      return locationMatch && positionMatch && salaryMatch;
    });
  
    setPostCard(filteredCards.length ? filteredCards : []);
  };

  const postClick = (id) => {
    const viewCounts = JSON.parse(localStorage.getItem("viewCounts")) || {};
    viewCounts[id] = (viewCounts[id] || 0) + 1;
    localStorage.setItem("viewCounts", JSON.stringify(viewCounts));
  };

  return (
    <>
      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <div className="homepage-container">
          <SearchFilter />
          <div className={`filter-container animate__animated animate__fadeInDown`} style={{ display: filterContainer ? "block" : "none" }}>
            <select name="" id="" onChange={e => setSelectedPosition(e.target.value)}>
              <option value="">Vəzifə</option>
              {singlePositions.map((position, index) => (
                <option value={position} key={index}>{position}</option>
              ))}
            </select>
            <select name="" id="" onChange={e => setSelectedSalary(e.target.value)}>
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
            </select>
            <button className="search-btn" onClick={searchVacancy}>Search</button>
          </div>
          {postCard.length > 0 ? (
            postCard.map(post => (
              <Link className="details-page-link" to={`details/${post.id}`} key={post.id} onClick={() => postClick(post.id)}>
                <div  className="advertisement">
                  <HomepageCard post={post} />
                </div>
              </Link>
            ))
          ) : (
            <div className="not-found-container">
              <span><VscSearchStop /></span>
              <p className="not-found-search">Sizin axtarış üzrə heç bir nəticə tapılmadı.</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Homepage;
