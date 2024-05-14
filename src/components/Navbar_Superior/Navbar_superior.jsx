import React, { useState } from 'react';
import { Link } from "react-router-dom";
// import { useNavbarContext } from './NavbarContext';
import SearchBar from './SearchBar';
import './Navbar_superior.css';
import Navbar from '../SideNavbar/Navbar';
import logoFull from "./media/Logo-full-IT.svg"
import logoMascota from "./media/Logo-mascota-IT.svg"
import messagesIcon from "./media/messagesIcon.svg"
import notificationsIcon from "./media/notificationsIcon.svg"
import userProfileHolder from "./media/User.svg"
import searchIconNavbar from "./media/searchIconNavbar.svg"

function Navbar_superior() {
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);

  const toggleMenu = () => {
    setIsNavbarVisible(!isNavbarVisible);
    console.log(isNavbarVisible); // Verifică în consolă dacă starea se schimbă corect
  };

  // const { toggleNavbarVisibility } = useNavbarContext();

  return (
    <nav className="navbar_superior">
      <div className="navbar-superior-container">
        <div className="small-screen-navbar-left-items">
          <button className="hamburger-menu " onClick={toggleMenu}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
          <img src={logoMascota} alt="Logo-mascota" className="logo-mascota" />
          <img src={logoFull} alt="Logo" className="logo-full" />
        </div>
        <SearchBar />
        <div className="right-buttons-nav-superior">
          <Link className='searchButton-navbar' to="/"> {/*acesta apare numai la device uri la cu ecranul mai mic de 769px si la click ar trebui sa apara search-barul*/}
          <img src={searchIconNavbar} alt="" className="searchIconNavbar" />
          </Link>
          <Link className='messagesButton-navbar' to="/"> {/*linkare la pagina cu chat ul */}
            <img src={messagesIcon} alt="" className="messagesIcon" />
          </Link>
          <img src={notificationsIcon} alt="" className="notificationsIcon" />
          <Link to="/" className='userProfileButton'> {/*linkare la pagina userului */}
            <img src={userProfileHolder} alt="" className="profileHolderNavSuperior" />
          </Link>
          <Link to="/"> {/* linkare la login page | stergere local storage*/}
            <button className="nav-superior-button-primary">Log out</button>
          </Link>
        </div>
      </div>
      {isNavbarVisible && <Navbar />}
    </nav>
  );
}

export default Navbar_superior;
