import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SideBar_Mobile.css";
import popularIconRed from "./icons-dark-red/popularIcon.svg";
import coursesIconRed from "./icons-dark-red/coursesIcon.svg";
import professorsIconRed from "./icons-dark-red/professorsIcon.svg";
import studentsIconRed from "./icons-dark-red/studentsIcon.svg";
import unrelatedIconRed from "./icons-dark-red/unrelatedIcon.svg";
import memesIconRed from "./icons-dark-red/memesIcon.svg";
import savedIconRed from "./icons-dark-red/savedIcon.svg";
import jobsIconRed from "./icons-dark-red/jobsIcon.svg";
import rulesIconRed from "./icons-dark-red/rulesIcon.svg";
import settingsIconRed from "./icons-dark-red/settingsIcon.svg";
import popularIconWhite from "./icons-white/popularIcon-white.svg";
import coursesIconWhite from "./icons-white/coursesIcon-white.svg";
import professorsIconWhite from "./icons-white/professorsIcon-white.svg";
import studentsIconWhite from "./icons-white/studentsIcon-white.svg";
import unrelatedIconWhite from "./icons-white/unrelatedIcon-white.svg";
import memesIconWhite from "./icons-white/memesIcon-white.svg";
import savedIconWhite from "./icons-white/savedIcon-white.svg";
import jobsIconWhite from "./icons-white/jobsIcon-white.svg";
import rulesIconWhite from "./icons-white/rulesIcon-white.svg";
import settingsIconWhite from "./icons-white/settingsIcon-white.svg";
import { useTranslation } from "react-i18next";


function SideBar_Mobile({handleClose}) {
  const { t } = useTranslation();
  const [isHidden, setIsHidden] = useState(false);
  const popupRef = useRef(null);  

  const toggleMenu = () => {
    setIsHidden(!isHidden); 
  };

  const [activeItem, setActiveItem] = useState("popular"); // Starea care reține elementul activ

  // Funcție pentru a seta elementul activ
  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      handleClose();
    }
  };



  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative-parent-sidebar" >
      <div className="glass-bg-blur-sidebar">
    <nav className="navbar" style={{ display: isHidden ? "none" : "block" }} ref={popupRef}>
      <div className="navbar-container">
        {/* Momentat este implementat dupa cum trebuie doar populars si rules tinand cont ca au linkuri. Daca le setez pe toate asa cum primul, se fac active toate ca nu au linkate ceva */}
         <Link to='/main' className="navbar-link" isActive={(match, location) => location.pathname === '/main'}>
          <div className={`side-bar-item ${location.pathname === '/main' ? 'active' : ''}`}>
            <img src={location.pathname === '/main' ? popularIconWhite : popularIconRed} alt="popularIcon" className="side-bar-item-icon" />
            <span className="navbar-link-text">{t("popular")}</span>
          </div>
        </Link> 

       {/* <div
          className={`side-bar-item ${
            activeItem === "popular" ? "active" : ""
          }`}
          onClick={() => handleItemClick("popular")}
        >
          <img
            src={activeItem === "popular" ? popularIconWhite : popularIconRed}
            alt="popularIcon"
            className="side-bar-item-icon"
          />
          <Link to="/main" className="navbar-link">
            Popular
          </Link>
        </div>*/}

        <div className="break"></div>
        {/* Categories */}

         <Link to='/main/courses' className="navbar-link" isActive={(match, location) => location.pathname === '/main/courses'}>
          <div className={`side-bar-item ${location.pathname === '/main/courses' ? 'active' : ''}`}>
            <img src={location.pathname === '/main/courses' ? coursesIconWhite : coursesIconRed} alt="coursesIcon" className="side-bar-item-icon" />
            <span className="navbar-link-text">{t("courses")}</span>
          </div>
        </Link> 

        {/*<div
          className={`side-bar-item ${
            activeItem === "courses" ? "active" : ""
          }`}
          onClick={() => handleItemClick("courses")}
        >
          <img
            src={activeItem === "courses" ? coursesIconWhite : coursesIconRed}
            alt="coursesIcon"
            className="side-bar-item-icon"
          />
          <Link to="/main/courses" className="navbar-link">
            {t("courses")}
          </Link>
        </div>*/}

        <Link to='/main/professors' className="navbar-link" isActive={(match, location) => location.pathname === '/main/professors'}>
          <div className={`side-bar-item ${location.pathname === '/main/professors' ? 'active' : ''}`}>
            <img src={location.pathname === '/main/professors' ? professorsIconWhite : professorsIconRed} alt="professorsIcon" className="side-bar-item-icon" />
            <span className="navbar-link-text">{t("profs")}</span>
          </div>
        </Link> 

        {/*<div
          className={`side-bar-item ${
            activeItem === "professors" ? "active" : ""
          }`}
          onClick={() => handleItemClick("professors")}
        >
          <img
            src={
              activeItem === "professors"
                ? professorsIconWhite
                : professorsIconRed
            }
            alt="professorsIcon"
            className="side-bar-item-icon"
          />
          <Link to="/main/professors" className="navbar-link">
            {t("profs")}
          </Link>
        </div>*/}

        <Link to='/main/students' className="navbar-link" isActive={(match, location) => location.pathname === '/main/students'}>
          <div className={`side-bar-item ${location.pathname === '/main/students' ? 'active' : ''}`}>
            <img src={location.pathname === '/main/students' ? studentsIconWhite : studentsIconRed} alt="studentsIcon" className="side-bar-item-icon" />
            <span className="navbar-link-text">{t("students")}</span>
          </div>
        </Link> 

        {/*<div
          className={`side-bar-item ${
            activeItem === "students" ? "active" : ""
          }`}
          onClick={() => handleItemClick("students")}
        >
          <img
            src={
              activeItem === "students" ? studentsIconWhite : studentsIconRed
            }
            alt="studentsIcon"
            className="side-bar-item-icon"
          />
          <Link to="/main/students" className="navbar-link">
            {t("students")}
          </Link>
        </div>*/}

         <Link to='/main/unrelated' className="navbar-link" isActive={(match, location) => location.pathname === '/main/unrelated'}>
          <div className={`side-bar-item ${location.pathname === '/main/unrelated' ? 'active' : ''}`}>
            <img src={location.pathname === '/main/unrelated' ? unrelatedIconWhite : unrelatedIconRed} alt="unrelatedIcon" className="side-bar-item-icon" />
            <span className="navbar-link-text">{t("unrelated")}</span>
          </div>
        </Link> 

       {/*  <div
          className={`side-bar-item ${
            activeItem === "unrelated" ? "active" : ""
          }`}
          onClick={() => handleItemClick("unrelated")}
        >
          <img
            src={
              activeItem === "unrelated" ? unrelatedIconWhite : unrelatedIconRed
            }
            alt="unrelatedIcon"
            className="side-bar-item-icon"
          />
          <Link to="/main/unrelated" className="navbar-link">
            {t("unrelated")}
          </Link>
        </div> */}

        <Link to='/main/memes' className="navbar-link" isActive={(match, location) => location.pathname === '/main/memes'}>
          <div className={`side-bar-item ${location.pathname === '/main/memes' ? 'active' : ''}`}>
            <img src={location.pathname === '/main/memes' ? memesIconWhite : memesIconRed} alt="memesIcon" className="side-bar-item-icon" />
            <span className="navbar-link-text">{t("memes")}</span>
          </div>
        </Link> 

        {/*<div
          className={`side-bar-item ${activeItem === "memes" ? "active" : ""}`}
          onClick={() => handleItemClick("memes")}
        >
          <img
            src={activeItem === "memes" ? memesIconWhite : memesIconRed}
            alt="memesIcon"
            className="side-bar-item-icon"
          />
          <Link to="/main/memes" className="navbar-link">
            {t("memes")}
          </Link>
        </div>*/}

        <Link to='/main/jobs' className="navbar-link" isActive={(match, location) => location.pathname === '/main/jobs'}>
          <div className={`side-bar-item ${location.pathname === '/main/jobs' ? 'active' : ''}`}>
            <img src={location.pathname === '/main/jobs' ? jobsIconWhite : jobsIconRed} alt="jobsIcon" className="side-bar-item-icon" />
            <span className="navbar-link-text">{t("jobs")}</span>
          </div>
        </Link>

        {/* <div
          className={`side-bar-item ${activeItem === "jobs" ? "active" : ""}`}
          onClick={() => handleItemClick("jobs")}
        >
          <img
            src={activeItem === "jobs" ? jobsIconWhite : jobsIconRed}
            alt="jobsIcon"
            className="side-bar-item-icon"
          />
          <Link to="/main/jobs" className="navbar-link">
            {t("jobs")}
          </Link>
        </div>*/}

        <Link to='/main/saved' className="navbar-link" isActive={(match, location) => location.pathname === '/main/saved'}>
          <div className={`side-bar-item ${location.pathname === '/main/saved' ? 'active' : ''}`}>
            <img src={location.pathname === '/main/saved' ? savedIconWhite : savedIconRed} alt="savedIcon" className="side-bar-item-icon" />
            <span className="navbar-link-text">{t("saved")}</span>
          </div>
        </Link> 

        {/*<div
          className={`side-bar-item ${activeItem === "saved" ? "active" : ""}`}
          onClick={() => handleItemClick("saved")}
        >
          <img
            src={activeItem === "saved" ? savedIconWhite : savedIconRed}
            alt="savedIcon"
            className="side-bar-item-icon"
          />
          <Link to="/main/saved" className="navbar-link">
            {t("saved")}
          </Link>
        </div>*/}

        <div className="break"></div>

        {/* Settings and other */}

        <Link to='/rules' className="navbar-link" isActive={(match, location) => location.pathname === '/rules'}>
          <div className={`side-bar-item ${location.pathname === '/rules' ? 'active' : ''}`}>
            <img src={location.pathname === '/rules' ? rulesIconWhite : rulesIconRed} alt="rulesIcon" className="side-bar-item-icon" />
            <span className="navbar-link-text">{t("rules")}</span>
          </div>
        </Link>

        {/* <div
          className={`side-bar-item ${activeItem === "rules" ? "active" : ""}`}
          onClick={() => handleItemClick("rules")}
        >
          <img
            src={activeItem === "rules" ? rulesIconWhite : rulesIconRed}
            alt="rulesIcon"
            className="side-bar-item-icon"
          />
          <Link to="/rules" className="navbar-link">
            {t("rules")}
          </Link>
        </div>*/}

        <Link to='/settings' className="navbar-link" isActive={(match, location) => location.pathname === '/settings'}>
          <div className={`side-bar-item ${location.pathname === '/settings' ? 'active' : ''}`}>
            <img src={location.pathname === '/settings' ? settingsIconWhite : settingsIconRed} alt="popularIcon" className="side-bar-item-icon" />
            <span className="navbar-link-text">{t("settings")}</span>
          </div>
        </Link> 

        {/* <div
          className={`side-bar-item ${
            activeItem === "settings" ? "active" : ""
          }`}
          onClick={() => handleItemClick("settings")}
        >
          <img
            src={
              activeItem === "settings" ? settingsIconWhite : settingsIconRed
            }
            alt="settingsIcon"
            className="side-bar-item-icon"
          />
          <Link to="/settings" className="navbar-link">
            {t("settings")}
          </Link>
        </div>*/}
      </div>
    </nav>
    </div>
    </div>
  );
}

export default SideBar_Mobile;
