import React from "react";
import "../css/AboutServiceContact3.css";

const Contact = () => {
  return (
    <div>
      <div className="contact-1">
        <h2>Əlaqə</h2>
      </div>
      <div className="contact-2">
        <h3>Ünvan</h3>
        <p>
          8 noyabr prospekti, Azure Biznes Mərkəzi, 18-ci mərtəbə. <br /> Bakı,
          AZ 1025, Azərbaycan
        </p>
      </div>
      <div className="phone">
        <span>+994 12 488 64 91</span> <span>+994 12 488 64 92</span>
      </div>
      <div className="mobile">
        <h3>Mobil</h3> <span>+994 50 205 66 20</span>
        <span>+994 50 208 90 25</span>
      </div>
      <div className="email">
        <h3>E-mail</h3> <span>info@jobsearch.az</span>
      </div>
    </div>
  );
};

export default Contact;