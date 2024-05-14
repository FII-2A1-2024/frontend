import React from "react";
import { Link } from "react-router-dom";
import "./AuthButton.css";
import { useTranslation } from "react-i18next";
import { useState } from "react";

function AuthButton() {
  const { t } = useTranslation();

  return (
    <div className="auth-buttons">
      <Link to="/">{t("loginButton")}</Link>
    </div>
  );
}

export default AuthButton;
