import React, { useState, useEffect, useRef } from "react";
import CategoryDropdown from "../../LandingPageComponents/CreatePost/CategoryDropdown";
import axios from "axios";
import close from "../icons/close.svg";
import "./editPost.css";
import "../../LandingPageComponents/CreatePost/CreatePostForm.css"

const EditPopup = ({
  id,
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
  const [editedFile, setEditedFile] = useState(null);
  const [fileChange, setFileChange] = useState(false);
  const popupRef = useRef(null);  // Reference pentru popup


  const handleSave = () => {
    onSave(editedTitle, editedContent, editedCategory, editedFile);
  };

  const handleClose = () => {
    onCancel();
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      handleClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCategoryChange = (category) => {
    setEditedCategory(category);
  };

  const handleContentChange = (event) => {
    setEditedContent(event.target.value);
  };

  const handleTitleChange = (event) => {
    setEditedTitle(event.target.value);
  };

  const handleFileAddition = (event) => {
    setEditedFile(event.target.files[0]);
  };

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setEditedFile(event.target.files[0]);
      setFileChange(true);
    }
  };

  const handleFileDelete = (event) => {
    axios
      .delete(`${import.meta.env.VITE_URL_BACKEND}/posts/file?id=${id}`)
      .then((response) => {
        console.log("Post file deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting post file:", error);
      });
  };

  return (
    <section className="relative-parent">
      <div className="glass-bg-blur">
        <div className="popup_edit" ref={popupRef}>
          {" "}

          <div className="popup-inner">
            <div className="header-post-create-popup">
              <h2 className="header_edit">Edit Post</h2>
              <button className="X_btn" onClick={handleClose}>
                <img src={close} alt="close" className="close-button-popup" />
              </button>
            </div>
          <div>
            <CategoryDropdown
              value={editedCategory}
              onSelectCategory={handleCategoryChange}
            />
          </div>
          <div className="input-popup-wrapper">
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
          <div className="input-popup-wrapper">
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
          <div className="create-post-popup-buttons">
            {currentFile ? (
              <div className="popup-file-buttons">
                <button onClick={() => setFileChange(true)} className="upload_input_change-btn" >Change file</button>
                <button onClick={handleFileDelete} className="upload_delete-btn">Delete file</button>
              </div>
            ) : (
              <input type="file"
                id="file"
                className="upload_input"
                onChange={handleFileAddition} />
            )}

            {fileChange && (
              <input
                type="file"
                id="file"
                className="upload_input_change"
                onChange={handleFileChange}
              />
            )}
            {/*
              <input
                type="file"
                id="file"
                className="upload_input"
                onChange={handleFileChange}
              />*/}

            <div className="buttons_section">
              <button className="button-popup sec-btn" onClick={handleClose}>
                Cancel
              </button>
              <button className="button-popup primary-btn" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>

  );
};

export default EditPopup;