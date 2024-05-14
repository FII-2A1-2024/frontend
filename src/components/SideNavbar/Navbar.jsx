import React, { useState } from 'react';
import { Link } from "react-router-dom";
// import { useNavbarContext } from '../Navbar_Superior/NavbarContext';
import './Navbar.css';
import popularIconRed from "./icons-dark-red/popularIcon.svg"
import coursesIconRed from "./icons-dark-red/coursesIcon.svg"
import professorsIconRed from "./icons-dark-red/professorsIcon.svg"
import studentsIconRed from "./icons-dark-red/studentsIcon.svg"
import unrelatedIconRed from "./icons-dark-red/unrelatedIcon.svg"
import memesIconRed from "./icons-dark-red/memesIcon.svg"
import savedIconRed from "./icons-dark-red/savedIcon.svg"
import jobsIconRed from "./icons-dark-red/jobsIcon.svg"
import rulesIconRed from "./icons-dark-red/rulesIcon.svg"
import settingsIconRed from "./icons-dark-red/settingsIcon.svg"
import popularIconWhite from "./icons-white/popularIcon-white.svg"
import coursesIconWhite from "./icons-white/coursesIcon-white.svg"
import professorsIconWhite from "./icons-white/professorsIcon-white.svg"
import studentsIconWhite from "./icons-white/studentsIcon-white.svg"
import unrelatedIconWhite from "./icons-white/unrelatedIcon-white.svg"
import memesIconWhite from "./icons-white/memesIcon-white.svg"
import savedIconWhite from "./icons-white/savedIcon-white.svg"
import jobsIconWhite from "./icons-white/jobsIcon-white.svg"
import rulesIconWhite from "./icons-white/rulesIcon-white.svg"
import settingsIconWhite from "./icons-white/settingsIcon-white.svg"

function Navbar() {
  const [isHidden, setIsHidden] = useState(false);
  // const { isNavbarHidden } = useNavbarContext();


  const toggleMenu = () => {
    setIsHidden(!isHidden); // Inversăm valoarea lui isHidden
  };

  const [activeItem, setActiveItem] = useState('popular'); // Starea care reține elementul activ

  // Funcție pentru a seta elementul activ
  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <nav className="navbar" style={{ display: isHidden ? 'none' : 'block' }}>
      <div className="navbar-container">
        {/* Momentat este implementat dupa cum trebuie doar populars si rules tinand cont ca au linkuri. Daca le setez pe toate asa cum primul, se fac active toate ca nu au linkate ceva */}
        <Link to='/' className="navbar-link" isActive={(match, location) => location.pathname === '/'}>
          <div className={`side-bar-item ${location.pathname === '/' ? 'active' : ''}`}>
            <img src={location.pathname === '/' ? popularIconWhite : popularIconRed} alt="popularIcon" className="side-bar-item-icon" />
            <span className="navbar-link-text">Popular</span>
          </div>
        </Link>

        <div className="break"></div>
        {/* Categories */}

        {/* <Link to='/' className="navbar-link" isActive={(match, location) => location.pathname === '/'}>
          <div className={`side-bar-item ${location.pathname === '/' ? 'active' : ''}`}>
            <img src={location.pathname === '/' ? coursesIconWhite : coursesIconRed} alt="coursesIcon" className="side-bar-item-icon" />
            <span className="navbar-link-text">Courses</span>
          </div>
        </Link> */}

        <div className={`side-bar-item ${activeItem === 'courses' ? 'active' : ''}`} onClick={() => handleItemClick('courses')}>
          <img src={activeItem === 'courses' ? coursesIconWhite : coursesIconRed} alt="coursesIcon" className="side-bar-item-icon" />
          <Link to='/' className="navbar-link">Courses</Link>
        </div>

        {/* <Link to='/' className="navbar-link" isActive={(match, location) => location.pathname === '/'}>
          <div className={`side-bar-item ${location.pathname === '/' ? 'active' : ''}`}>
            <img src={location.pathname === '/' ? professorsIconWhite : professorsIconRed} alt="professorsIcon" className="side-bar-item-icon" />
            <span className="navbar-link-text">Professors</span>
          </div>
        </Link> */}

        <div className={`side-bar-item ${activeItem === 'professors' ? 'active' : ''}`} onClick={() => handleItemClick('professors')}>
          <img src={activeItem === 'professors' ? professorsIconWhite : professorsIconRed} alt="professorsIcon" className="side-bar-item-icon" />
          <Link to='/' className="navbar-link">Professors</Link>
        </div>

        {/* <Link to='/' className="navbar-link" isActive={(match, location) => location.pathname === '/'}>
          <div className={`side-bar-item ${location.pathname === '/' ? 'active' : ''}`}>
            <img src={location.pathname === '/' ? studentsIconWhite : studentsIconRed} alt="studentsIcon" className="side-bar-item-icon" />
            <span className="navbar-link-text">Students</span>
          </div>
        </Link> */}

        <div className={`side-bar-item ${activeItem === 'students' ? 'active' : ''}`} onClick={() => handleItemClick('students')}>
          <img src={activeItem === 'students' ? studentsIconWhite : studentsIconRed} alt="studentsIcon" className="side-bar-item-icon" />
          <Link to='/' className="navbar-link">Students</Link>
        </div>

        {/* <Link to='/' className="navbar-link" isActive={(match, location) => location.pathname === '/'}>
          <div className={`side-bar-item ${location.pathname === '/' ? 'active' : ''}`}>
            <img src={location.pathname === '/' ? unrelatedIconWhite : unrelatedIconRed} alt="unrelatedIcon" className="side-bar-item-icon" />
            <span className="navbar-link-text">Unrelated</span>
          </div>
        </Link> */}

        <div className={`side-bar-item ${activeItem === 'unrelated' ? 'active' : ''}`} onClick={() => handleItemClick('unrelated')}>
          <img src={activeItem === 'unrelated' ? unrelatedIconWhite : unrelatedIconRed} alt="unrelatedIcon" className="side-bar-item-icon" />
          <Link to='/' className="navbar-link">Unrelated</Link>
        </div>

        {/* <Link to='/' className="navbar-link" isActive={(match, location) => location.pathname === '/'}>
          <div className={`side-bar-item ${location.pathname === '/' ? 'active' : ''}`}>
            <img src={location.pathname === '/' ? memesIconWhite : memesIconRed} alt="memesIcon" className="side-bar-item-icon" />
            <span className="navbar-link-text">Memes</span>
          </div>
        </Link> */}

        <div className={`side-bar-item ${activeItem === 'memes' ? 'active' : ''}`} onClick={() => handleItemClick('memes')}>
          <img src={activeItem === 'memes' ? memesIconWhite : memesIconRed} alt="memesIcon" className="side-bar-item-icon" />
          <Link to='/' className="navbar-link">Memes</Link>
        </div>

        {/* <Link to='/' className="navbar-link" isActive={(match, location) => location.pathname === '/'}>
          <div className={`side-bar-item ${location.pathname === '/' ? 'active' : ''}`}>
            <img src={location.pathname === '/' ? jobsIconWhite : jobsIconRed} alt="jobsIcon" className="side-bar-item-icon" />
            <span className="navbar-link-text">Jobs</span>
          </div>
        </Link> */}

        <div className={`side-bar-item ${activeItem === 'jobs' ? 'active' : ''}`} onClick={() => handleItemClick('jobs')}>
          <img src={activeItem === 'jobs' ? jobsIconWhite : jobsIconRed} alt="jobsIcon" className="side-bar-item-icon" />
          <Link to='/' className="navbar-link">Jobs</Link>
        </div>

        {/* <Link to='/' className="navbar-link" isActive={(match, location) => location.pathname === '/'}>
          <div className={`side-bar-item ${location.pathname === '/' ? 'active' : ''}`}>
            <img src={location.pathname === '/' ? savedIconWhite : savedIconRed} alt="savedIcon" className="side-bar-item-icon" />
            <span className="navbar-link-text">Saved</span>
          </div>
        </Link> */}

        <div className={`side-bar-item ${activeItem === 'saved' ? 'active' : ''}`} onClick={() => handleItemClick('saved')}>
          <img src={activeItem === 'saved' ? savedIconWhite : savedIconRed} alt="savedIcon" className="side-bar-item-icon" />
          <Link to='/' className="navbar-link">Saved</Link>
        </div>

        <div className="break"></div>


        {/* Settings and other */}

        <Link to='/rules' className="navbar-link" isActive={(match, location) => location.pathname === '/rules'}>
          <div className={`side-bar-item ${location.pathname === '/rules' ? 'active' : ''}`}>
            <img src={location.pathname === '/rules' ? rulesIconWhite : rulesIconRed} alt="rulesIcon" className="side-bar-item-icon" />
            <span className="navbar-link-text">Rules</span>
          </div>
        </Link>

        {/* <Link to='/' className="navbar-link" isActive={(match, location) => location.pathname === '/'}>
          <div className={`side-bar-item ${location.pathname === '/' ? 'active' : ''}`}>
            <img src={location.pathname === '/' ? settingsIconWhite : settingsIconRed} alt="popularIcon" className="side-bar-item-icon" />
            <span className="navbar-link-text">Settings</span>
          </div>
        </Link> */}

        <div className={`side-bar-item ${activeItem === 'settings' ? 'active' : ''}`} onClick={() => handleItemClick('settings')}>
            <img src={activeItem === 'settings' ? settingsIconWhite : settingsIconRed} alt="settingsIcon" className="side-bar-item-icon" />
            <Link to='/' className="navbar-link">Settings</Link>
          </div>
      </div>
    </nav>
  );
}

export default Navbar;
