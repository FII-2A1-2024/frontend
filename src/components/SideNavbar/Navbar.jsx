import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
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
import useViewport from './useViewPort';

function Navbar() {
  const { t } = useTranslation();
  const location = useLocation();
  const [isHidden, setIsHidden] = useState(false);

  const toggleMenu = () => {
    setIsHidden(!isHidden);
  };

  const getIcon = (path, whiteIcon, redIcon) => {
    return location.pathname === path ? whiteIcon : redIcon;
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar" style={{ display: isHidden ? "none" : "block" }}>
      <div className="navbar-container">
        <Link to='/main' className="navbar-link">
          <div className={`side-bar-item ${isActive('/main')}`}>
            <img src={getIcon('/main', popularIconWhite, popularIconRed)} alt="popularIcon" className="side-bar-item-icon" />
            <span className="navbar-link-text">{t("popular")}</span>
          </div>
        </Link> 

        <div className="break"></div>
        <Link to='/main/courses' className="navbar-link">
          <div className={`side-bar-item ${isActive('/main/courses')}`}>
            <img src={getIcon('/main/courses', coursesIconWhite, coursesIconRed)} alt="coursesIcon" className="side-bar-item-icon" />
            <span className="navbar-link-text">{t("courses")}</span>
          </div>
        </Link> 

        <Link to='/main/professors' className="navbar-link">
          <div className={`side-bar-item ${isActive('/main/professors')}`}>
            <img src={getIcon('/main/professors', professorsIconWhite, professorsIconRed)} alt="professorsIcon" className="side-bar-item-icon" />
            <span className="navbar-link-text">{t("profs")}</span>
          </div>
        </Link> 

        <Link to='/main/students' className="navbar-link">
          <div className={`side-bar-item ${isActive('/main/students')}`}>
            <img src={getIcon('/main/students', studentsIconWhite, studentsIconRed)} alt="studentsIcon" className="side-bar-item-icon" />
            <span className="navbar-link-text">{t("students")}</span>
          </div>
        </Link> 

        <Link to='/main/unrelated' className="navbar-link">
          <div className={`side-bar-item ${isActive('/main/unrelated')}`}>
            <img src={getIcon('/main/unrelated', unrelatedIconWhite, unrelatedIconRed)} alt="unrelatedIcon" className="side-bar-item-icon" />
            <span className="navbar-link-text">{t("unrelated")}</span>
          </div>
        </Link> 

        <Link to='/main/memes' className="navbar-link">
          <div className={`side-bar-item ${isActive('/main/memes')}`}>
            <img src={getIcon('/main/memes', memesIconWhite, memesIconRed)} alt="memesIcon" className="side-bar-item-icon" />
            <span className="navbar-link-text">{t("memes")}</span>
          </div>
        </Link> 

        <Link to='/main/jobs' className="navbar-link">
          <div className={`side-bar-item ${isActive('/main/jobs')}`}>
            <img src={getIcon('/main/jobs', jobsIconWhite, jobsIconRed)} alt="jobsIcon" className="side-bar-item-icon" />
            <span className="navbar-link-text">{t("jobs")}</span>
          </div>
        </Link>

        <Link to='/main/saved' className="navbar-link">
          <div className={`side-bar-item ${isActive('/main/saved')}`}>
            <img src={getIcon('/main/saved', savedIconWhite, savedIconRed)} alt="savedIcon" className="side-bar-item-icon" />
            <span className="navbar-link-text">{t("saved")}</span>
          </div>
        </Link> 

        <div className="break"></div>
        <Link to='/rules' className="navbar-link">
          <div className={`side-bar-item ${isActive('/rules')}`}>
            <img src={getIcon('/rules', rulesIconWhite, rulesIconRed)} alt="rulesIcon" className="side-bar-item-icon" />
            <span className="navbar-link-text">{t("rules")}</span>
          </div>
        </Link>

        <Link to='/settings' className="navbar-link">
          <div className={`side-bar-item ${isActive('/settings')}`}>
            <img src={getIcon('/settings', settingsIconWhite, settingsIconRed)} alt="settingsIcon" className="side-bar-item-icon" />
            <span className="navbar-link-text">{t("settings")}</span>
          </div>
        </Link> 
      </div>
    </nav>
  );
}

export default Navbar;
