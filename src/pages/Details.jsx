import React from 'react';
import { FaBars, FaClock, FaEye, FaHome } from 'react-icons/fa';
import '../css/Details.css';

const Details = () => {
  return (
    <>
      <div className="container-fluid p-4">
        <header className="menu justify-content-between align-items-center mb-4">
          <div className="logo-img">
            <img src="src/img/logo.c9da023 (1).png" alt="logo" />
          </div>
          <button className="menu-icon btn btn-outline-primary">
            <FaBars size="1.5em" />
          </button>
        </header>
        <div >
          <section className="job-header d-flex flex-column flex-md-row align-items-center border border-dark rounded p-4 mb-5">
            <div className="logo mb-3 mb-md-0 me-md-4">
              <img
                src="logo.png"
                alt="Company Logo"
                className="img-fluid rounded-circle"
                style={{ width: '80px', height: '80px' }}
              />
            </div>
            <div className="job-title flex-grow-1 text-center text-md-start">
              <div className="d-flex align-items-center">
                <a href="/" className="text-dark text-decoration-none d-flex align-items-center">
                  <FaHome size="1em" className="me-1" />
                  <span>Ana səhifə</span>
                </a>
              </div>
              <h1 className="text-primary fw-bold mb-2">
                Texnik-usta
              </h1>
              <p className="text-secondary mb-2 mt-2">Kontakt Home</p>
              <div className="d-flex align-items-center justify-content-center justify-content-md-start mb-2">
                <FaClock className="text-secondary me-2" />
                <p className="text-secondary mb-0">Dünən</p>
                <FaEye className="text-secondary ms-3 me-2" />
                <p className="text-secondary mb-0">212</p>
              </div>
            </div>
            <div className="apply-btn text-center text-md-start">
              <button className="btn btn-primary btn-lg">Müraciət et</button>
            </div>
          </section>

          <section className="main-content pt-4 pb-4">
            <div className="row g-4">
              <article className="col-12 col-md-8">
                <div className="description mb-4">
                  <h3 className="fw-bold">Təsvir</h3>
                  <p>• Şirkətin balansında olan avtonəqliyyat vasitələrinin ayda bir dəfədən az olmayaraq texniki vəziyyətinin yoxlanması və müvafiq sənədlərin tərtib edilməsi;</p>
                  <p>• TXTM-nə zəruri olan ehtiyat hissələri və ləvazimatlarının vaxtında sifariş edilməsi, onların qəbuluna və sərfiyyatına nəzarət edilməsi və müvafiq sənədləşmələrin aparılması;</p>
                  <p>• Avtonəqliyyat vasitələrinin təmir və texniki xidmət proseslərində bilavasitə iştirak edilməsi və keyfiyyətinin təmin edilməsi;</p>
                  <p>• Avtomobilin istismar qaydalarının pozulması nəticəsində əmələ gələn nasazlıqlar haqqında ilkin araşdırmaların aparılması və vaxtında avtoxidmət yarımbölməsinə məruzə olunması;</p>
                  <p>• Təmir və texniki xidmət planının tərtibində iştirak edərək yeni təkliflərin hazırlanması;</p>
                  <p>• Avtomobillərin cari təmir işlərinin vaxtında və keyfiyyətlə həyata keçirilməsi;</p>
                  <p>• Texniki cəhətdən nasaz olan avtonəqliyyat vasitələrinin istismarının dayandırılmasına nəzarət edilməsi;</p>
                  <p>• Əraziyə çıxmazdan öncə avtomobillərə texniki baxış keçirilməsinə nəzarət edilməsi və qayda pozuntuları haqqında avtoxidmət yarımbölməsinə məlumat verilməsi;</p>
                  <p>• TXTM-nin işində yaranan nöqsanlar haqqında avtoxidmət yarımbölməsinə vaxtında məlumat verilməsi;</p>
                  <p>• Sürücülərlə təyin olunmuş mövzularda aid təlimlərin keçirilməsi.</p>
                  <br />
                  <h4 className="fw-bold">İş şəraiti:</h4>
                  <p>• İş qrafiki: I-VI günlər</p>
                  <p>• Əmək haqqı: 1300 AZN Gross</p>
                </div>

                <div className="requirements">
                  <h3 className="fw-bold">Tələblər</h3>
                  <ul className="list-unstyled">
                    <li>Avtoservis sahəsində 3 il təcrübə;</li>
                    <li>Texniki biliklər;</li>
                    <li>Yüksək liderlik qabiliyyəti;</li>
                    <li>Məsuliyyətli və işgüzar;</li>
                    <li>Avtopark sənədləri ilə işləmə bacarığı.</li>
                  </ul>
                </div>
              </article>

              <aside className="col-12 col-md-4">
                <div className="job-details">
                  <h3 className="fw-bold">Vakansiya haqqında</h3>
                  <div className="d-flex justify-content-between mb-2">
                    <p>Son tarix:</p>
                    <strong>Sentyabr 16, 2024</strong>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <p>Paylaşılıb:</p>
                    <strong>Avqust 7, 2024</strong>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <p>Vakansiya növü:</p>
                    <strong>Tam ştat</strong>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p>Əmək haqqı:</p>
                    <strong>1150 - 1300 AZN</strong>
                  </div>
                </div>
              </aside>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Details;
