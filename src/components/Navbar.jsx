import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useTranslation } from "react-i18next";

function Navbar() {
  const { t } = useTranslation();
  const [isHidden, setIsHidden] = useState(false);

  const toggleMenu = () => {
    setIsHidden(!isHidden);
  };
  return (
    <nav className="navbar">
      {" "}
      {/* daca a fost apasat pe buton-ul de restrangere*/}
      {isHidden ? (
        <div className="hidden-container">
          <button className="close-btn" onClick={toggleMenu}>
            &gt;
          </button>
        </div>
      ) : (
        <div className="navbar-container">
          {" "}
          {/*daca nu a fost apasat pe buton*/}
          <button className="close-btn" onClick={toggleMenu}>
            &lt;
          </button>
          <ul className="hot-topics">
            <li>
              <Link to="/" className="hot-topics-link">
                # Popular
              </Link>
            </li>
          </ul>
          {/*topicurile populare*/}
          <div className="break"></div>
          <ul className="categories">
            <li className="navbar-item">
              <Link to="/" className="navbar-link">
                # {t("courses")}
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/" className="navbar-link">
                # {t("profs")}
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/" className="navbar-link">
                # {t("students")}
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/" className="navbar-link">
                # {t("unrelated")}
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/" className="navbar-link">
                # {t("memes")}
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/" className="navbar-link">
                # {t("jobs")}
              </Link>
            </li>
          </ul>
          <div className="break"></div>
          <ul className="administartiv">
            {" "}
            {/*setari si alte butoane default*/}
            <li className="navbar-item">
              <Link to="/rules" className="navbar-link">
                {t("rules")}
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/" className="navbar-link">
                {t("help")}
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/" className="navbar-link">
                {t("support")}
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/settings/languages" className="navbar-link">
                {t("settings")}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
