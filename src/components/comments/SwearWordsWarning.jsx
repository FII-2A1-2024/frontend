import React, { useState } from 'react';
import './DeleteConfirmationPopup.css';

const SwearWordsWarning = ({ onDelete, onClose }) => {
  return (
    <div className="delete-confirmation-popup">
      <div className="delete-confirmation-text-wrapper">
        <h2>Delete post</h2>
        <p>Are you sure you want to delete your post? All data including comments will be deleted.</p>
      </div>
      <div className="delete-confirmation-buttons">
        <button className="button-popup sec-btn" onClick={onClose}>Cancel</button>
        <button className="button-popup primary-btn" onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

export default SwearWordsWarning;
