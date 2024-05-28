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
import logoutIcon from "./media/logoutIcon.svg";
import { useTranslation } from "react-i18next";
import { useMessages } from "../../components/Messages/MessageContext";
import axios from "axios";

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

  const handleLogout = () => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .post(
          `${import.meta.env.VITE_URL_BACKEND}/logout`,
          {}, // Corpul cererii este gol, dar trebuie să-l incluzi pentru a specifica antetul de autorizare
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log("User logged out");
          localStorage.removeItem("token");
          window.location.href = "/"; // Redirecționează utilizatorul către pagina de start sau altă pagină relevantă
        })
        .catch((error) => {
          console.error("Error logging out:", error);
        });
    } else {
      console.error("No token found in localStorage");
      // Tratează cazul în care nu există un token în localStorage
    }
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
            <img
              src={logoMascota}
              alt="Logo-mascota"
              className="logo-mascota"
            />
            <img src={logoFull} alt="Logo" className="logo-full" />
          </Link>
        </div>
        <SearchBar />
        <div className="right-buttons-nav-superior">
          <Link className="searchButton-navbar tooltip" to="/">
            {" "}
            {/*acesta apare numai la device uri la cu ecranul mai mic de 769px si la click ar trebui sa apara search-barul*/}
            <img src={searchIconNavbar} alt="" className="searchIconNavbar" />
            <span className="tooltip-text">Searchbar</span>
          </Link>
          <Link className="messagesButton-navbar tooltip" to="/messages">
            {" "}
            {/*linkare la pagina cu chat ul */}
            <img src={messagesIcon} alt="" className="messagesIcon" />
            <span className="tooltip-text">Messages</span>
          </Link>
          <button
            className="notifications-button tooltip"
            onClick={toggleNotifications}
          >
            {isNotificationsOpen ? (
              <img
                src={closeNotifications}
                alt=""
                className="notificationsIcon"
              />
            ) : (
              <img
                src={notificationsIcon}
                alt=""
                className="notificationsIcon"
              />
            )}
            <span className="tooltip-text">Notifications</span>
          </button>

          {isNotificationsOpen && (
            <NotificationsDropdown
              isOpen={isNotificationsOpen}
              toggleDropdown={toggleNotifications}
            />
          )}
          <Link to="/useraccount" className="userProfileButton tooltip">
            {" "}
            {/*linkare la pagina userului */}
            <img
              src={userProfileHolder}
              alt=""
              className="profileHolderNavSuperior"
            />
            <span className="tooltip-text">Your profile</span>
          </Link>
          <Link
            className="tooltip logout-button"
            to="/"
            onClick={() => localStorage.clear()}
          >
            <img src={logoutIcon} alt="Logout" className="logoutIcon" />
            <span className="tooltip-text">Logout</span>
          </Link>
        </div>
      </div>
      {isNavbarVisible && <Navbar />}
    </nav>
  );
}

export default Navbar_superior;
