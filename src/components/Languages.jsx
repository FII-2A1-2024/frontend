import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Languages.css";

function Languages() {
  return (
    <div className="languages_container">
      <div className="title">
        <h1>Language settings</h1>
      </div>
      <div className="break"></div>
      <div className="content">
             <p>English</p>
         
             <p>Romanian</p>
         
             <p>Russian</p>
         
      </div>
    </div>
  );
}

export default Languages;
