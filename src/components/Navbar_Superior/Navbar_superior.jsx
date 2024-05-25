import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import NotificationsDropdown from "./NotificationsDropdown";
import SearchBar from "./SearchBar";
import "./Navbar_superior.css";
import Navbar from "../SideNavbar/Navbar";
import logoFull from "./media/Logo-full-IT.svg";
import logoMascota from "./media/Logo-mascota-IT.svg";
import messagesIcon from "./media/messagesIcon.svg";
import notificationsIcon from "./media/notificationsIcon.svg";
import userProfileHolder from "./media/User.svg";
import searchIconNavbar from "./media/searchIconNavbar.svg";
import closeNotifications from "./media/closeNotifications.svg";
import { useTranslation } from "react-i18next";
import { useMessages } from "../../components/Messages/MessageContext";

function Navbar_superior({ toggleNavbar }) {
  const { t } = useTranslation();
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const location = useLocation();
  const { messages } = useMessages();

  useEffect(() => {
    const handleNewMessage = () => {
      if (!location.pathname.includes("/messages")) {
        setHasNewMessage(true);
      }
    };

    window.addEventListener("storage", handleNewMessage);

    return () => {
      window.removeEventListener("storage", handleNewMessage);
    };
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname.includes("/messages")) {
      setHasNewMessage(false);
    }
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsNavbarVisible(!isNavbarVisible);
    console.log(isNavbarVisible);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    console.log(isNotificationsOpen);
  };

  return (
    <nav className="navbar_superior">
      <div className="navbar-superior-container">
        <div className="small-screen-navbar-left-items">
          <button className="hamburger-menu " onClick={toggleNavbar}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
          <Link to={`/main`}>
            <img src={logoMascota} alt="Logo-mascota" className="logo-mascota" />
            <img src={logoFull} alt="Logo" className="logo-full" />
          </Link>
        </div>
        <SearchBar />
        <div className="right-buttons-nav-superior">
          <Link className="searchButton-navbar" to="/">
            <img src={searchIconNavbar} alt="" className="searchIconNavbar" />
          </Link>
          <Link className="messagesButton-navbar" to="/messages">
            <div className="relative">
              <img src={messagesIcon} alt="" className="messagesIcon" />
              {hasNewMessage && <span className="red-dot"></span>}
            </div>
          </Link>
          <button className="notifications-button" onClick={toggleNotifications}>
            {isNotificationsOpen ? (
              <img src={closeNotifications} alt="" className="notificationsIcon" />
            ) : (
              <img src={notificationsIcon} alt="" className="notificationsIcon" />
            )}
          </button>
          {isNotificationsOpen && (
            <NotificationsDropdown
              isOpen={isNotificationsOpen}
              toggleDropdown={toggleNotifications}
            />
          )}
          <Link to="/" className="userProfileButton">
            <img src={userProfileHolder} alt="" className="profileHolderNavSuperior" />
          </Link>
          <Link to="/">
            <button className="nav-superior-button-primary">
              {t("logout")}
            </button>
          </Link>
        </div>
      </div>
      {isNavbarVisible && <Navbar />}
    </nav>
  );
}

export default Navbar_superior;
