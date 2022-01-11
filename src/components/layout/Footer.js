import { Fragment } from "react";
import {
  faGlobeEurope,
  faPhoneSquare,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";

import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  const glob = <FontAwesomeIcon icon={faGlobeEurope} />;
  const phone = <FontAwesomeIcon icon={faPhoneSquare} />;
  const briefCase = <FontAwesomeIcon icon={faBriefcase} />;

  return (
    <footer className="footer">
      <div className="footer-left col-md-4 col-sm-6">
        <p className="about">
          <span> O firmie</span> BikeShop to sklep rowerowy online istniejący od
          2005 roku. Wieloletnie doświadczenie sprawia, że jesteśmy
          specjalistami w swoim fachu i zawsze podążamy za trendami. U nas
          sprzęt wybiorą profesjonalni kolarze oraz ci, którzy jeżdżą
          rekreacyjnie. Znajdziesz tu m.in. BMXy, rowery crossowe, trekkingowe,
          MTB, gravele
        </p>
      </div>
      <div className="footer-center col-md-4 col-sm-6">
        <div>
          <i>{glob}</i>
          <p>
            <span> Ulica i numer domu</span> Mielec, Kusocińskiego 13
          </p>
        </div>
        <div>
          <i>{phone}</i>
          <p> (+00) 0000 000 000</p>
        </div>
        <div>
          <i>{briefCase}</i>
          <p>
            <a href="#"> bikeshop@mail.com</a>
          </p>
        </div>
      </div>
      <div className="footer-right col-md-4 col-sm-6">
        <h2> Zobacz więcej</h2>
        <p className="menu">
          <a href="/home">Strona główna</a> | <a href="#"> Facebook</a> |{" "}
          <a href="#"> Instagram</a>
        </p>
        <p className="name"> Gazda &copy; 2021</p>
      </div>
    </footer>
  );
};

export default Footer;
