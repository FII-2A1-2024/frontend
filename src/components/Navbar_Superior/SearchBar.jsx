import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SearchBar.css';
import searchIcon from "./media/searchIcon.svg"
function SearchBar() {
  // Starea care reține valoarea introdusă în bara de căutare
  const [searchQuery, setSearchQuery] = useState('');

  // Funcție care este apelată de fiecare dată când utilizatorul introduce sau șterge text în câmpul de căutare
  const handleSearchInputChange = (event) => {
    // Actualizează valoarea stării searchQuery cu textul introdus de utilizator
    setSearchQuery(event.target.value);
  };

  const [filters, setFilters] = useState({
    category: 'All',
    in: ['Title', 'Content'],
    sort: 'Newest'
  });

  return (
    <div className="search-container">
      <form className="search-form">
      <img src={searchIcon} alt="Search" className="search-icon" />
        {/* 
          Câmpul de căutare unde utilizatorul poate introduce text
          Valoarea câmpului este mereu aceeași cu valoarea stării searchQuery
          Funcția handleSearchInputChange este apelată la fiecare schimbare a valorii în câmpul de căutare
        */}
        <input
          type="text"
          placeholder="Search IncogniTalk"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        {searchQuery.trim() !== '' && (
          <>
            <Link
              to={{
                pathname: `/searchBy/${encodeURIComponent(searchQuery)}`,
                state: filters
              }}
            >
              <button type="submit" style={{ display: 'none' }} aria-hidden="true">Search</button>
            </Link>
          </>
        )}

      </form>
    </div>
  );
}

export default SearchBar;

