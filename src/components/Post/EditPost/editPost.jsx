import React, { useState } from "react";
import CategoryDropdown from "../../LandingPageComponents/CreatePost/CategoryDropdown";
import axios from "axios";
import close from "../icons/close.svg";
import "./editPost.css";

const EditPopup = ({
  currentTitle,
  currentContent,
  currentCategory,
  currentFile,
  onSave,
  onCancel,
}) => {
  const [editedTitle, setEditedTitle] = useState(currentTitle);
  const [editedContent, setEditedContent] = useState(currentContent);
  const [editedCategory, setEditedCategory] = useState(currentCategory);
  const [editedFile, setEditedFile] = useState(currentFile);

  const handleSave = () => {
    onSave(editedTitle, editedContent, editedCategory, editedFile);
  };

  const handleClose = () => {
    onCancel();
  };

  const handleCategoryChange = (category) => {
    setEditedCategory(category);
  };

  const handleContentChange = (event) => {
    setEditedContent(event.target.value);
  };

  const handleTitleChange = (event) => {
    setEditedTitle(event.target.value);
  };

  const handleFileChange = (event) => {
    setEditedFile(event.target.files[0]);
  };

  return (
    <div className="popup">
      {" "}
      <button className="X_btn" onClick={handleClose}>
        <img src={close} alt="close" />
      </button>
      <div className="popup-inner">
        <h2 className="header_edit">Edit Post</h2>

        <div>
          <CategoryDropdown
            value={editedCategory}
            onSelectCategory={handleCategoryChange}
          />
        </div>
        <div>
          <label className="title" htmlFor="title">
            Title:
          </label>
          <input
            className="title_content"
            type="text"
            id="title"
            value={editedTitle}
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
            value={editedContent}
            onChange={handleContentChange}
          />
        </div>
        <div>
          <input
            type="file"
            id="file"
            className="upload_input"
            onChange={handleFileChange}
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
