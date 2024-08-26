import "../css/Contact.css";

const Contact = () => {
  return (
    <div className="about">
      <div className="contact-1">
        <h1>Əlaqə</h1>
      </div>
      <div className="contact-2">
        <h3>Ünvan</h3>
        <p>
          8 noyabr prospekti, Azure Biznes Mərkəzi, 18-ci mərtəbə. <br /> Bakı,
          AZ 1025, Azərbaycan
        </p>
      </div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6078.590092321009!2d49.87511!3d40.380153!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307ce1e5959b69%3A0x6f2eb5b63b2f56d1!2sAMAY%20Shopping%20Center!5e0!3m2!1sen!2sus!4v1723451391624!5m2!1sen!2sus"
        width="600"
        height="450"
        style={{ border: 0 }}
        allowfullscreen=""
        loading="lazy"
      ></iframe>
      <div className="line">
        <hr />
      </div>
      <div className="contacts-item">
        <div className="contacts-text">
          <h4>Telefon</h4>
          <ul>
            <li>+994 12 434 50 30</li>
            <li>+994 12 488 64 91</li>
            <li>+994 12 488 64 92</li>
          </ul>
        </div>
      </div>
      <div className="contacts-item">
        <div className="contacts-text2">
          <h4>Mobil</h4>
          <ul>
            <li>+994 50 205 66 20</li>
            <li>+994 50 208 90 25</li>
          </ul>
        </div>
      </div>
      <div className="contacts-item">
        <div className="contacts-text3">
          <h4>E-mail</h4>
          <span>info@jobsearch.az</span>
        </div>
      </div>
    </div>
  );
};

export default Contact;
