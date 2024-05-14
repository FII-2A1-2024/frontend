import React, {useState} from "react";
import Navbar_superior from "../components/Navbar_Superior/Navbar_superior";
import Navbar from "../components/SideNavbar/Navbar";
import Rules from "../components/Rules/Rules";
import "../styles/LandingPage.css";

/*20.04 Patricia */

function RulesPage() {
  const [showNavbar, setShowNavbar] = useState(true);
  const toggleNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  return (
    <div className="landing-page">

      <Navbar_superior toggleNavbar={toggleNavbar} />

      <div className="landing-page-content">
        {showNavbar && <div className="landing-sidebar">
          <Navbar />
        </div>}
        <div className="landing-main-content">

          <Rules />

        </div>
      </div>
    </div>
  );
}

export default RulesPage;


// return (
//     <>
//       <Navbar_superior />
//       <div style={{ backgroundColor: "white" }}>
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "row",
//             backgroundColor: "white",
//             width: "100%",

//           }}
//         >
//           <Navbar />
//           <Rules />
//         </div>
//       </div>
//     </>
//   );