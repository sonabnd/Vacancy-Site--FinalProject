import React from "react";
import { IoMdSunny } from "react-icons/io";
import { FaMoon } from "react-icons/fa";
import "../css/Navbar.css";

const Navbar = () => {
  return (
    <>
      <div className="sidebar">
        <div className="logo">
          <img src="src/img/logo.c9da023 (1).png" alt="logo" />
        </div>
        <div>
          <h2>Elanlar</h2>
          <h2>Elan yerləşdir</h2>
        </div>
        <div className="icon-container">
          <div className="sun">
            <IoMdSunny size={15} />
          </div>
          <div className="moon">
            <FaMoon size={15} />
          </div>
        </div>
        <select name="lang" id="lang">
          <option value="Az">Az</option>
          <option value="En">En</option>
          <option value="Ru">Ru</option>
        </select>
      </div>
    </>
  );
};

export default Navbar;