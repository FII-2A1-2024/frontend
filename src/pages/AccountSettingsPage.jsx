import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Navbar_superior from "../components/Navbar_Superior/Navbar_superior";
import Navbar from "../components/SideNavbar/Navbar";
//import NavbarSettings from "../components/Settings/NavbarSettings";
import "../styles/AccountSetting.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import useViewport from "../components/SideNavbar/useViewPort";

function AccountSettingsPage() {
  const pathname = useLocation();
  const { width } = useViewport();
  const [showNavbar, setShowNavbar] = useState(true);
  const [showResetPass, setResetPassword] = useState(false);
  const isDesktopSize = width >= 998;
  const isTabletSize = width >= 768 && width <= 997;
  const toggleNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(language);
  const handleChangeLanguage = () => {
    const newLanguage = currentLanguage == "en" ? "ro" : "en";
    setCurrentLanguage(newLanguage);
    changeLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  const handleDeleteAccountButton = async () => {
    // deleteAccount
    console.log("tryeing to delere account...");
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_URL_BACKEND}/deleteAccount`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Success:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleResetPassword = () => {
    setResetPassword(!showResetPass);
  };

  return (
    <>
      {/*location.pathname === "/settings" ? (
                <div className="flex justify-center items-center flex-grow text-2xl">
                    Account settings
                </div>) : (
                <Outlet /> 
            )*/}
      <div className="landing-page">
        {isTabletSize ? (
          <Navbar_superior toggleNavbar={toggleNavbar} />
        ) : (
          <Navbar_superior />
        )}

        <div className="landing-page-content settings-page-content">
          {showNavbar && (
            <div className="landing-sidebar">
              <Navbar />
            </div>
          )}
          <div className="landing-main-content">
            <div className="settings-page-content-options">
              <div className="settins-option-item">
                <h2 className="h3-as-h2">{t("settings")}</h2>
                {/*<div className="settings-option-item-break"></div>*/}
              </div>
              <div className="setting-item-functions">
                <h4>{t("Account settings")}</h4>
                <div className="setting-preferences">
                  <div className="settings-item-function-container">
                    <div className="setting-option-line">
                      <div className="setting-item">{t("Change password")}</div>
                      <button
                        className="button-change-language"
                        onClick={handleResetPassword}
                      >
                        {t("Change")}
                      </button>
                    </div>
                    <div
                      className="reset-password-container"
                      style={{ display: showResetPass ? "flex" : "none" }}
                    >
                      <div className="setting-option-line input-forms-password">
                        <form className="password-input-reset">
                          <label htmlFor="current-password">
                            {t("Current password")}
                          </label>
                          <input
                            type="password"
                            id="curr-password"
                            name="password"
                          />
                        </form>

                        <form className="password-input-reset">
                          <label htmlFor="new-password">
                            {t("New password")}
                          </label>
                          <input
                            type="password"
                            id="new-password"
                            name="password"
                          />
                        </form>
                      </div>

                      <div className="setting-option-line">
                        <div className="reset-password-line-link">
                          {t("Can't remember your password?")}{" "}
                          <Link className="link-to-reset-page">
                            {t("Reset password")}
                          </Link>
                        </div>
                      </div>

                      <div className="setting-option-line">
                        <button className="button-change-password">
                          {t("Save password")}
                        </button>
                      </div>
                    </div>

                    <div className="setting-option-line">
                      <div className="setting-item">{t("Delete account")}</div>
                      <Link
                        className="button-delete-account"
                        to="/"
                        onClick={handleDeleteAccountButton}
                      >
                        {t("Delete")}{" "}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="setting-item-functions">
                        <h4>Notification settings</h4>
                        <div className="setting-preferences">

                          <div className="settings-item-function-container">
                                <div className="setting-option-line">
                                </div>
                                <div>Delete account</div>
                                <div>Title 1</div>
                                <div>Title 1</div>
                          </div>
                        </div>
                      </div> */}

              <div className="setting-item-functions">
                <h4>{t("Language settings")}</h4>
                <div className="setting-preferences">
                  <div className="settings-item-function-container">
                    <div className="setting-option-line">
                      <div>{t("Display language")}</div>
                      <button
                        className="button-change-language"
                        onClick={handleChangeLanguage}
                        to=""
                      >
                        {t("Change language")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountSettingsPage;
