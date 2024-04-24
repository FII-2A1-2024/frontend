import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './Navbar.css'; 

function Navbar() {
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
          <ul className='hot-topics'> 
            <li>
              <Link to='/' className="hot-topics-link"># Popular</Link>
            </li>
          </ul>{/*topicurile populare*/}
          <div className="break"></div>
          <ul className="categories"> 
            <li className="navbar-item">
                <Link to='/' className="navbar-link"># Courses</Link>
            </li>
            <li className="navbar-item">
                <Link to='/' className="navbar-link"># Professors</Link>
            </li>
            <li className="navbar-item">
                <Link to='/' className="navbar-link"># Students</Link>
            </li>
            <li className="navbar-item">
                <Link to='/' className="navbar-link"># Unrelated</Link>
            </li>
            <li className="navbar-item">
                <Link to='/' className="navbar-link"># Memes</Link>
            </li>
            <li className="navbar-item">
                <Link to='/' className="navbar-link"># Jobs</Link>
            </li>
        </ul>
        <div className="break"></div>
        <ul className="administartiv"> {/*setari si alte butoane default*/}
            <li className="navbar-item">
                <Link to='/' className="navbar-link">Rules</Link>
            </li>
            <li className="navbar-item">
                <Link to='/' className="navbar-link">Help</Link>
            </li>
            <li className="navbar-item">
                <Link to='/' className="navbar-link">Support</Link>
            </li>
            <li className="navbar-item">
                <Link to='/' className="navbar-link">Settings</Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
