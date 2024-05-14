import { Link } from "react-router-dom";
import Navbar_superior from "../../components/Navbar_superior";
import NavbarSettings from "../../components/NavbarSettings";
import Languages from "../../components/Languages";

import "../../styles/LandingPage.css";

function LanguageSettingsPage() {
  return (
    <>
      <div className="landing-page">
      <Navbar_superior />
      <div className="landing-content">
        <NavbarSettings />
        <Languages />
      </div>
    </div>
    </>
  );
}

export default LanguageSettingsPage;
