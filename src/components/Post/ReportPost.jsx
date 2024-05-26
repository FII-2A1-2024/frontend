import React, { useState } from 'react';
import Modal from 'react-modal';
import "./ReportPost.css"

const ReportModal = ({ isOpen, onRequestClose, onSubmit }) => {
  const [selectedReason, setSelectedReason] = useState('');

  const handleSubmit = () => {
    if (selectedReason) {
      onSubmit(selectedReason);
      setSelectedReason('');
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
            <option value="Harmful content">Threats</option>
            <option value="Harmful content">Abuse</option>
            <option value="Harmful content">Defamation</option>
            <option value="Harmful content">Hate speech</option>
            <option value="Harmful content">Discrimination</option>
            <option value="Harmful content">Spam</option>
            {/* Adaugă alte opțiuni de motiv aici */}
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
