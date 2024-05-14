import React, { createContext, useContext, useState } from 'react';

// Cream contextul pentru starea Navbar
const NavbarContext = createContext();

// Hook-ul custom pentru a accesa starea Navbar
export const useNavbarContext = () => useContext(NavbarContext);

// Componenta Provider care va înconjura întreaga aplicație și va oferi starea Navbar
export const NavbarProvider = ({ children }) => {
  const [isNavbarHidden, setIsNavbarHidden] = useState(false);

  const toggleNavbarVisibility = () => {
    setIsNavbarHidden(prevState => !prevState);
  };

  return (
    <NavbarContext.Provider value={{ isNavbarHidden, toggleNavbarVisibility }}>
      {children}
    </NavbarContext.Provider>
  );
};

