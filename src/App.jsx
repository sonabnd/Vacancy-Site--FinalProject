import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Context from "./context/context";
import Homepage from "./components/Homepage";
import Navbar from "./components/Navbar";
import "./App.css";
import Details from "./pages/Details";
import Service from "./pages/Service";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Apply from "./pages/Apply";
import AddPost from "./pages/AddPost";
import { IoClose } from "react-icons/io5";
import { RiLoginCircleLine } from "react-icons/ri";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoIosMenu } from "react-icons/io";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  // login/register
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);
  const [isDesign, setDesign] = useState(false);
  const [postCard, setPostCard] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filterContainer, setfilterContainer] = useState(false)
  const [originalPostCard, setOriginalPostCard] = useState([]);

  const showHideFilter = () => {
    setfilterContainer(!filterContainer)
  }

  const handleShowLogin = () => {
    setLogin(true);
    setRegister(false);
    setDesign(true);
  };

  const handleCloseLogin = () => {
    setLogin(false);
    setDesign(false);
  };

  const handleShowRegister = () => {
    setRegister(true);
    setLogin(false);
    setDesign(true);
  };

  const handleCloseRegister = () => {
    setRegister(false);
    setDesign(false);
  };

  const data = {
    login,
    setLogin,
    register,
    setRegister,
    isDesign,
    setDesign,
    postCard,
    setPostCard,
    searchInput,
    setSearchInput,
    filterContainer,
    setfilterContainer,
    showHideFilter,
    originalPostCard, setOriginalPostCard
  };

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/advertisement");
      const posts = response.data;

      setPostCard(posts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className={isDesign ? "open" : "close"}>
        <div className="modal-content-login">
          {login && (
            <div className="login">
              <div className="login-main">
                <div onClick={handleCloseLogin} className="login-close">
                  <IoClose />
                </div>
                <div className="login-icon">
                  <RiLoginCircleLine />
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <h3>Hesabınıza daxil olun</h3>
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <p>Xoş gəlmişsiniz!</p>
                </div>
                <div className="login-inputs">
                  <div className="login-input">
                    <label htmlFor="">E-poçt</label>
                    <input type="text" placeholder="E-poçtunuzu yaradın" />
                  </div>
                  <div className="login-input">
                    <label htmlFor="">Şifrə</label>
                    <input type="password" placeholder="Şifrə" />
                  </div>
                </div>
                <div className="login-button">
                  <button>Daxil ol</button>
                </div>
                <div className="qeydiyyat-button">
                  <button onClick={handleShowRegister}>Qeydiyyatdan keç</button>
                </div>
              </div>
            </div>
          )}
          {register && (
            <div className="register">
              <div className="register-main">
                <div onClick={handleCloseRegister} className="register-close">
                  <IoClose />
                </div>
                <div className="register-head">
                  <div className="register-icon">
                    <img
                      loading="lazy"
                      src="https://www.hellojob.az/content/assets/images/login/flag.svg"
                      alt=""
                    />
                  </div>
                  <div className="register-head-text">
                    <h3>Qeydiyyatdan keçin</h3>
                  </div>
                </div>
                <div className="regisetr-inputs">
                  <div className="register-input">
                    <label htmlFor="">Adınız*</label>
                    <input type="text" placeholder="Adinizi daxil edin" />
                  </div>
                  <div className="register-input">
                    <label htmlFor="">E-poçt*</label>
                    <input type="text" placeholder="E-poçtunuzu yazın" />
                  </div>
                  <div className="register-input">
                    <label htmlFor="">Şifre*</label>
                    <input type="password" />
                  </div>
                  <div className="register-input">
                    <label htmlFor="">Şifrə təkrarı*</label>
                    <input type="password" />
                  </div>
                </div>
                <div className="register-button">
                  <button>Qeydiyyat ol</button>
                </div>
                <div className="register-button-giris">
                  <button onClick={handleShowLogin}>Giriş sehifəsi</button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="app-container">
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          <Context.Provider value={data}>
            <div
              className="navbar-component"
            >
              <Navbar />
            </div>
            <div className="all-components">
              <div className="menu">
                <div className="logo-img">
                  <img src="/src/img/logo.c9da023.svg" alt="logo" />
                </div>
                <span className="menu-icon" >
                  <IoIosMenu />
                </span>
              </div>
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/details" element={<Details />} />
                <Route path="/service" element={<Service />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/apply" element={<Apply />} />
                <Route path="/add-post" element={<AddPost />} />
              </Routes>
            </div>
          </Context.Provider>
        </div>
      </div>
    </>
  );
}

export default App;