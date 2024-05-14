import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Languages.css";
import { useTranslation } from "react-i18next";

function Languages() {
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
    <div className="languages_container">
      <div className="title">
        <h1>{t("langSet")}</h1>
      </div>
      <div className="break"></div>
      <div className="content">
        <button onClick={handleChangeLanguage}>{t("switch")}</button>
      </div>
    </div>
  );
}

export default Languages;
