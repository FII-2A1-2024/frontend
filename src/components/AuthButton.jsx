import React from "react";
import { Link } from "react-router-dom";
import "./AuthButton.css";
import { useTranslation } from "react-i18next";
import { useState } from "react";

function AuthButton() {
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

  //

  return (
    <div className="auth-buttons">
      <button
        onClick={handleChangeLanguage}
        className="absolute left-[-500px] text-black"
      >
        schimba limba
      </button>
      <Link to="/">{t("loginButton")}</Link>
    </div>
  );
}

export default AuthButton;
