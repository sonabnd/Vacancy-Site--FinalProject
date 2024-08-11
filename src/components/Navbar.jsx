import React, { useContext } from 'react';
import { IoMdSunny } from "react-icons/io";
import { FaMoon } from "react-icons/fa";
import '../css/Navbar.css';
import '../css/NavbarResponsive.css';
import Context from '../context/context';
import { IoBagRemoveOutline } from 'react-icons/io5';
import { MdPostAdd } from 'react-icons/md';

const Navbar = () => {
  const { setLogin, setRegister, setDesign } = useContext(Context)



  const handleShowLogin = () => {
    setLogin(true);
    setRegister(false);
    setDesign(true);
  };


  return (
    <div className="sidebar">
      <header className="header">
        <div className='sidebar-header'>
          <div className="header_logo">
            <img src="/src/img/logo.c9da023.svg" alt="logo" />
          </div>
          <div>
            <select className='select-lang' name="lang" id="lang" aria-label="Language Selector">
              <option className='select-lang-option' value="Az">Az</option>
              <option className='select-lang-option' value="En">En</option>
              <option className='select-lang-option' value="Ru">Ru</option>
            </select>
          </div>
        </div>
        <ul className="header__menu">
          <div className="header__menu__item1">
            <IoBagRemoveOutline />
            <li >Elanlar</li>
          </div>
          <div className="header__menu__item1">
            <MdPostAdd />
            <li  onClick={handleShowLogin}> Elan yerləşdir</li>
          </div>
        </ul>
        <div className="icon-container" >
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
        <p>© JobSearch.az 2006—2024</p>
      </footer>
    </div>
  );
};

export default Navbar;