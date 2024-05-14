import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavbarSettings.css";
import AccountCircleIcon from "./media/account-unpushed.svg";
import NotificationsIcon from "./media/notifications-unpushed.svg";
import PrivacyIcon from "./media/privacy-unpushed.svg";
import HelpIcon from "./media/help-unpushed.svg";
import SupportIcon from "./media/support-unpushed.svg";
import LanguagesIcon from "./media/language-pushed.svg";
import { useTranslation } from "react-i18next";

function NavbarSettings() {
  const { t } = useTranslation();
  const [isHidden, setIsHidden] = useState(false);

  const toggleMenu = () => {
    setIsHidden(!isHidden);
  };
  return (
    <nav className="navbar-settings">
      {" "}
      {/* daca a fost apasat pe buton-ul de restrangere*/}
      {isHidden ? (
        <div className="hidden-container">
          <button className="close-btn" onClick={toggleMenu}>
            &gt;
          </button>
        </div>
      ) : (
        <div className="navbar-container-settings">
          {" "}
          {/*daca nu a fost apasat pe buton*/}
          <button className="close-btn" onClick={toggleMenu}>
            &lt;
          </button>
          <h1 className="settings-title-text">{t("settings")}</h1>
          <div className="break"></div>
          <ul className="categories">
            <li className="navbar-item">
              <Link to="/" className="navbar-link">
                <img src={AccountCircleIcon} alt="Account" className="icon" />{" "}
                {t("account")}
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/" className="navbar-link">
                <img
                  src={NotificationsIcon}
                  alt="Notifications"
                  className="icon"
                />{" "}
                {t("notifications")}
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/" className="navbar-link">
                <img src={PrivacyIcon} alt="Privacy" className="icon" />{" "}
                {t("privacy")}
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/" className="navbar-link">
                <img src={HelpIcon} alt="Help" className="icon" /> {t("help")}
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/" className="navbar-link">
                <img src={SupportIcon} alt="Support" className="icon" />{" "}
                {t("support")}
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/" className="navbar-link-button-pushed">
                <img src={LanguagesIcon} alt="Languages" className="icon" />{" "}
                {t("languages")}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default NavbarSettings;
