import React from "react";
import { IoMdSunny } from "react-icons/io";
import { FaMoon } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import "../css/Navbar.css";
import "../css/NavbarResponsive.css";

const Navbar = () => {
  return (
    <div className="sidebar">
      <header className="header">
        <div className="header_logo">
          <img src="/src/img/logo.c9da023 (1).png" alt="logo" />
        </div>
        <select name="lang" id="lang" aria-label="Language Selector">
          <option value="Az">Az</option>
          <option value="En">En</option>
          <option value="Ru">Ru</option>
        </select>

        <ul className="header__menu">
          <li className="header__menu__item1">Elanlar</li>
          <li className="header__menu__item2">Elan yerləşdir</li>
        </ul>
        <div className="icon-container">
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
