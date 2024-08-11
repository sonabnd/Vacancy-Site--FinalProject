// // import React from "react";
// // import { IoMdSunny } from "react-icons/io";
// // import { FaMoon } from "react-icons/fa";
// // import { MdCategory } from "react-icons/md";
// // import "../css/Navbar.css";
// // import "../css/NavbarResponsive.css";
// // const Navbar = () => {
// //   return (
// //     <div className="sidebar">
// //       <header className="header">
// //         <div className="header_logo">
// //           <img src="/src/img/logo.c9da023 (1).png" alt="logo" />
// //         </div>
// //         <select name="lang" id="lang" aria-label="Language Selector">
// //           <option value="Az">Az</option>
// //           <option value="En">En</option>
// //           <option value="Ru">Ru</option>
// //         </select>
// //         <ul className="header__menu">
// //           <li className="header__menu__item1">Elanlar</li>
// //           <li className="header__menu__item2">Elan yerləşdir</li>
// //         </ul>
// //         <div className="icon-container">
// //           <div className="sun">
// //             <IoMdSunny size={15} />
// //           </div>
// //           <div className="moon">
// //             <FaMoon size={15} />
// //           </div>
// //         </div>
// //       </header>
// //       <footer className="footer">
// //         <ul className="footer_menu">
// //           <li className="footer_menu_item1">Haqqımızda</li>
// //           <li className="footer_menu_item2">Xidmətlər</li>
// //           <li className="footer_menu_item3">Əlaqə</li>
// //         </ul>
// //       </footer>
// //     </div>
// //   );
// // };
// // export default Navbar;








// import React, { useState } from 'react';
// import { IoMdSunny } from "react-icons/io";
// import { FaMoon } from "react-icons/fa";
// import { IoClose } from 'react-icons/io5';
// import { RiLoginCircleLine } from 'react-icons/ri';
// import '../css/Navbar.css';
// import '../css/NavbarResponsive.css';

// const Navbar = () => {
//   const [login, setLogin] = useState(false);
//   const [register, setRegister] = useState(false);
//   const [isDesign, setDesign] = useState(false);

//   const handleShowLogin = () => {
//     setLogin(true);
//     setRegister(false);
//     setDesign(true);
//   };

//   const handleCloseLogin = () => {
//     setLogin(false);
//     setDesign(false);
//   };

//   const handleShowRegister = () => {
//     setRegister(true);
//     setLogin(false);
//     setDesign(true);
//   };

//   const handleCloseRegister = () => {
//     setRegister(false);
//     setDesign(false);
//   };

//   return (
//     <div className="sidebar">
//       <header className="header">
//         <div className="header_logo">
//           <img src="/src/img/logo.c9da023 (1).png" alt="logo" />
//         </div>
//         <select name="lang" id="lang" aria-label="Language Selector">
//           <option value="Az">Az</option>
//           <option value="En">En</option>
//           <option value="Ru">Ru</option>
//         </select>
//         <ul className="header__menu">
//           <li className="header__menu__item1">Elanlar</li>
//           <li className="header__menu__item2" onClick={handleShowLogin}>Elan yerləşdir</li>
//         </ul>
//         <div className="icon-container">
//           <div className="sun">
//             <IoMdSunny size={15} />
//           </div>
//           <div className="moon">
//             <FaMoon size={15} />
//           </div>
//         </div>
//       </header>

//       <div className={isDesign ? "open" : 'close'}>
//         <div className="modal-content-login">
//           {login && (
//             <div className="login">
//               <div className="login-main">
//                 <div onClick={handleCloseLogin} className="login-close">
//                   <IoClose />
//                 </div>
//                 <div className="login-icon">
//                   <RiLoginCircleLine />
//                 </div>
//                 <div style={{ marginBottom: "10px" }}>
//                   <h3>Hesabınıza daxil olun</h3>
//                 </div>
//                 <div style={{ marginBottom: "10px" }}>
//                   <p>Xoş gəlmişsiniz!</p>
//                 </div>
//                 <div className="login-inputs">
//                   <div className="login-input">
//                     <label htmlFor="">E-poçt</label>
//                     <input type="text" placeholder="E-poçtunuzu yaradın" />
//                   </div>
//                   <div className="login-input">
//                     <label htmlFor="">Şifrə</label>
//                     <input type="password" placeholder="Şifrə" />
//                   </div>
//                 </div>
//                 <div className="login-button">
//                   <button>Daxil ol</button>
//                 </div>
//                 <div className="qeydiyyat-button">
//                   <button onClick={handleShowRegister}>Qeydiyyatdan keç</button>
//                 </div>
//               </div>
//             </div>
//           )}
//           {register && (
//             <div className="register">
//               <div className="register-main">
//                 <div onClick={handleCloseRegister} className="register-close">
//                   <IoClose />
//                 </div>
//                 <div className="register-head">
//                   <div className="register-icon">
//                     <img loading="lazy" src="https://www.hellojob.az/content/assets/images/login/flag.svg" alt="" />
//                   </div>
//                   <div className="register-head-text">
//                     <h3>Qeydiyyatdan keçin</h3>
//                   </div>
//                 </div>
//                 <div className="regisetr-inputs">
//                   <div className="register-input">
//                     <label htmlFor="">Adınız*</label>
//                     <input type="text" placeholder="Adinizi daxil edin" />
//                   </div>
//                   <div className="register-input">
//                     <label htmlFor="">E-poçt*</label>
//                     <input type="text" placeholder="E-poçtunuzu yazın" />
//                   </div>
//                   <div className="register-input">
//                     <label htmlFor="">Şifre*</label>
//                     <input type="password" />
//                   </div>
//                   <div className="register-input">
//                     <label htmlFor="">Şifrə təkrarı*</label>
//                     <input type="password" />
//                   </div>
//                 </div>
//                 <div className="register-button">
//                   <button>Qeydiyyat ol</button>
//                 </div>
//                 <div className="register-button-giris">
//                   <button onClick={handleShowLogin}>Giriş sehifəsi</button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       <footer className="footer">
//         <ul className="footer_menu">
//           <li className="footer_menu_item1">Haqqımızda</li>
//           <li className="footer_menu_item2">Xidmətlər</li>
//           <li className="footer_menu_item3">Əlaqə</li>
//         </ul>
//       </footer>
//     </div>
//   );
// };

// export default Navbar;







import React, { useState, useEffect } from 'react';
import { IoMdSunny } from "react-icons/io";
import { FaMoon } from "react-icons/fa";
import { IoClose } from 'react-icons/io5';
import { RiLoginCircleLine } from 'react-icons/ri';
import '../css/Navbar.css';
import '../css/NavbarResponsive.css';

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);
  const [isDesign, setDesign] = useState(false);

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
          <li className="header__menu__item2" onClick={handleShowLogin}>Elan yerləşdir</li>
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

      <div className={isDesign ? "open" : 'close'}>
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
                    <img loading="lazy" src="https://www.hellojob.az/content/assets/images/login/flag.svg" alt="" />
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
      </div>
    </div>
  );
};

export default Navbar;