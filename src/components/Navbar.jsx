import { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { IoMdSunny } from "react-icons/io";
import { FaMoon } from "react-icons/fa";
import { IoBagRemoveOutline } from "react-icons/io5";
import { MdPostAdd } from "react-icons/md";
import "../css/Navbar.css";
import "../css/NavbarResponsive.css"
import Context from "../context/context";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setLogin, setRegister, setDesign } = useContext(Context);
  const [active, setActive] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("Az");
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [buttonText, setButtonText] = useState('Elan yerlesdir')

  const navigation = useNavigate();


  const local = localStorage.getItem("user");


  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark-mode");
  };
  useEffect(() => {
    const userinformation = localStorage.getItem("user");
    if (userinformation) {
      setButtonText('Elanlarım');
    } else {
      setButtonText('Elan yerləşdir');
    }
  }, [local]);

  const handleShowLogin = () => {
    if (!local) {
      setLogin(true);
      setRegister(false);
      setDesign(true);
    } else {
      navigation('/add-post')
    }
  };

  const goToHomepage = () => {
    setActive(true);
    navigate("/");
  };

  const goToAboutPage = () => {
    setActive(true);
    navigate("/about");
  };

  const goToServicePage = () => {
    setActive(true);
    navigate("/service");
  };

  const goToContactPage = () => {
    setActive(true);
    navigate("/contact");
  };

  if (
    active &&
    location.pathname !== "/contact" &&
    location.pathname !== "/about" &&
    location.pathname !== "/service"
  ) {
    setActive(false);
  }

  const handleSelect = (value) => {
    setSelectedLanguage(value);
    setIsOpen(false);
  };

  return (
    <>
      <div className="sidebar">
        <header className="header">
          <div className="sidebar-header">
            <div className="header_logo">
              <Link to={"/"}><img src="/src/img/logo.c9da023.svg" alt="logo" /></Link>
            </div>
            <div
              className="language-select"
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
            >
              <div className="select-trigger">
                {selectedLanguage}
                <div className="arrow-down"></div>
              </div>
              {isOpen && (
                <div className="select-options">
                  <div
                    className="select-option"
                    onClick={() => handleSelect("Az")}
                  >
                    Az
                  </div>
                  <div
                    className="select-option"
                    onClick={() => handleSelect("En")}
                  >
                    En
                  </div>
                  <div
                    className="select-option"
                    onClick={() => handleSelect("Ru")}
                  >
                    Ru
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>
        <main>
          <ul className="header__menu">
            <div className="header__menu__item1" onClick={goToHomepage}>
              <IoBagRemoveOutline />
              <li>Elanlar</li>
            </div>
            <div onClick={handleShowLogin} className="header__menu__item1">
              <MdPostAdd />
              <li>{buttonText}</li>
            </div>
          </ul>
        </main>
        <footer className="sidebar-footer">
          <div className="sidebar_footer_menu">
            <div className={`icon-container ${isDarkMode ? "dark" : ""}`}>
              <div className="sun">
                <IoMdSunny size={15} />
              </div>
              <div className="moon" onClick={toggleDarkMode}>
                <FaMoon size={15} />
              </div>
            </div>
            <div className="footer_menu_items">
              <div
                className="footer_menu_item1"
                onClick={goToAboutPage}
                style={{
                  color:
                    active && location.pathname === "/about"
                      ? "#0C4DDE"
                      : "black",
                }}
              >
                Haqqımızda
              </div>
              <div
                className="footer_menu_item2"
                onClick={goToServicePage}
                style={{
                  color:
                    active && location.pathname === "/service"
                      ? "#0C4DDE"
                      : "black",
                }}
              >
                Xidmətlər
              </div>
              <div
                className="footer_menu_item3"
                onClick={goToContactPage}
                style={{
                  color:
                    active && location.pathname === "/contact"
                      ? "#0C4DDE"
                      : "black",
                }}
              >
                Əlaqə
              </div>
            </div>
          </div>
          <p className="footer_menu_p">© JobSearch.az 2006—2024</p>
        </footer>
      </div>
    </>
  );
};

export default Navbar;