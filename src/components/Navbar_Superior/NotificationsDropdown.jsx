import React, { useState } from 'react';
import closeNotifications from "./media/closeNotifications.svg"
import notificationsIcon from "./media/notificationsIcon.svg"
import './NotificationsDropdown.css'


function NotificationsDropdown({ isNotificationsOpen, toggleNotifications }) {
    const handleCloseDropdown = () => {
      toggleNotifications();
    };
  
    const handleOutsideClick = (event) => {
      if (!event.target.closest('.notifications-dropdown')) {
        toggleNotifications();
      }
    };
  
    React.useEffect(() => {
      document.addEventListener('click', handleOutsideClick);
      return () => {
        document.removeEventListener('click', handleOutsideClick);
      };
    }, []);
  
    return (
      <div className={`notifications-dropdown ${isNotificationsOpen ? 'open' : ''}`}>
        {/* Restul conținutului dropdown-ului de notificări */}
      </div>
    );
  }

export default NotificationsDropdown;

