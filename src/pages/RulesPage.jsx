import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar_superior from "../components/Navbar_superior";
import Navbar from "../components/Navbar";
import Rules from "../components/Rules/Rules";

/*20.04 Patricia */

function RulesPage() {
  return (
    <>
      <Navbar_superior />
      <div style={{ backgroundColor: "white" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "white",
            width: "100%",
          }}
        >
          <Navbar />
          <Rules /> 
        </div>
      </div>
    </>
  );
}

export default RulesPage;
