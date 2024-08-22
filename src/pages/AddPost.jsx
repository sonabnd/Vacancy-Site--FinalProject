import React, { useContext, useEffect, useState } from "react";
import "../css/AddPost.css";
import { IoPersonSharp } from "react-icons/io5";
import "bootstrap/dist/css/bootstrap.min.css";
import PostModal from "../components/PostModal";
import UpdatePost from "../components/UpdatePost";
import DeletePost from "../components/DeletePost";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Context from "../context/context";
import { PiEmptyBold } from "react-icons/pi";

const AddPost = () => {
  const [postModalShow, setPostModalShow] = React.useState(false);
  const [updateModalShow, setUpdateModalShow] = React.useState(false);
  const [deleteModalShow, setDeleteModalShow] = React.useState(false);
  const { myPost, setMyPost } = useContext(Context);
  const [details, setDetails] = useState({});
  const navigation = useNavigate();

  const local = localStorage.getItem("user");

  const user = JSON.parse(localStorage.getItem("user"));
  const filteredPosts = myPost.filter((post) => post.userId === user.id);

  useEffect(() => {
    if (!local) {
      navigation("/");
    } else {
      setDetails(JSON.parse(local));
    }
  }, [local]);

  // useEffect(() => {
  //   localStorage.setItem("myPost", JSON.stringify(myPost));
  // }, [myPost]);

  const handleLogout = async () => {
    try {
      toast.success("cixis edildi");
      localStorage.removeItem("user");
      navigation("/");
    } catch (error) {
      console.error(error);
    }
  };

  // end user detail

  return (
    <>
      <div className="postAd-container">
        <header className="header">
          <div className="user-info">
            <h2 className="welcome-text">Xoş gəlmisiniz, {details.name}</h2>
            <div className="user-details">
              <div className="dropdown">
                <div className="dropdown-design">
                  <div className="user-icon">
                    <IoPersonSharp />
                  </div>
                  <div className="user-name">{details.name}</div>
                  <button className="dropdown-button">▼</button>
                </div>
                <div className="dropdown-content">
                  <Link
                    to={"/personalInformation"}
                    className="user-detail-dropdown"
                  >
                    Şəxsi məlumatlar
                  </Link>
                  <a className="user-detail-dropdown" onClick={handleLogout}>
                    Çıxış
                  </a>
                </div>
              </div>
            </div>
            <button className="post-exit">Sayta keçid et</button>
          </div>
        </header>
        <section className="ads-section">
          <div className="ads-header">
            <h2>Aktiv elanlarım:</h2>
            <div className="vacancies">
              <button
                className="post-ad-button"
                variant="primary"
                onClick={() => setPostModalShow(true)}
              >
                Elan yerləşdir
              </button>
            </div>
          </div>
          <span className="vacancy-count">Vakansiyalar (5)</span>
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <div className="ad-card" key={post.id}>
                <div className="company-logo">T</div>
                <div className="ad-details">
                  <p className="job-position">{post.position}</p>
                  <p className="company-name">{post.position}.</p>
                </div>
                <div className="ad-actions">
                  <button
                    className="edit-button"
                    variant="primary"
                    onClick={() => setUpdateModalShow(true)}
                  >
                    Redaktə et
                  </button>
                  <button
                    className="delete-button"
                    variant="primary"
                    onClick={() => setDeleteModalShow(true)}
                  >
                    Sil
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-post">
              <span>
                <PiEmptyBold className="no-post-icon" />
              </span>
              <p>Aktiv elanınız yoxdur</p>
            </div>
          )}
        </section>
        <PostModal
          show={postModalShow}
          onHide={() => setPostModalShow(false)}
        />
        <UpdatePost
          show={updateModalShow}
          onHide={() => setUpdateModalShow(false)}
        />
        <DeletePost
          show={deleteModalShow}
          onHide={() => setDeleteModalShow(false)}
        />
      </div>
    </>
  );
};

export default AddPost;
