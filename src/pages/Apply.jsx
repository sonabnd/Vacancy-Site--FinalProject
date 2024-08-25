import { useState, useRef, useEffect } from "react";
import IMask from "imask";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/apply.css";

const Apply = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: false,
    cv: false,
  });

  const [cvFile, setCvFile] = useState(null);

  const phoneInputRef = useRef(null);

  useEffect(() => {
    if (phoneInputRef.current) {
      IMask(phoneInputRef.current, {
        mask: "+{994}(00)000-00-00",
        lazy: false,
      });
    }
  }, []);

  const phoneNumberRegex = /^\+994\(\d{2}\)\d{3}-\d{2}-\d{2}$/;

  const handleCvChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileSizeInMB = file.size / (1024 * 1024);
      const validFileTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
      
      if (fileSizeInMB > 2 || !validFileTypes.includes(file.type)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          cv: "Fayl tipi uyğun deyil və ya ölçü çox böyükdür!",
        }));
        setCvFile(null);
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          cv: false,
        }));
        setCvFile(file);
      }
    } else {
      setCvFile(null);
    }
  };

  const handleCvDelete = () => {
    setCvFile(null);
    setErrors((prevErrors) => ({
      ...prevErrors,
      cv: false,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const firstName = event.target.firstName.value.trim();
    const lastName = event.target.lastName.value.trim();
    const email = event.target.email.value.trim();
    const phone = event.target.phone.value.trim();

    const newErrors = {
      firstName: !firstName ? "Məcburi xana!" : /[^a-zA-Z]/.test(firstName) ? "Ad yalnız hərflərdən ibarət olmalıdır!" : "",
      lastName: !lastName ? "Məcburi xana!" : /[^a-zA-Z]/.test(lastName) ? "Soyad yalnız hərflərdən ibarət olmalıdır!" : "",
      email: !email ? "Məcburi xana!" : "",
      phone: !phoneNumberRegex.test(phone),
      cv: !cvFile,
    };

    setErrors(newErrors);

    if (!Object.values(newErrors).some((error) => error)) {
      toast.success("Cv göndərildi!");
    }
  };

  return (
    <>
      <div className="apply-container container mt-5">
        <div className="container-fluid p-4">
          <div>
            <div className="d-flex align-items-center mb-4">
              <div
                className="logo mb-3 mb-md-0 me-md-4 advertisement-loqo"
                style={{
                  backgroundColor: "#ccc",
                  width: "80px",
                  height: "80px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                }}
              >
                {state.company.slice(0, 1)}
              </div>
              <div>
                <h1 className="h4">{state.position}</h1>
                <p className="text-muted">{state.company}</p>
              </div>
            </div>
            <hr />

            <h1 className="h3 mb-3">Ərizənizi təqdim edin</h1>
            <p className="text-muted mb-4">
              Şəxsi məlumatlarınızı daxil edin. Tələb olunan fayl formatlarına diqqət edin.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="form-label d-flex align-items-center">
                  <span className="text-dark">CV faylını yüklə</span>
                  <span className="text-danger ms-2">*</span>
                </label>
                <div
                  className={`border ${errors.cv ? "border-danger" : "border-secondary"} border-dashed p-4 text-center bg-light`}
                  onClick={() => document.getElementById("cv-upload").click()}
                  style={{ cursor: "pointer" }}
                >
                  <input
                    id="cv-upload"
                    name="cv"
                    type="file"
                    accept=".pdf,.docx"
                    style={{ display: "none" }}
                    onChange={handleCvChange}
                  />
                  <div className="text-primary">
                    <i className="bi bi-upload mb-2" style={{ fontSize: "24px" }}></i>
                    <br />
                    <span>{cvFile ? cvFile.name : "CV faylını seç"}</span>
                  </div>
                  <small className="text-muted d-block mt-2">
                    Sadəcə PDF və ya DOCX fayl (maks. 2mb)
                  </small>
                  {cvFile && (
                    <button
                      type="button"
                      className="btn btn-danger mt-2"
                      onClick={handleCvDelete}
                    >
                      Sil
                    </button>
                  )}
                </div>
                {errors.cv && (
                  <div className="text-danger mt-1">
                    {errors.cv}
                  </div>
                )}
              </div>

              <div className="row mb-3">
                <div className="col-md-6 mb-3 mb-md-0">
                  <label className="form-label d-flex align-items-center" htmlFor="firstName">
                    <span className="text-dark">Ad</span>
                    <span className="text-danger ms-2">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className={`form-control border-${errors.firstName ? "danger" : "secondary"} bg-light`}
                    style={{ fontSize: "1.1rem", padding: "0.75rem" }}
                  />
                  {errors.firstName && (
                    <div className="text-danger mt-1">{errors.firstName}</div>
                  )}
                </div>
                <div className="col-md-6">
                  <label className="form-label d-flex align-items-center" htmlFor="lastName">
                    <span className="text-dark">Soyad</span>
                    <span className="text-danger ms-2">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className={`form-control border-${errors.lastName ? "danger" : "secondary"} bg-light`}
                    style={{ fontSize: "1.1rem", padding: "0.75rem" }}
                  />
                  {errors.lastName && (
                    <div className="text-danger mt-1">{errors.lastName}</div>
                  )}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6 mb-3 mb-md-0">
                  <label className="form-label d-flex align-items-center" htmlFor="email">
                    <span className="text-dark">Email</span>
                    <span className="text-danger ms-2">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`form-control border-${errors.email ? "danger" : "secondary"} bg-light`}
                    style={{ fontSize: "1.1rem", padding: "0.75rem" }}
                  />
                  {errors.email && (
                    <div className="text-danger mt-1">{errors.email}</div>
                  )}
                </div>
                <div className="col-md-6">
                  <label className="form-label d-flex align-items-center" htmlFor="phone">
                    <span className="text-dark">Mobil nömrə</span>
                    <span className="text-danger ms-2">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    ref={phoneInputRef}
                    className={`form-control border-${errors.phone ? "danger" : "secondary"} bg-light`}
                    placeholder="+994(00)000-00-00"
                    style={{ fontSize: "1.1rem", padding: "0.75rem" }}
                  />
                  {errors.phone && (
                    <div className="text-danger mt-1">
                      {errors.phone ? "Məcburi xana!" : "Telefon nömrəsi düzgün deyil!"}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="d-flex justify-content-between mb-4">
                 <button 
                   type="button" 
                   className="btn btn-secondary"
                   onClick={() => navigate(-1)}
                   style={{ width: "10%" }}
                 >
                   Geri
                 </button>
                 <button 
                  type="submit" 
                   className="btn btn-primary"
                   style={{ width: "10%" }}
                 >
                   Göndər
                 </button>
               </div>
            </form>
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default Apply;