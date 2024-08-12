import { useState, useRef, useEffect } from 'react';
import IMask from 'imask';
import { FaBars } from 'react-icons/fa';

const Apply = () => {
  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    cv: false,
  });

  const phoneInputRef = useRef(null);

  useEffect(() => {
    if (phoneInputRef.current) {
      IMask(phoneInputRef.current, {
        mask: '+{994}(00)000-00-00',
        lazy: false,
      });
    }
  }, []);


  const phoneNumberRegex = /^\+994\(\d{2}\)\d{3}-\d{2}-\d{2}$/;

  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = {
      firstName: !event.target.firstName.value,
      lastName: !event.target.lastName.value,
      email: !event.target.email.value,
      phone: !phoneNumberRegex.test(event.target.phone.value),
      cv: !event.target.cv.files.length,
    };

    setErrors(newErrors);


    if (!Object.values(newErrors).includes(true)) {
      alert('Form submitted!');

    }
  };

  return (
    <>
      <header className="menu justify-content-between align-items-center mb-4">
        <div className="logo-img">
          <img src='/src/img/logo.c9da023.svg' alt="logo" />
        </div>
        <button className="menu-icon btn btn-outline-primary">
          <FaBars size="1.5em" />
        </button>
      </header>
      <div className="container mt-5">
        <div>
          <div className="d-flex align-items-center mb-4">
            <img
              src="https://yourlogo.com/logo.png"
              alt="Company Logo"
              className="me-3"
              style={{ height: '80px', width: '80px' }}
            />
            <div>
              <h1 className="h4">Texnik-usta</h1>
              <p className="text-muted">Kontakt Home</p>
            </div>
          </div>
          <hr />

          <h1 className="h3 mb-3">Ərizənizi təqdim edin</h1>
          <p className="text-muted mb-4">Şəxsi məlumatlarınızı daxil edin. Tələb olunan fayl formatlarına diqqət edin.</p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="form-label d-flex align-items-center">
                <span className="text-dark">CV faylını yüklə</span>
                <span className="text-danger ms-2">*</span>
              </label>
              <div
                className={`border ${errors.cv ? 'border-danger' : 'border-secondary'} border-dashed p-4 text-center bg-light`}
                onClick={() => document.getElementById('cv-upload').click()}
                style={{ cursor: 'pointer' }}
              >
                <input
                  id="cv-upload"
                  name="cv"
                  type="file"
                  accept=".pdf,.docx"
                  style={{ display: 'none' }}
                />
                <div className="text-primary">
                  <i className="bi bi-upload mb-2" style={{ fontSize: '24px' }}></i>
                  <br />
                  <span>CV faylını seç</span>
                </div>
                <small className="text-muted d-block mt-2">Sadəcə PDF və ya DOCX fayl (maks. 2mb)</small>
              </div>
              {errors.cv && <div className="text-danger mt-1">Məcburi xana!</div>}
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
                  className={`form-control border-${errors.firstName ? 'danger' : 'secondary'} bg-light`}
                  style={{ fontSize: '1.1rem', padding: '0.75rem' }}
                />
                {errors.firstName && <div className="text-danger mt-1">Məcburi xana!</div>}
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
                  className={`form-control border-${errors.lastName ? 'danger' : 'secondary'} bg-light`}
                  style={{ fontSize: '1.1rem', padding: '0.75rem' }}
                />
                {errors.lastName && <div className="text-danger mt-1">Məcburi xana!</div>}
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
                  className={`form-control border-${errors.email ? 'danger' : 'secondary'} bg-light`}
                  style={{ fontSize: '1.1rem', padding: '0.75rem' }}
                />
                {errors.email && <div className="text-danger mt-1">Məcburi xana!</div>}
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
                  className={`form-control border-${errors.phone ? 'danger' : 'secondary'} bg-light`}
                  placeholder="+994(00)000-00-00"
                  style={{ fontSize: '1.1rem', padding: '0.75rem' }}
                />
                {errors.phone && <div className="text-danger mt-1">Məcburi xana!</div>}
              </div>
            </div>

            <div className="d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-outline-danger"
                style={{ fontSize: '1.1rem', padding: '0.75rem 1.5rem' }}
              >
                Geri
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ fontSize: '1.1rem', padding: '0.75rem 1.5rem' }}
              >
                Göndər
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Apply;
