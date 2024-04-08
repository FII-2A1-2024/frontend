import React, { useState } from 'react';

function SearchBar() {
  // Starea care reține valoarea introdusă în bara de căutare
  const [searchQuery, setSearchQuery] = useState('');

  // Funcție care este apelată de fiecare dată când utilizatorul introduce sau șterge text în câmpul de căutare
  const handleSearchInputChange = (event) => {
    // Actualizează valoarea stării searchQuery cu textul introdus de utilizator
    setSearchQuery(event.target.value);
  };

  return (
    <div className="search-container">
      <form className="search-form">
        {/* 
          Câmpul de căutare unde utilizatorul poate introduce text
          Valoarea câmpului este mereu aceeași cu valoarea stării searchQuery
          Funcția handleSearchInputChange este apelată la fiecare schimbare a valorii în câmpul de căutare
        */}
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      </form>
    </div>
  );
}

export default SearchBar;

