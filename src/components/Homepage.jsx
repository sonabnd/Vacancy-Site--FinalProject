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

  const { postCard, setPostCard, filterContainer, setOriginalPostCard, originalPostCard, setCount, count,loading,setLoading } = useContext(Context);

  const handleClickCount = (id) => {
    if (id) {
      setCount(count + 1);
    }
  }

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

  async function delDeadline() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const day = today.getDate();

    const formattedDay = day < 10 ? '0' + day : day;
    const formattedMonth = month < 10 ? '0' + month : month;
    const currentDate = formattedDay + "-" + formattedMonth + "-" + year;

    for (const card of postCard) {
      if (card.deadline == currentDate) {
        try {
          const response = await axios.delete(`http://localhost:3000/advertisement/${card.id}`)
          console.log(`Card with ID ${card.id} deleted`, response.data);
        }
        catch (error) {
          console.error(`Failed to delete card with ID ${card.id}:`, error);



  useEffect(() => {
    const delExpiredPosts = async () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0); 

      const parseDate = (dateStr) => {
        const formats = ['-', '/', '.'];
        for (const format of formats) {
          const [day, month, year] = dateStr.split(format).map(Number);
          if (day && month && year) {
            return new Date(year, month - 1, day); 
          }
        }
        return null; 
      };


      const expiredPosts = postCard.filter((card) => {
        const deadlineDate = parseDate(card.deadline);
        return deadlineDate && deadlineDate < today; 
      });


      const remainingPosts = postCard.filter((card) => {
        const deadlineDate = parseDate(card.deadline);
        return deadlineDate && deadlineDate >= today; 
      });


      for (const card of expiredPosts) {
        try {
          const response = await axios.delete(
            `http://localhost:3000/advertisement/${card.id}`
          );
          console.log(`Card with ID ${card.id} deleted`, response.data);
        } catch (error) {
          console.error(`Failed to delete card with ID ${card.id}:`, error.message);
        }
      }

      setPostCard(remainingPosts);
    };

    if (postCard.length > 0) {
      delExpiredPosts();
    }
  }
  useEffect(() => {
    delDeadline();
  }, [])
  }, [postCard, setPostCard]);

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
    <>{loading ? (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    ) : (

      <div className="homepage-container">
        <SearchFilter />
        <div className={`filter-container animate__animated animate__fadeInDown`} style={{ display: filterContainer ? "block" : "none" }} >
          <select name="" id="" onChange={e => setSelectedPosition(e.target.value)}>
        <SearchFilter />         
        <div className = {`filter-container animate__animated animate__fadeInDown`} style={{ display: filterContainer ? "block" : "none" }} >
          <select name="" id=""  onChange={e => setSelectedPosition(e.target.value)}>
            <option value="">Vəzifə</option>
            {
              singlePositions.map((position, index) => (
                <option value={position} key={index}>{position}</option>
              ))
            }
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
        {
          postCard.length > 0 ? (
            postCard.map(post => (
              <Link className="details-page-link" to={`details/${post.id}`} key={post.id}>
                <div onClick={() => handleClickCount(post.id)} className="advertisement" >
                  <HomepageCard post={post} />
                </div>
              </Link>
            ))
          ) : (
            <div className="not-found-container">
              <span><VscSearchStop /></span>
              <p className="not-found-search">Sizin axtarış üzrə heç bir nəticə tapılmadı.</p>
            </div>
          )
        }
      </div>
          {
            postCard.length>0 ? (
              postCard.map(post => (
                <Link className="details-page-link" to={`details/${post.id}`} key={post.id}>
                  <div className="advertisement" >
                    <HomepageCard post={post} />
                  </div>
                </Link>
              ))
            ) : (
              <div className="not-found-container">
                <span><VscSearchStop /></span>
                <p className="not-found-search">Sizin axtarış üzrə heç bir nəticə tapılmadı.</p>
              </div>
            )
          }
        </div>
    )}
    </>
  );
};


export default Homepage;  