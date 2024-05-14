import React, { useState } from "react";
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

  return (
    <div className="popup_create">
      <button className="X_btn" onClick={handleClose}>
        <img src={close} alt="close" />
      </button>
      <div className="popup-inner">
        <h2 className="header_edit">{t("createNewPost")}</h2>
        <div>
          <CategoryDropdown onSelectCategory={setCategory} />
        </div>
        <div>
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
        <div>
          <label htmlFor="content" className="edit_content_header">
            {t("newPostContent")}
          </label>
          <input
            id="content"
            className="edit_content"
            placeholder={t("createp2")}
            value={content}
            onChange={handleContentChange}
          />
        </div>
        <div>
          <input
            type="file"
            id="file"
            className="upload_input_create"
            onChange={handleFileChange}
          />
        </div>
        <div className="buttons_section">
          <button className="cancel" onClick={handleClose}>
            {t("cancel")}
          </button>
          <button className="save" onClick={handleCreate}>
            {t("post")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostForm;
