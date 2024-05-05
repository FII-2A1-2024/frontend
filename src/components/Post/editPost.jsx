import React, { useState } from "react";
import axios from "axios";
import close from "../../media/icons/close.svg"
import "./editPost.css";

const EditPopup = ({
  currentTitle,
  currentContent,
  onSave, onCancel
}) => {
  const [editedTitle, setEditedTitle] = useState(currentTitle);
  const [editedContent, setEditedContent] = useState(currentContent);
  
  const handleSave = () => {
    onSave(editedTitle, editedContent, "testing");
  };

  const handleClose = () => {
    onCancel();
  };

  const handleContentChange = (event) => {
    setEditedContent(event.target.value);
  };

  const handleTitleChange = (event) => {
    setEditedTitle(event.target.value);
  };

  return (
    <div className="popup">  <button className="X_btn" onClick={handleClose}><img src={close} alt="close" /></button>
      <div className="popup-inner">
        <h2 className="header_edit">Edit Post</h2>
      
        <div>
          {/*<label htmlFor="category">Category:</label>
                    <select id="category" value={category} onChange={handleCategoryChange}>
                        {categoryOptions.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                    </select>*/}
        </div>
        <div>
          <label className="title" htmlFor="title">
            Title:
          </label>
          <input
            className="title_content"
            type="text"
            id="title"
            value={currentTitle}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <label htmlFor="content" className="edit_content_header">
            Content:
          </label>
          <textarea
            id="content"
            className="edit_content"
            value={currentContent}
            onChange={handleContentChange}
          />
        </div>
        <div className="buttons_section">
          <button className="cancel" onClick={handleClose}>
            Cancel
          </button>
          <button className="save" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPopup;
