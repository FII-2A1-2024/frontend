import Modal from 'react-modal';
import axios from 'axios';
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "./ReportPost.css";

// Setting the app element for accessibility
Modal.setAppElement('#root');

const ReportModal = ({ isOpen, onRequestClose, onSubmit, postId }) => {
  const [selectedReason, setSelectedReason] = useState('');

  const handleSubmit = () => {
    if (selectedReason) {
      const token = localStorage.getItem('token'); 
      axios.post(`${import.meta.env.VITE_URL_BACKEND}/posts/report`, {
        post_id: postId,
        reason: selectedReason,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        onSubmit(response.data.message);
        setSelectedReason('');
        console.log("Reported successfully");
      })
      .catch(error => {
        console.error("Error reporting post:", error);
        onSubmit("Error reporting post");
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Report Post Modal"
    >
      <div className="ModalTitle">
        <h2>Report Post</h2>
      </div>
      <p>Your report helps us ensure a safe community. Please select a reason from the dropdown menu. Thank you for your contribution.</p>
      <div className="dropdown-report-reasons">
        <select
          value={selectedReason}
          onChange={(e) => setSelectedReason(e.target.value)}
        >
          <option value="">Select a reason</option>
          <option value="Unlawful content">Unlawful content</option>
          <option value="Harmful content">Harmful content</option>
          <option value="Threats">Threats</option>
          <option value="Abuse">Abuse</option>
          <option value="Defamation">Defamation</option>
          <option value="Hate speech">Hate speech</option>
          <option value="Discrimination">Discrimination</option>
          <option value="Spam">Spam</option>
        </select>
      </div>
      <div className="modal-buttons-popup">
        <button className='button-popup sec-btn' onClick={onRequestClose}>Cancel</button>
        <button className="button-popup primary-btn" onClick={handleSubmit}>Submit</button>
      </div>
    </Modal>
  );
};

export default ReportModal;
