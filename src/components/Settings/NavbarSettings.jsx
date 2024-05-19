import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavbarSettings.css";
import AccountIcon from "./icons-dark-red/account-unpushed.svg";
import NotificationsIcon from "./icons-dark-red/notifications-unpushed.svg";
import PrivacyIcon from "./icons-dark-red/privacy-unpushed.svg";
import LanguagesIcon from "./icons-dark-red/language-pushed.svg";
import AccountIconWhite from "./icons-white/account-unpushed.svg";
import NotificationsIconWhite from "./icons-white/notifications-unpushed.svg";
import PrivacyIconWhite from "./icons-white/privacy-unpushed.svg";
import LanguagesIconWhite from "./icons-white/language-pushed.svg";
import { useTranslation } from "react-i18next";

function NavbarSettings() {
  const { t } = useTranslation();
  const [isHidden, setIsHidden] = useState(false);

  const [activeItem, setActiveItem] = useState("account"); // Starea care reține elementul activ

  // Funcție pentru a seta elementul activ
  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  const toggleMenu = () => {
    setIsHidden(!isHidden);
  };
  return (
    <nav className="navbar" style={{ display: isHidden ? "none" : "block" }}>
    <div className="navbar-container">
      {/* Momentat este implementat dupa cum trebuie doar populars si rules tinand cont ca au linkuri. Daca le setez pe toate asa cum primul, se fac active toate ca nu au linkate ceva */}
      {/* <Link to='/' className="navbar-link" isActive={(match, location) => location.pathname === '/'}>
        <div className={`side-bar-item ${location.pathname === '/' ? 'active' : ''}`}>
          <img src={location.pathname === '/' ? popularIconWhite : popularIconRed} alt="popularIcon" className="side-bar-item-icon" />
          <span className="navbar-link-text">Popular</span>
        </div>
      </Link> */}

      <div className="side-bar-item">
       <h3 className="h3-as-h2">Settings</h3>

      </div>

    
      <div className="break"></div>
      {/* Categories */}

      {/* <Link to='/' className="navbar-link" isActive={(match, location) => location.pathname === '/'}>
        <div className={`side-bar-item ${location.pathname === '/' ? 'active' : ''}`}>
          <img src={location.pathname === '/' ? coursesIconWhite : coursesIconRed} alt="coursesIcon" className="side-bar-item-icon" />
          <span className="navbar-link-text">Courses</span>
        </div>
      </Link> */}

      <div
        className={`side-bar-item ${
          activeItem === "account" ? "active" : ""
        }`}
        onClick={() => handleItemClick("account")}
      >
        <img
          src={activeItem === "account" ? AccountIconWhite : AccountIcon}
          alt="accountIcon"
          className="side-bar-item-icon"
        />
        <Link to="/" className="navbar-link">
          {t("account")}
        </Link>
      </div>

      {/* <Link to='/' className="navbar-link" isActive={(match, location) => location.pathname === '/'}>
        <div className={`side-bar-item ${location.pathname === '/' ? 'active' : ''}`}>
          <img src={location.pathname === '/' ? professorsIconWhite : professorsIconRed} alt="professorsIcon" className="side-bar-item-icon" />
          <span className="navbar-link-text">Professors</span>
        </div>
      </Link> */}

      <div
        className={`side-bar-item ${
          activeItem === "notifications" ? "active" : ""
        }`}
        onClick={() => handleItemClick("notifications")}
      >
        <img
          src={
            activeItem === "notifications"
              ? NotificationsIconWhite
              : NotificationsIcon
          }
          alt="NotificationsIcon"
          className="side-bar-item-icon"
        />
        <Link to="/" className="navbar-link">
          {t("notifications")}
        </Link>
      </div>

      {/* <Link to='/' className="navbar-link" isActive={(match, location) => location.pathname === '/'}>
        <div className={`side-bar-item ${location.pathname === '/' ? 'active' : ''}`}>
          <img src={location.pathname === '/' ? studentsIconWhite : studentsIconRed} alt="studentsIcon" className="side-bar-item-icon" />
          <span className="navbar-link-text">Students</span>
        </div>
      </Link> */}

      <div
        className={`side-bar-item ${
          activeItem === "privacy" ? "active" : ""
        }`}
        onClick={() => handleItemClick("privacy")}
      >
        <img
          src={
            activeItem === "privacy" ? PrivacyIconWhite : PrivacyIcon
          }
          alt="PrivacyIcon"
          className="side-bar-item-icon"
        />
        <Link to="/" className="navbar-link">
          {t("privacy")}
        </Link>
      </div>

      {/* <Link to='/' className="navbar-link" isActive={(match, location) => location.pathname === '/'}>
        <div className={`side-bar-item ${location.pathname === '/' ? 'active' : ''}`}>
          <img src={location.pathname === '/' ? unrelatedIconWhite : unrelatedIconRed} alt="unrelatedIcon" className="side-bar-item-icon" />
          <span className="navbar-link-text">Unrelated</span>
        </div>
      </Link> */}

      <div
        className={`side-bar-item ${
          activeItem === "languages" ? "active" : ""
        }`}
        onClick={() => handleItemClick("languages")}
      >
        <img
          src={
            activeItem === "languages" ? LanguagesIconWhite : LanguagesIcon
          }
          alt="LanguagesIcon"
          className="side-bar-item-icon"
        />
        <Link to="/" className="navbar-link">
          {t("languages")}
        </Link>
      </div>

      {/* <Link to='/' className="navbar-link" isActive={(match, location) => location.pathname === '/'}>
        <div className={`side-bar-item ${location.pathname === '/' ? 'active' : ''}`}>
          <img src={location.pathname === '/' ? memesIconWhite : memesIconRed} alt="memesIcon" className="side-bar-item-icon" />
          <span className="navbar-link-text">Memes</span>
        </div>
      </Link> */}

    

      {/* <Link to='/' className="navbar-link" isActive={(match, location) => location.pathname === '/'}>
        <div className={`side-bar-item ${location.pathname === '/' ? 'active' : ''}`}>
          <img src={location.pathname === '/' ? jobsIconWhite : jobsIconRed} alt="jobsIcon" className="side-bar-item-icon" />
          <span className="navbar-link-text">Jobs</span>
        </div>
      </Link> */}

    
      {/* <Link to='/' className="navbar-link" isActive={(match, location) => location.pathname === '/'}>
        <div className={`side-bar-item ${location.pathname === '/' ? 'active' : ''}`}>
          <img src={location.pathname === '/' ? savedIconWhite : savedIconRed} alt="savedIcon" className="side-bar-item-icon" />
          <span className="navbar-link-text">Saved</span>
        </div>
      </Link> */}

    
      {/* Settings and other */}

      {/* <Link to='/rules' className="navbar-link" isActive={(match, location) => location.pathname === '/rules'}>
        <div className={`side-bar-item ${location.pathname === '/rules' ? 'active' : ''}`}>
          <img src={location.pathname === '/rules' ? rulesIconWhite : rulesIconRed} alt="rulesIcon" className="side-bar-item-icon" />
          <span className="navbar-link-text">Rules</span>
        </div>
      </Link> */}

    

      {/* <Link to='/' className="navbar-link" isActive={(match, location) => location.pathname === '/'}>
        <div className={`side-bar-item ${location.pathname === '/' ? 'active' : ''}`}>
          <img src={location.pathname === '/' ? settingsIconWhite : settingsIconRed} alt="popularIcon" className="side-bar-item-icon" />
          <span className="navbar-link-text">Settings</span>
        </div>
      </Link> */}

    
    </div>
  </nav>
  );
}

export default NavbarSettings;


