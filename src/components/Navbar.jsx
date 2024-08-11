import React, { useState, useEffect, useContext } from 'react';
import { IoMdSunny } from "react-icons/io";
import { FaMoon } from "react-icons/fa";
import '../css/Navbar.css';
import '../css/NavbarResponsive.css';
import Context from '../context/context';

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { setLogin, setRegister, setDesign } = useContext(Context)

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const handleToggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const handleShowLogin = () => {
    setLogin(true);
    setRegister(false);
    setDesign(true);
  };


  return (
    <div className="sidebar">
      <header className="header">
        <div className="header_logo">
          <img src="/src/img/logo.c9da023 (1).png" alt="logo" />
        </div>
        <select className='select-lang' name="lang" id="lang" aria-label="Language Selector">
          <option className='select-lang-option' value="Az">Az</option>
          <option className='select-lang-option' value="En">En</option>
          <option className='select-lang-option' value="Ru">Ru</option>
        </select>
        <ul className="header__menu">
          <li className="header__menu__item1">Elanlar</li>
          <li className="header__menu__item1" onClick={handleShowLogin}>Elan yerləşdir</li>
        </ul>
        <div className="icon-container" onClick={handleToggleDarkMode}>
          <div className="sun">
            <IoMdSunny size={15} />
          </div>
          <div className="moon">
            <FaMoon size={15} />
          </div>
        </div>
      </header>

      <footer className="footer">
        <ul className="footer_menu">
          <li className="footer_menu_item1">Haqqımızda</li>
          <li className="footer_menu_item2">Xidmətlər</li>
          <li className="footer_menu_item3">Əlaqə</li>
        </ul>
      </footer>
    </div>
  );
};

export default Navbar;