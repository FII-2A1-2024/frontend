import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './NavbarSettings.css'; 
import AccountCircleIcon from "../media/icons/account-unpushed.svg"; 
import NotificationsIcon from "../media/icons/notifications-unpushed.svg"; 
import PrivacyIcon from "../media/icons/privacy-unpushed.svg"; 
import HelpIcon from "../media/icons/help-unpushed.svg"; 
import SupportIcon from "../media/icons/support-unpushed.svg"; 
import LanguagesIcon from "../media/icons/language-pushed.svg"; 


function NavbarSettings() {
  const [isHidden, setIsHidden] = useState(false);

  const toggleMenu = () => {
    setIsHidden(!isHidden);
  };
  return (
    <nav className="navbar">  {/* daca a fost apasat pe buton-ul de restrangere*/}
      {isHidden ? (
        <div className="hidden-container">
          <button className="close-btn" onClick={toggleMenu}>&gt;</button>
        </div>
      ) : ( 
        <div className="navbar-container"> {/*daca nu a fost apasat pe buton*/}
          <button className="close-btn" onClick={toggleMenu}>&lt;</button>
          <h1 className="settings-title-text">Settings</h1>

          <div className="break"></div>
          <ul className="categories"> 
            <li className="navbar-item">
              <Link to='/' className="navbar-link">
                <img src={AccountCircleIcon} alt="Account" className="icon" /> Account
              </Link>
            </li>
            <li className="navbar-item">
              <Link to='/' className="navbar-link">
                <img src={NotificationsIcon} alt="Notifications" className="icon" /> Notifications
              </Link>
            </li>
            <li className="navbar-item">
              <Link to='/' className="navbar-link">
                <img src={PrivacyIcon} alt="Privacy" className="icon" /> Privacy
              </Link>
            </li>
            <li className="navbar-item">
              <Link to='/' className="navbar-link">
                <img src={HelpIcon} alt="Help" className="icon" /> Help
              </Link>
            </li>
            <li className="navbar-item">
              <Link to='/' className="navbar-link">
                <img src={SupportIcon} alt="Support" className="icon" /> Support
              </Link>
            </li>
            <li className="navbar-item">
              <Link to='/' className="navbar-link-button-pushed">
                <img src={LanguagesIcon} alt="Languages" className="icon" /> Languages
              </Link>
            </li>

        </ul>

        </div>
        
      )}
    </nav>

  );
}

export default NavbarSettings;
