import { useState, useEffect, useContext } from "react";
import { FaEye } from "react-icons/fa";
import "../css/Details.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Context from "../context/context";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [randomColor, setRandomColor] = useState("");
  const [viewCount, setViewCount] = useState(0);
  
  useEffect(() => {
    const viewCounts = JSON.parse(localStorage.getItem("viewCounts")) || {};
    setViewCount(viewCounts[id] || 0);
  }, [id]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/advertisement/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [id]);

  useEffect(() => {
    const getRandomColor = () => {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };
    setRandomColor(getRandomColor());
  }, []);

  if (!post) {
    return <p>Loading...</p>;
  }

  const handleApplyClick = () => {
    navigate(`/apply/${id}`, { state: { position: post.position, company: post.company } });
  };

  return (
    <>
      <div className="container-fluid p-4">
        <div>
          <div>
            <section className="job-header d-flex flex-column flex-md-row align-items-center border border-dark rounded p-4 mb-5">
              <div
                className="logo mb-3 mb-md-0 me-md-4 advertisement-loqo"
                style={{
                  backgroundColor: randomColor,
                  width: "50px",
                  height: "50px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                }}
              >
                {post.company.slice(0, 1)}
              </div>
              <div className="job-title flex-grow-1 text-center text-md-start">
                <h1 className="text-primary fw-bold mb-2" style={{ fontSize: '20px' }}>{post.position}</h1>
                <p className="text-secondary mb-2 mt-2">{post.company}</p>
                <div className="d-flex align-items-center justify-content-center justify-content-md-start mb-2">
                  <p className="text-secondary mb-0">{post.location}</p>
                  <FaEye className="text-secondary ms-3 me-2" />
                  <p className="text-secondary mb-0"> View count ({viewCount})</p>
                </div>
              </div>
              <div className="apply-btn text-center text-md-start">
                <button className="btn btn-primary btn-lg" onClick={handleApplyClick}>Müraciət et</button>
              </div>
            </section>
            <section className="main-content pt-4 pb-4">
              <div className="row g-4">
                <aside className="col-md-6 mb-4">
                  <div className="job-details">
                    <h4 className="fw-bold" style={{ marginBottom: '20px' }}>Vakansiya haqqında</h4>
                    <div className="d-flex">
                      <p>Son tarix:</p>
                      <strong>{post.deadline}</strong>
                    </div>
                    <div className="d-flex">
                      <p>Vakansiya növü:</p>
                      <strong>{post.jobTime}</strong>
                    </div>
                    <div className="d-flex">
                      <p>Əmək haqqı:</p>
                      <strong>{post.salary} AZN</strong>
                    </div>
                  </div>
                </aside>
                <article className="col-12 mb-4">
                  <div className="description">
                    <h4 className="fw-bold" style={{ marginBottom: '20px' }}>Təsvir</h4>
                    <ul className="formatted-requirements">
                      {post.jobInformation.split('.' && ';' && ',').map((line, index) => (
                        line.trim() ? <li key={index}>{line};</li> : null
                      ))}
                    </ul>
                  </div>
                </article>
                <article className="col-md-12 mb-4">
                  <div className="requirements">
                    <h4 className="fw-bold" style={{ marginBottom: '20px' }}>Tələblər</h4>
                    <ul className="list-unstyled">
                      <ul className="formatted-requirements">
                        {post.requirement.split('.' && ';' && ',').map((line, index) => (
                          line.trim() ? <li key={index}>{line};</li> : null
                        ))}
                      </ul>
                    </ul>
                  </div>
                </article>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
