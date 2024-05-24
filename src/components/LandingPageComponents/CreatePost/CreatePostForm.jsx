import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import CategoryDropdown from "./CategoryDropdown";
import close from "./media/close.svg";
import "./CreatePostForm.css";
import { useTranslation } from "react-i18next";

const CreatePostForm = ({ onCreate, onCancel }) => {
  const { t } = useTranslation();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const popupRef = useRef(null);  // Reference pentru popup


  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleCreate = () => {
    console.log("Title: ", title);
    console.log("Content: ", content);
    console.log("Category: ", category);
    onCreate(title, content, category, file);
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

  return (
    <section className="relative-parent">
      <div className="glass-bg-blur">
      <div className="popup_create" ref={popupRef}>
        <div className="popup-inner">
          <div className="header-post-create-popup">
            <h2 className="header_edit">{t("createNewPost")}</h2>
            <button className="X_btn" onClick={handleClose}>
              <img className="close-button-popup" src={close} alt="close" />
            </button>
          </div>
          <div>
            <CategoryDropdown onSelectCategory={setCategory} />
          </div>
          <div className="input-popup-wrapper">
            <label className="title" htmlFor="title">
              {t("newPostTitle")}
            </label>
            <input
              className="title_content"
              type="text"
              id="title"
              placeholder={t("createp1")}
              value={title}
              onChange={handleTitleChange}
            />
          </div>
          <div className="input-popup-wrapper">
            <label htmlFor="content" className="edit_content_header">
              {t("newPostContent")}
            </label>
            <textarea
              id="content"
              className="edit_content"
              placeholder={t("createp2")}
              value={content}
              onChange={handleContentChange}
            />
          </div>
          <div className="create-post-popup-buttons">
            <input
              type="file"
              id="file"
              className="upload_input_create"
              onChange={handleFileChange}
            />
            <div className="buttons_section">
              <button className="button-popup sec-btn" onClick={handleClose}>
                {t("cancel")}
              </button>
              <button className="button-popup primary-btn" onClick={handleCreate}>
                {t("post")}
              </button>
            </div>
          </div>

        </div>
      </div>
      </div>
    </section>
       
    
  );
};

export default CreatePostForm;

