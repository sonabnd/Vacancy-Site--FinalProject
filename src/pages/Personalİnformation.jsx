import { IoPersonSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../css/Personalİnformation.css";
import { useFormik } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { useState, useEffect } from "react";
import { IoEye, IoEyeOff } from 'react-icons/io5';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const localization = {
  email: "E-mail",
  password: "Mövcud şifrənizi daxil edin",
  newPassword: "Yeni şifrə",
  newConfirmPassword: "Şifrənin təstiqi",
  updatePassword: "Şifrəni yeniləmək",
  emailRequired: "E-poçt tələb olunur",
  passwordRequired: "Mevcüt şifre tələb olunur",
  newPasswordRequired: "Yeni şifre tələb olunur",
  newConfirmPasswordRequired: "Şifre tekrarı tələb olunur",
  invalidEmail: "Fərqli E-poct teleb olunur",
  minPasswordLength: "Şifre en az 6 simvol olmalıdır",
  passwordMismatch: "Şifrənin təkrarı sahəsi şifrə sahəsi ilə eyni olmalıdır",
  userNotFound: "İstifadəçi tapılmadı",
  incorrectPassword: "Mevcut şifre yanlışdır.",
  passwordUpdated: "Şifre yeniləndi!",
  updateError: "Şifre yenilənərkən xəta baş verdiş",
  logoutSuccess: "Çıxış edildi",
  emailInUse: "Bu E-poçt istifadə olunub.",
  accountDeleted: "Hesab ugurla silindi.",
  deleteError: "Hesap silinərkən bir xəta baş verdi."
};

export default function Personalİnformation() {
  const [details, setDetails] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [newConfirmPassword, setNewConfirmPassword] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  const togglePasswordVisibility = (type) => {
    if (type === 'password') {
      setShowPassword(!showPassword);
    } else if (type === 'newPassword') {
      setShowNewPassword(!showNewPassword);
    } else if (type === 'newConfirmPassword') {
      setNewConfirmPassword(!newConfirmPassword);
    }
  }

  useEffect(() => {
    const local = localStorage.getItem("user");
    if (!local) {
      navigate('/');
    } else {
      setDetails(JSON.parse(local));
    }
  }, [navigate]);

  const validationEdit = Yup.object().shape({
    email: Yup.string().email(localization.invalidEmail).required(localization.emailRequired),
    password: Yup.string().required(localization.passwordRequired).min(6, localization.minPasswordLength),
    newPassword: Yup.string().required(localization.newPasswordRequired).min(6, localization.minPasswordLength),
    newConfirmPassword: Yup.string().required(localization.newConfirmPasswordRequired).oneOf([Yup.ref('newPassword'), null], localization.passwordMismatch)
  });

  const formikEdit = useFormik({
    initialValues: {
      email: '',
      password: '',
      newPassword: '',
      newConfirmPassword: ''
    },
    validationSchema: validationEdit,
    onSubmit: async (values) => {
      const local = localStorage.getItem("user");

      if (!local) {
        toast.error(localization.userNotFound);
        return;
      }
      const user = JSON.parse(local);

      if (user.password !== values.password) {
        toast.error(localization.incorrectPassword);
        return;
      }

      try {
        const emailExistsResponse = await axios.get(`http://localhost:3000/users?email=${values.email}`);
        if (emailExistsResponse.data.length > 0 && emailExistsResponse.data[0].email !== user.email) {
          toast.error(localization.emailInUse);
          return;
        }
        if (user.password !== values.newPassword) {
          await axios.delete(`http://localhost:3000/users/${user.id}`);
          const updatedUser = {
            ...user,
            email: values.email,
            password: values.newPassword,
          };
          await axios.post('http://localhost:3000/users', updatedUser);
          localStorage.setItem("user", JSON.stringify(updatedUser));
          toast.success(localization.passwordUpdated);
          setDetails(updatedUser);
        } else {
          toast.error("Şifrələr eynidir!")
        }
      } catch (error) {
        console.error(error);
        toast.error(localization.updateError);
      }
    }
  });

  const handleLogout = () => {
    localStorage.removeItem('user');
    toast.success(localization.logoutSuccess);
    navigate("/");
  };

  const handleDeleteAccount = async () => {
    try {
      await axios.delete(`http://localhost:3000/users/${details.id}`);

      localStorage.removeItem('user');

      toast.success(localization.accountDeleted);
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(localization.deleteError);
    }
  };

  return (
    <div className="personalInformation">
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
                <Link to="/personalInformation" className="user-detail-dropdown">Şəxsi məlumatlar</Link>
                <a className="user-detail-dropdown" onClick={handleLogout}>Çıxış</a>
              </div>
            </div>
          </div>
          <button className="post-exit">Sayta keçid et</button>
        </div>
      </header>
      <div className="profile_content_body">
        <div className="profile-header">
          <div className="profile__title">
            <div className="profile_title_line"></div>
            <h4>TƏHLÜKƏSİZLİK</h4>
          </div>
          <div className="delete-account-section">
            <button onClick={handleShow} className="delete-account-button">Hesabı Sil</button>
          </div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{details.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>Hesabınızı silmək istədiyinizə əminsiniz?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleDeleteAccount}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        <form onSubmit={formikEdit.handleSubmit}>
          <div className="profile-edit-inputs">
            <div className="profile_inputs">
              <div className="profile_edit_input">
                <label htmlFor="email">{localization.email}</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={formikEdit.handleChange}
                  value={formikEdit.values.email}
                />
                {formikEdit.errors.email && formikEdit.touched.email && (
                  <div className="error-message">{formikEdit.errors.email}</div>
                )}
              </div>
              <div className="profile_edit_input">
                <label htmlFor="password">{localization.password}</label>
                <input
                  id="password"
                  name="password"
                  onChange={formikEdit.handleChange}
                  value={formikEdit.values.password}
                  type={showPassword ? 'text' : 'password'}
                />
                <i
                  type="button"
                  onClick={() => togglePasswordVisibility('password')}
                  className="toggle-password-visibility">
                  {showPassword ? <IoEyeOff /> : <IoEye />}
                </i>
                {formikEdit.errors.password && formikEdit.touched.password && (
                  <div className="error-message">{formikEdit.errors.password}</div>
                )}
              </div>
              <div className="profile_edit_input">
                <label htmlFor="newPassword">{localization.newPassword}</label>
                <input
                  id="newPassword"
                  name="newPassword"
                  onChange={formikEdit.handleChange}
                  value={formikEdit.values.newPassword}
                  type={showNewPassword ? 'text' : 'password'}
                />
                <i
                  type="button"
                  onClick={() => togglePasswordVisibility('newPassword')}
                  className="toggle-password-visibility">
                  {showNewPassword ? <IoEyeOff /> : <IoEye />}
                </i>
                {formikEdit.errors.newPassword && formikEdit.touched.newPassword && (
                  <div className="error-message">{formikEdit.errors.newPassword}</div>
                )}
              </div>
              <div className="profile_edit_input">
                <label htmlFor="newConfirmPassword">{localization.newConfirmPassword}</label>
                <input
                  id="newConfirmPassword"
                  name="newConfirmPassword"
                  onChange={formikEdit.handleChange}
                  value={formikEdit.values.newConfirmPassword}
                  type={newConfirmPassword ? 'text' : 'password'}
                />
                <i
                  type="button"
                  onClick={() => togglePasswordVisibility('newConfirmPassword')}
                  className="toggle-password-visibility">
                  {newConfirmPassword ? <IoEyeOff /> : <IoEye />}
                </i>
                {formikEdit.errors.newConfirmPassword && formikEdit.touched.newConfirmPassword && (
                  <div className="error-message">{formikEdit.errors.newConfirmPassword}</div>
                )}
              </div>
              <div className="profile_edit_input">
                <button type="submit">{localization.updatePassword}</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}























// import { IoPersonSharp } from "react-icons/io5";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import "../css/Personalİnformation.css";
// import { useFormik } from "formik";
// import * as Yup from 'yup';
// import axios from "axios";
// import { useState, useEffect } from "react";

// // Dil ayarları (Örneğin: İngilizce, Türkçe)
// const localization = {
//   email: "E-mail",
//   password: "Mövcud şifrənizi daxil edin",
//   newPassword: "Yeni şifrə",
//   newConfirmPassword: "Şifrənin təstiqi",
//   updatePassword: "Şifrəni yeniləmək",
//   emailRequired: "E-posta adresi gereklidir",
//   passwordRequired: "Mevcut şifre gereklidir",
//   newPasswordRequired: "Yeni şifre gereklidir",
//   newConfirmPasswordRequired: "Şifre tekrarı gereklidir",
//   invalidEmail: "Geçerli bir e-posta adresi girin",
//   minPasswordLength: "Şifre en az 6 karakter uzunluğunda olmalıdır",
//   passwordMismatch: "Yeni şifre ile tekrarı aynı olmalıdır",
//   userNotFound: "Kullanıcı bulunamadı.",
//   incorrectPassword: "Mevcut şifre yanlış.",
//   passwordUpdated: "Şifre başarıyla güncellendi",
//   updateError: "Şifre güncellenirken bir hata oluştu",
//   logoutSuccess: "Çıxış edildi",
//   emailInUse: "Bu e-posta adresi zaten kullanımda."
// };

// export default function Personalİnformation() {
//   const [details, setDetails] = useState({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     const local = localStorage.getItem("user");
//     if (!local) {
//       navigate('/');
//     } else {
//       setDetails(JSON.parse(local));
//     }
//   }, [navigate]);

//   const validationEdit = Yup.object().shape({
//     email: Yup.string().email(localization.invalidEmail).required(localization.emailRequired),
//     password: Yup.string().required(localization.passwordRequired).min(6, localization.minPasswordLength),
//     newPassword: Yup.string().required(localization.newPasswordRequired).min(6, localization.minPasswordLength),
//     newConfirmPassword: Yup.string().required(localization.newConfirmPasswordRequired).oneOf([Yup.ref('newPassword'), null], localization.passwordMismatch)
//   });

//   const formikEdit = useFormik({
//     initialValues: {
//       email: '',
//       password: '',
//       newPassword: '',
//       newConfirmPassword: ''
//     },
//     validationSchema: validationEdit,
//     onSubmit: async (values) => {
//       const local = localStorage.getItem("user");

//       if (!local) {
//         toast.error(localization.userNotFound);
//         return;
//       }
//       const user = JSON.parse(local);

//       if ( user.password !== values.password) {
//         toast.error(localization.incorrectPassword);
//         return;
//       }

//       try {
//         // E-posta adresinin JSON server'da olup olmadığını kontrol et
//         const emailExistsResponse = await axios.get(`http://localhost:3000/users?email=${values.email}`);
//         if (emailExistsResponse.data.length > 0 && emailExistsResponse.data[0].email !== user.email) {
//           toast.error(localization.emailInUse);
//           return;
//         }

//         // Eski kullanıcıyı JSON server'dan sil
//         await axios.delete(`http://localhost:3000/users/${user.id}`);

//         // Yeni kullanıcı bilgilerini güncelle
//         const updatedUser = {
//           ...user,
//           email: values.email,
//           password: values.newPassword,
//         };

//         await axios.post('http://localhost:3000/users', updatedUser);
//         localStorage.setItem("user", JSON.stringify(updatedUser));

//         toast.success(localization.passwordUpdated);
//         setDetails(updatedUser);
//       } catch (error) {
//         console.error(error);
//         toast.error(localization.updateError);
//       }
//     }
//   });

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     toast.success(localization.logoutSuccess);
//     navigate("/");
//   };

//   return (
//     <div className="personalInformation">
//       <header className="header">
//         <div className="user-info">
//           <h2 className="welcome-text">Xoş gəlmisiniz, {details.name}</h2>
//           <div className="user-details">
//             <div className="dropdown">
//               <div className="dropdown-design">
//                 <div className="user-icon">
//                   <IoPersonSharp />
//                 </div>
//                 <div className="user-name">{details.name}</div>
//                 <button className="dropdown-button">▼</button>
//               </div>
//               <div className="dropdown-content">
//                 <Link to="/personalInformation" className="user-detail-dropdown">Şəxsi məlumatlar</Link>
//                 <a className="user-detail-dropdown" onClick={handleLogout}>Çıxış</a>
//               </div>
//             </div>
//           </div>
//           <button className="post-exit">Sayta keçid et</button>
//         </div>
//       </header>
//       <div className="profile_content_body">
//         <div className="profile__title">
//           <div className="profile_title_line"></div>
//           <h4>TƏHLÜKƏSİZLİK</h4>
//         </div>
//         <form onSubmit={formikEdit.handleSubmit}>
//           <div className="profile-edit-inputs">
//             <div className="profile_inputs">
//               <div className="profile_edit_input">
//                 <label htmlFor="email">{localization.email}</label>
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   onChange={formikEdit.handleChange}
//                   onBlur={formikEdit.handleBlur}
//                   value={formikEdit.values.email}
//                 />
//                 {formikEdit.errors.email && formikEdit.touched.email && (
//                   <div className="error-message">{formikEdit.errors.email}</div>
//                 )}
//               </div>
//               <div className="profile_edit_input">
//                 <label htmlFor="password">{localization.password}</label>
//                 <input
//                   id="password"
//                   name="password"
//                   onChange={formikEdit.handleChange}
//                   onBlur={formikEdit.handleBlur}
//                   value={formikEdit.values.password}
//                   type="password"
//                 />
//                 {formikEdit.errors.password && formikEdit.touched.password && (
//                   <div className="error-message">{formikEdit.errors.password}</div>
//                 )}
//               </div>
//               <div className="profile_edit_input">
//                 <label htmlFor="newPassword">{localization.newPassword}</label>
//                 <input
//                   id="newPassword"
//                   name="newPassword"
//                   onChange={formikEdit.handleChange}
//                   onBlur={formikEdit.handleBlur}
//                   value={formikEdit.values.newPassword}
//                   type="password"
//                 />
//                 {formikEdit.errors.newPassword && formikEdit.touched.newPassword && (
//                   <div className="error-message">{formikEdit.errors.newPassword}</div>
//                 )}
//               </div>
//               <div className="profile_edit_input">
//                 <label htmlFor="newConfirmPassword">{localization.newConfirmPassword}</label>
//                 <input
//                   id="newConfirmPassword"
//                   name="newConfirmPassword"
//                   onChange={formikEdit.handleChange}
//                   onBlur={formikEdit.handleBlur}
//                   value={formikEdit.values.newConfirmPassword}
//                   type="password"
//                 />
//                 {formikEdit.errors.newConfirmPassword && formikEdit.touched.newConfirmPassword && (
//                   <div className="error-message">{formikEdit.errors.newConfirmPassword}</div>
//                 )}
//               </div>
//               <div className="profile_edit_input">
//                 <button type="submit">{localization.updatePassword}</button>
//               </div>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }



































// import { useEffect, useState } from "react";
// import { IoPersonSharp } from "react-icons/io5";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import "../css/Personalİnformation.css";
// import { useFormik } from "formik";
// import * as Yup from 'yup';
// import axios from "axios";

// export default function Personalİnformation() {
//   const [details, setDetails] = useState({});
//   const navigation = useNavigate();

//   useEffect(() => {
//     const local = localStorage.getItem("user");
//     if (!local) {
//       navigation('/');
//     } else {
//       setDetails(JSON.parse(local));
//     }
//   }, [navigation]);

//   const validationEdit = Yup.object().shape({
//     email: Yup.string().email('Geçerli bir e-posta adresi girin').required('E-posta adresi gereklidir'),
//     password: Yup.string().required('Mevcut şifre gereklidir').min(6, 'Şifre en az 6 karakter uzunluğunda olmalıdır'),
//     newPassword: Yup.string().required('Yeni şifre gereklidir').min(6, 'Yeni şifre en az 6 karakter uzunluğunda olmalıdır'),
//     newConfirmPassword: Yup.string().required('Şifre tekrarı gereklidir').oneOf([Yup.ref('newPassword'), null], 'Yeni şifre ile tekrarı aynı olmalıdır')
//   });

//   const formikEdit = useFormik({
//     initialValues: {
//       email: '',
//       password: '',
//       newPassword: '',
//       newConfirmPassword: ''
//     },
//     validationSchema: validationEdit,
//     onSubmit: async (values) => {
//       const local = localStorage.getItem("user");

//       if (!local) {
//         toast.error("Kullanıcı bulunamadı.");
//         return;
//       }
//       const user = JSON.parse(local);

//       const emailExists = user.email !== values.email;

//       if (emailExists && user.password !== values.password) {
//         toast.error("Mevcut şifre yanlış.");
//         return;
//       }

//       const updatedUser = {
//         ...user,
//         email: values.email,
//         password: values.newPassword,
//       };

//       localStorage.setItem("user", JSON.stringify(updatedUser));

//       try {
//         await axios.put('http://localhost:3000/users', updatedUser);
//         toast.success("Şifre başarıyla güncellendi");
//         setDetails(updatedUser);
//       } catch (error) {
//         console.error(error);
//         toast.error("Şifre güncellenirken bir hata oluştu");
//       }
//     }
//   });

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     toast.success("Çıxış edildi");
//     navigation("/");
//   };

//   return (
//     <div className="personalInformation">
//       <header className="header">
//         <div className="user-info">
//           <h2 className="welcome-text">Xoş gəlmisiniz, {details.name}</h2>
//           <div className="user-details">
//             <div className="dropdown">
//               <div className="dropdown-design">
//                 <div className="user-icon">
//                   <IoPersonSharp />
//                 </div>
//                 <div className="user-name">{details.name}</div>
//                 <button className="dropdown-button">▼</button>
//               </div>
//               <div className="dropdown-content">
//                 <Link to={"/personalInformation"} className="user-detail-dropdown">Şəxsi məlumatlar</Link>
//                 <a className="user-detail-dropdown" onClick={handleLogout}>Çıxış</a>
//               </div>
//             </div>
//           </div>
//           <button className="post-exit">Sayta keçid et</button>
//         </div>
//       </header>
//       <div className="profile_content_body">
//         <div className="profile__title">
//           <div className="profile_title_line"></div>
//           <h4>TƏHLÜKƏSİZLİK</h4>
//         </div>
//         <form onSubmit={formikEdit.handleSubmit}>
//           <div className="profile-edit-inputs">
//             <div className="profile_inputs">
//               <div className="profile_edit_input">
//                 <label htmlFor="email">E-mail</label>
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   onChange={formikEdit.handleChange}
//                   onBlur={formikEdit.handleBlur}
//                   value={formikEdit.values.email}
//                 />
//                 {formikEdit.errors.email && formikEdit.touched.email && (
//                   <div className="error-message">{formikEdit.errors.email}</div>
//                 )}
//               </div>
//               <div className="profile_edit_input">
//                 <label htmlFor="password">Mövcud şifrənizi daxil edin</label>
//                 <input
//                   id="password"
//                   name="password"
//                   onChange={formikEdit.handleChange}
//                   onBlur={formikEdit.handleBlur}
//                   value={formikEdit.values.password}
//                   type="password" />
//                 {formikEdit.errors.password && formikEdit.touched.password && (
//                   <div className="error-message">{formikEdit.errors.password}</div>
//                 )}
//               </div>
//               <div className="profile_edit_input">
//                 <label htmlFor="newPassword">Yeni şifrə</label>
//                 <input
//                   id="newPassword"
//                   name="newPassword"
//                   onChange={formikEdit.handleChange}
//                   onBlur={formikEdit.handleBlur}
//                   value={formikEdit.values.newPassword}
//                   type="password" />
//                 {formikEdit.errors.newPassword && formikEdit.touched.newPassword && (
//                   <div className="error-message">{formikEdit.errors.newPassword}</div>
//                 )}
//               </div>
//               <div className="profile_edit_input">
//                 <label htmlFor="newConfirmPassword">Şifrənin təstiqi</label>
//                 <input
//                   id="newConfirmPassword"
//                   name="newConfirmPassword"
//                   onChange={formikEdit.handleChange}
//                   onBlur={formikEdit.handleBlur}
//                   value={formikEdit.values.newConfirmPassword}
//                   type="password" />
//                 {formikEdit.errors.newConfirmPassword && formikEdit.touched.newConfirmPassword && (
//                   <div className="error-message">{formikEdit.errors.newConfirmPassword}</div>
//                 )}
//               </div>
//               <div className="profile_edit_input">
//                 <button type="submit">Şifrəni yeniləmək</button>
//               </div>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }









































// import { useEffect, useState } from "react";
// import { IoPersonSharp } from "react-icons/io5";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import "../css/Personalİnformation.css";
// import { useFormik } from "formik";
// import * as Yup from 'yup';
// import axios from "axios";

// export default function Personalİnformation() {
//   const [details, setDetails] = useState({});
//   const navigation = useNavigate();

//   useEffect(() => {
//     const local = localStorage.getItem("user");
//     if (!local) {
//       navigation('/');
//     } else {
//       setDetails(JSON.parse(local));
//     }
//   }, [navigation]);

//   const validationEdit = Yup.object().shape({
//     email: Yup.string().email().required('E-poçt tələb olunur'),
//     password: Yup.string().required().min(6),
//     newPassword: Yup.string().required('Şifrə sahəsi boş saxlanılmamalıdır').min(6),
//     newConfirmPassword: Yup.string().required('Şifrənin təkrarı sahəsi Şifrə sahəsi ilə eyni olmalıdır').oneOf([Yup.ref('newPassword'), null], 'Şifrənin təkrarı sahəsi Şifrə sahəsi ilə eyni olmalıdır ')
//   });

//   const formikEdit = useFormik({
//     initialValues: {
//       email: '',
//       password: '',
//       newPassword: '',
//       newConfirmPassword: ''
//     },
//     validationSchema: validationEdit,
//     onSubmit: async(values) => {
//       const local = localStorage.getItem("user");

//       if (!local) {
//         toast.error("Kullanıcı bulunamadı.");
//         return;
//       }
//       const user = JSON.parse(local);
//       const sameEmail = user.find(
//         (item) => item.email === values.email
//       )
//       if (!sameEmail) {
//         if (user.password !== values.password) {
//           toast.error("Mevcut şifre yanlış.");
//           return;
//         }
//         const updatedUser = {
//           email: values.email,
//           password: values.newPassword,
//         };
//         localStorage.setItem("user", JSON.stringify(updatedUser));
//         await axios.post('http://localhost:3000/users', JSON.stringify(values));
//         toast.success("Şifre başarıyla güncellendi");
//         setDetails(updatedUser);
//       }else{
//         toast.error("Bu e-poçt artıq istifadə edilib");
//       }

//     }
//   });

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     toast.success("Çıxış edildi");
//     navigation("/");
//   };

//   return (
//     <div className="personalInformation">
//       <header className="header">
//         <div className="user-info">
//           <h2 className="welcome-text">Xoş gəlmisiniz, {details.name}</h2>
//           <div className="user-details">
//             <div className="dropdown">
//               <div className="dropdown-design">
//                 <div className="user-icon">
//                   <IoPersonSharp />
//                 </div>
//                 <div className="user-name">{details.name}</div>
//                 <button className="dropdown-button">▼</button>
//               </div>
//               <div className="dropdown-content">
//                 <Link to={"/personalInformation"} className="user-detail-dropdown">Şəxsi məlumatlar</Link>
//                 <a className="user-detail-dropdown" onClick={handleLogout}>Çıxış</a>
//               </div>
//             </div>
//           </div>
//           <button className="post-exit">Sayta keçid et</button>
//         </div>
//       </header>
//       <div className="profile_content_body">
//         <div className="profile__title">
//           <div className="profile_title_line"></div>
//           <h4>TƏHLÜKƏSİZLİK</h4>
//         </div>
//         <form onSubmit={formikEdit.handleSubmit}>
//           <div className="profile-edit-inputs">
//             <div className="profile_inputs">
//               <div className="profile_edit_input">
//                 <label htmlFor="email">E-mail</label>
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   onChange={formikEdit.handleChange}
//                   value={formikEdit.values.email}
//                 />
//                 {formikEdit.errors.email && formikEdit.touched.email && (
//                   <div className="error-message">{formikEdit.errors.email}</div>
//                 )}
//               </div>
//               <div className="profile_edit_input">
//                 <label htmlFor="password">Mövcud şifrənizi daxil edin</label>
//                 <input
//                   id="password"
//                   name="password"
//                   onChange={formikEdit.handleChange}
//                   value={formikEdit.values.password}
//                   type="password" />
//                 {formikEdit.errors.password && formikEdit.touched.password && (
//                   <div className="error-message">{formikEdit.errors.password}</div>
//                 )}
//               </div>
//               <div className="profile_edit_input">
//                 <label htmlFor="newPassword">Yeni şifrə</label>
//                 <input
//                   id="newPassword"
//                   name="newPassword"
//                   onChange={formikEdit.handleChange}
//                   value={formikEdit.values.newPassword}
//                   type="password" />
//                 {formikEdit.errors.newPassword && formikEdit.touched.newPassword && (
//                   <div className="error-message">{formikEdit.errors.newPassword}</div>
//                 )}
//               </div>
//               <div className="profile_edit_input">
//                 <label htmlFor="newConfirmPassword">Şifrənin təstiqi</label>
//                 <input
//                   id="newConfirmPassword"
//                   name="newConfirmPassword"
//                   onChange={formikEdit.handleChange}
//                   value={formikEdit.values.newConfirmPassword}
//                   type="password" />
//                 {formikEdit.errors.newConfirmPassword && formikEdit.touched.newConfirmPassword && (
//                   <div className="error-message">{formikEdit.errors.newConfirmPassword}</div>
//                 )}
//               </div>
//               <div className="profile_edit_input">
//                 <button type="submit">Şifrəni yeniləmək</button>
//               </div>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }




















// import { useEffect, useState } from "react";
// import { IoPersonSharp } from "react-icons/io5";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import "../css/Personalİnformation.css"
// import { useFormik } from "formik";
// import * as Yup from 'yup';


// export default function Personalİnformation() {
//   const [details, setDetails] = useState({});
//   const navigation = useNavigate();

//   const local = localStorage.getItem("user");



//   useEffect(() => {
//     if (!local) {
//       navigation('/');
//     } else {
//       setDetails(JSON.parse(local));
//     }
//   }, [local])

//   const validationEdit = Yup.object().shape({
//     email: Yup.string().email().required('E-poçt tələb olunur'),
//     password: Yup.string().required().min(6),
//     newPassword: Yup.string().required('Şifrə sahəsi boş saxlanılmamalıdır').min(6),
//     newConfirmPassword: Yup.string().required().oneOf([Yup.ref('newPassword'), null], 'Şifrənin təkrarı sahəsi Şifrə sahəsi ilə eyni olmalıdır ')
//   })


//   const formikEdit = useFormik({
//     initialValues: {
//       email: '',
//       password: '',
//       newPassword: '',
//       newConfirmPassword: ''
//     },
//     validationSchema: validationEdit,
//     onSubmit: async (values) => {

//     }
//     })


//   const handleLogout = async () => {
//     try {
//       toast.success("Çixis edildi")
//       localStorage.removeItem('user');
//       navigation("/")
//     } catch (error) {
//       console.error(error);
//     }
//   }
//   return (
//     <div className="personalInformation">
//       <header className="header">
//         <div className="user-info">
//           <h2 className="welcome-text">Xoş gəlmisiniz, {details.name}</h2>
//           <div className="user-details">
//             <div className="dropdown">
//               <div className="dropdown-design">
//                 <div className="user-icon">
//                   <IoPersonSharp />
//                 </div>
//                 <div className="user-name">{details.name}</div>
//                 <button className="dropdown-button">▼</button>
//               </div>
//               <div className="dropdown-content">
//                 <Link to={"/personalInformation"} className="user-detail-dropdown">Şəxsi məlumatlar</Link>
//                 <a className="user-detail-dropdown" onClick={handleLogout}>Çıxış</a>
//               </div>
//             </div>
//           </div>
//           <button className="post-exit">Sayta keçid et</button>
//         </div>
//       </header>
//       <div className="profile_content_body">
//         <div className="profile__title">
//           <div className="profile_title_line"></div>
//           <h4>TƏHLÜKƏSİZLİK</h4>
//         </div>
//         <form onSubmit={formikEdit.handleSubmit}>
//           <div className="profile-edit-inputs">
//             <div className="profile_inputs">
//               <div className="profile_edit_input">
//                 <label htmlFor="email">E-mail</label>
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   onChange={formikEdit.handleSubmit}
//                   value={formikEdit.values.email}
//                 />
//               </div>
//               <div className="profile_edit_input">
//                 <label htmlFor="password">Mövcud şifrənizi daxil edin</label>
//                 <input
//                   id="password"
//                   name="password"
//                   onChange={formikEdit.handleSubmit}
//                   value={formikEdit.values.password}
//                   type="password" />
//               </div>
//               <div className="profile_edit_input">
//                 <label htmlFor="newPassword">Yeni şifrə</label>
//                 <input
//                   id="newPassword"
//                   name="newPassword"
//                   onChange={formikEdit.handleSubmit}
//                   value={formikEdit.values.newPassword}
//                   type="password" />
//               </div>
//               <div className="profile_edit_input">
//                 <label htmlFor="newConfirmPassword">Şifrənin təstiqi</label>
//                 <input
//                   id="newConfirmPassword"
//                   name="newConfirmPassword"
//                   onChange={formikEdit.handleSubmit}
//                   value={formikEdit.values.newConfirmPassword}
//                   type="password" />
//               </div>
//               <div className="profile_edit_input">
//                 <button type="submit">Şifrəni yeniləmək</button>
//               </div>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }
