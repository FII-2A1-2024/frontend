import Navbar_superior from "../../components/Navbar";
import NavbarSettings from "../../components/NavbarSettings";
import Languages from "../../components/Navbar_Superior/Navbar_superior";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

import "../../styles/LandingPage.css";

function LanguageSettingsPage() {
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
      <div className="landing-page">
        <Navbar_superior />
        <div className="landing-content">
          <button
            onClick={handleChangeLanguage}
            className="absolute top-[500px]"
          >
            SWITCH
          </button>
          <NavbarSettings />
          <Languages />
        </div>
      </div>
    </>
  );
}

export default LanguageSettingsPage;
