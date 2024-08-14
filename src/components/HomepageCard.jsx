import { useEffect, useState } from "react";

const HomepageCard = ({ post }) => {
  const [randomColor, setRandomColor] = useState('')
  useEffect(()=>{
    const getRandomColor = () => {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };
    setRandomColor(getRandomColor());
  }, [])
  return (
    <>
      <div className="advertisement-loqo" style={{backgroundColor : randomColor}}>{post.company.slice(0,1)}</div>
      <div className="advertisement-position-company">
        <p className="position-name">{post.position}</p>
        <p className="company-name">{post.company}</p>
        <span>{post.location} |</span>
        <span className="deadline">Son müraciət tarixi : {post.deadline}</span>
      </div>
      <p className="price">{post.salary}</p>
    </>
  );
};

export default HomepageCard;
