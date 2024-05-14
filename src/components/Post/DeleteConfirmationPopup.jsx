import React, { useState } from 'react';
import './DeleteConfirmationPopup.css';

const DeleteConfirmationPopup = ({ onDelete, onClose }) => {
  return (
    <div className="delete-confirmation-popup">
      <p>All data including comments will be deleted. Are you sure?</p>
      <div className="delete-confirmation-buttons">
        <button onClick={onDelete}>Yes</button>
        <button onClick={onClose}>No</button>
      </div>
    </div>
  );
};

export default DeleteConfirmationPopup;
