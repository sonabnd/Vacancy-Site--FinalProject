import { IoMdSunny } from "react-icons/io";
import { FaMoon } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import '../css/Navbar.css';
import '../css/NavbarResponsive.css';
import Context from '../context/context';
import { IoBagRemoveOutline } from 'react-icons/io5';
import { MdPostAdd } from 'react-icons/md';

const Navbar = () => {

  const navigate = useNavigate();
  const { setLogin, setRegister, setDesign } = useContext(Context)
  const [active, setActive] = useState(false);

  const handleShowLogin = () => {
    setLogin(true);
    setRegister(false);
    setDesign(true);
  };


  const goToAboutPage = () => {
    setActive(true);
    navigate('/about');  
  };

  const goToServicePage = () => {
    setActive(true);
    navigate('/service');  
  };

  const goToContactPage = () => {
    setActive(true);
    navigate('/contact');  
  };
  if (active && location.pathname !== '/contact' && location.pathname !== '/about' && location.pathname !== '/service') {
    setActive(false);
  }

  return (
    <div className="sidebar">
      <header className="header">
        <div className='sidebar-header'>
          <div className="header_logo">
            <img src="/src/img/logo.c9da023.svg" alt="logo" />
          </div>
          <div className="language-select">
            <select className='select-lang' name="lang" id="lang" aria-label="Language Selector">
              <option className='select-lang-option' value="Az">Az</option>
              <option className='select-lang-option' value="En">En</option>
              <option className='select-lang-option' value="Ru">Ru</option>
            </select>
          </div>
        </div>
      </header>
      <main>
        {/* <div className="icon-container" >
            <div className="sun">
              <IoMdSunny size={15} />
            </div>
            <div className="moon">
              <FaMoon size={15} />
            </div>
        </div> */}
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
      </main>
      <footer className="footer">
        <div className="footer_menu">
          <div className="footer_menu_item1" onClick={goToAboutPage} style={{ color: active && location.pathname === '/about' ? '#0C4DDE' : 'black' }}>Haqqımızda</div>
          <div className="footer_menu_item2" onClick={goToServicePage} style={{ color: active && location.pathname === '/service' ? '#0C4DDE' : 'black' }}>Xidmətlər</div>
          <div className="footer_menu_item3" onClick={goToContactPage} style={{ color: active && location.pathname === '/contact' ? '#0C4DDE' : 'black' }}>Əlaqə</div>
        </div>
        <p >© JobSearch.az 2006—2024</p>
      </footer>
    </div>
  );
};

export default Navbar;






