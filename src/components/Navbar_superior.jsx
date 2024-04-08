
import React from 'react';
import SearchBar from './SearchBar';
import AuthButton from './AuthButton';
import './Navbar_superior.css'; 

function Navbar_superior() {
  return (
    <nav className="navbar_superior">
      <div className="navbar-superior-container">
        <AuthButton />
        <SearchBar />
      </div>
    </nav>
  );
}

export default Navbar_superior;
