import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Context from "./context/context";
import Homepage from "./components/Homepage";
import Navbar from "./components/Navbar";
import "./App.css";
import "./css/AppResponsive.css"
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
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from "formik";
import * as Yup from 'yup';
import Personalİnformation from "./pages/Personalİnformation";


function App() {
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);
  const [isDesign, setDesign] = useState(false);
  const [postCard, setPostCard] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filterContainer, setFilterContainer] = useState(false);
  const [originalPostCard, setOriginalPostCard] = useState([]);
  const [user, setUser] = useState([]);
  const [updateVacancy, setUpdateVacancy] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1098);
  const [editInputVal,setEditInputVal] = useState({});
  const [deleteVacancy, setDeleteVacancy] = useState([])

  const navigation = useNavigate();


  const handleResize = () => {
    setIsDesktop(window.innerWidth > 1098);
    if (window.innerWidth > 1098) {
      setNavbarOpen(true); 
    } else {
      setNavbarOpen(false);
    }
  };


  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/advertisement");
        const posts = response.data;
        setPostCard(posts);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  const toggleNavbar = () => {
    if (!isDesktop) {
      setNavbarOpen(prevState => !prevState);
    }
  };

  const showHideFilter = () => {
    setFilterContainer(prevState => !prevState);
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

  const data = {
    login,
    setLogin,
    register,
    setRegister,
    isDesign,
    setDesign,
    postCard,
    setPostCard,
    searchInput,setSearchInput,
    filterContainer,
    showHideFilter,
    originalPostCard, setOriginalPostCard,
    user,setUser,
    updateVacancy,setUpdateVacancy,
    editInputVal, setEditInputVal,
    deleteVacancy, setDeleteVacancy
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
  

  //login functions start

  const validationLogin = Yup.object().shape({
    email: Yup.string().email().required('E-poçt tələb olunur'),
    password: Yup.string().required('Şifrə sahəsi boş saxlanılmamalıdır').min(6),
  })

  const formikLogin = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: validationLogin,
    onSubmit: async (values) => {
      jsonLogin(values);
    }
  })

  const jsonLogin = async (values) => {
    let users = []
    let res = await axios.get('http://localhost:3000/users')
    let data = await res.data;
    users = data;
    console.log(users);
    if (users) {
      const hasUser = users.find((user) => {
        return user.email == values.email && user.password == values.password
      })
      console.log(hasUser);
      setUser(hasUser)
      if (hasUser) {
        localStorage.setItem('user', JSON.stringify(hasUser));
        console.log(user);
        navigation('/add-post')
        toast.success("Sizin qeydiyyatınız uğurludur!");
        setLogin(false);
        setDesign(false);
        formik.resetForm('')
      } else {
        toast.error("Sifre və ya e-poçt yanlışdır!");
        formik.resetForm('')
        setLogin(false);
        setDesign(false);
      }
    }
  }

  //login functiona end


  //regsiter functions start
  const validationRegister = Yup.object().shape({
    name: Yup.string()
      .required('Adınızı daxil edin')
      .min(2, 'Adınız en az 2 simvol olmalıdır'),
    email: Yup.string().email().required('E-poçt tələb olunur'),
    password: Yup.string().required('Şifrə sahəsi boş saxlanılmamalıdır').min(6),
    confirmpassword: Yup.string().required().oneOf([Yup.ref('password'), null], 'Şifrənin təkrarı sahəsi Şifrə sahəsi ilə eyni olmalıdır ')
  })

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmpassword: ''
    },
    validationSchema: validationRegister,
    onSubmit: async (values) => {
      jsonRegister(values);
      console.log("qeydiyyat olundu");
    }
  })

  const jsonRegister = async (values) => {
    try {
      const checkUser = await axios.get('http://localhost:3000/users');
      const getUser = checkUser.data;
      console.log(getUser);
      const sameUser = getUser.find(
        (user) => user.email === values.email
      );
      if (sameUser) {
        toast.error("Bu e-poçt artıq istifadə edilib");
        setRegister(false)
        setDesign(false);
        formik.resetForm();
        return;
      } else {
        toast.success("user yaradildi");
        localStorage.setItem('user', JSON.stringify({ name }));
        await axios.post('http://localhost:3000/users', JSON.stringify(values));
        setRegister(false)
        setLogin(true)
        formik.resetForm();
      }
    } catch (error) {
      console.error(error);
    }
  }
  //register functions end


  return (
    <>
      <div className={isDesign ? "open" : "close"}>
        <div className="modal-content-login">
          {login && (
            <form className="formik-navbar" onSubmit={formikLogin.handleSubmit}>
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
                      <label htmlFor="email">E-poçt</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        onChange={formikLogin.handleChange}
                        value={formikLogin.values.email}
                        placeholder="E-poçtunuzu yaradın"
                      />
                      {formikLogin.errors.email && formikLogin.touched.email && (
                        <div className="error">{formikLogin.errors.email}</div>
                      )}
                    </div>
                    <div className="login-input">
                      <label htmlFor="password">Şifrə</label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        onChange={formikLogin.handleChange}
                        placeholder="Şifrə"
                        value={formikLogin.values.password}
                      />
                      {formikLogin.errors.password && formikLogin.touched.password && (
                        <div className="error">{formikLogin.errors.password}</div>
                      )}
                    </div>
                  </div>
                  <div className="login-button">
                    <button className="login-btn" type='submit'>Daxil ol</button>
                  </div>
                  <div className="qeydiyyat-button">
                    <button onClick={handleShowRegister}>Qeydiyyatdan keç</button>
                  </div>
                </div>
              </div>
            </form>
          )}
          {register && (
            <form className="formik-navbar" onSubmit={formik.handleSubmit}>
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
                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Adınızı daxil edin"
                        onChange={formik.handleChange}
                        value={formik.values.name} />
                      {formik.errors.name && formik.touched.name && (
                        <div className="error">{formik.errors.name}</div>
                      )}
                    </div>
                    <div className="register-input">
                      <label htmlFor="">E-poçt*</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="E-poçtunuzu yazın"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                      />
                      {formik.errors.email && formik.touched.email && (
                        <div className="error">{formik.errors.email}</div>
                      )}
                    </div>
                    <div className="register-input">
                      <label htmlFor="">Şifre*</label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Şifrənizi daxil edin"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                      />
                      {formik.errors.password && formik.touched.password && (
                        <div className="error">{formik.errors.password}</div>
                      )}
                    </div>
                    <div className="register-input">
                      <label htmlFor="">Şifrə təkrarı*</label>
                      <input
                        id="confirmpassword"
                        name="confirmpassword"
                        type="password"
                        placeholder="Şifrənizi təkrar edin"
                        onChange={formik.handleChange}
                        value={formik.values.confirmpassword}
                      />
                      {formik.errors.confirmpassword && formik.touched.confirmpassword && (
                        <div className="error">{formik.errors.confirmpassword}</div>
                      )}
                    </div>
                  </div>
                  <div className="register-button">
                    <button className="register-btn" type='submit'>Qeydiyyat ol</button>
                  </div>
                  <div className="register-button-giris">
                    <button onClick={handleShowLogin}>Giriş sehifəsi</button>
                  </div>
                </div>
              </div>
            </form>
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
            {(isDesktop || navbarOpen) && (
              <div className="navbar-component">
                <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
              </div>
            )}
            <div className="all-components">
              <div className="menu">
                <div className="logo-img">
                  <img src="/src/img/logo.c9da023.svg" alt="logo" />
                </div>
                <span className="menu-icon" onClick={toggleNavbar}>
                  <IoIosMenu />
                </span>
              </div>
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/details/:id" element={<Details />} />
                <Route path="/service" element={<Service />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/apply" element={<Apply />} />
                <Route path="/add-post" element={<AddPost />} />
                <Route path="/personalInformation" element={<Personalİnformation/>}/>
              </Routes>
            </div>
          </Context.Provider>
        </div>
      </div>
    </>
  );
}

export default App;