import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import Navbar_superior from "../../components/Navbar_Superior/Navbar_superior";
import Navbar from "../../components/SideNavbar/Navbar";
import NavbarSettings from "../../components/Settings/NavbarSettings";
import "../../styles/AccountSetting.css";
import { useTranslation } from "react-i18next";

function AccountSettingsPage() {

    const pathname = useLocation();
    const [showNavbar, setShowNavbar] = useState(true);
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

    return (
      <>
            {/*location.pathname === "/settings" ? (
                <div className="flex justify-center items-center flex-grow text-2xl">
                    Account settings
                </div>) : (
                <Outlet /> 
            )*/}
            <div className="landing-page">
              <Navbar_superior toggleNavbar={toggleNavbar} />

              <div className="landing-page-content settings-page-content">
                {showNavbar && (
                  <div className="landing-sidebar">
                    <Navbar />
                  </div>
                )}
                <div className="landing-main-content">
                    <div className="settings-page-content-options">
                      <div className="settins-option-item">
                          <h3 className="h3-as-h2">Settings</h3>
                          {/*<div className="settings-option-item-break"></div>*/}
                      </div>
                      <div className="setting-item-functions">
                        <h4>Account settings</h4>
                        <div className="setting-preferences">

                          <div className="settings-item-function-container">
                                <div>Change password for your account</div>
                                <div>Delete account</div>
                                <div>Title 1</div>
                                <div>Title 1</div>
                          </div>
                          <div className="settings-item-function-container">
                                <div>Title 1</div>
                                <div>Title 1</div>
                                <div>Title 1</div>
                                <div>Title 1</div>

                          </div>
                        </div>
                      </div>

                      <div className="setting-item-functions">
                        <h4>Notification settings</h4>
                        <div className="setting-preferences">

                          <div className="settings-item-function-container">
                                <div>Change password for your account</div>
                                <div>Delete account</div>
                                <div>Title 1</div>
                                <div>Title 1</div>
                          </div>
                          <div className="settings-item-function-container">
                                <div>Title 1</div>
                                <div>Title 1</div>
                                <div>Title 1</div>
                                <div>Title 1</div>

                          </div>
                        </div>
                      </div>

                     {/* <div className="setting-item-functions">
                        <h4>Privacy settings</h4>
                        <div className="setting-preferences">

                          <div className="settings-item-function-container">
                                <div>Change password for your account</div>
                                <div>Delete account</div>
                                <div>Title 1</div>
                                <div>Title 1</div>
                          </div>
                          <div className="settings-item-function-container">
                                <div>Title 1</div>
                                <div>Title 1</div>
                                <div>Title 1</div>
                                <div>Title 1</div>

                          </div>
                        </div>
              </div>*/}

                      <div className="setting-item-functions">
                        <h4>Language settings</h4>
                        <div className="setting-preferences">

                          <div className="settings-item-function-container">
                                <div>Display language</div>
                          </div>
                          <div className="settings-item-function-container">
                                <button className="button-change-language" onClick={handleChangeLanguage}>Change language</button>
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
  