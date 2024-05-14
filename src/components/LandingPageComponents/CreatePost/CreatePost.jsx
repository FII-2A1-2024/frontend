/**
User: Patricia
Date: 1 mai 2024
Description: template-ul la create post
*/
import React, { useState, useEffect } from "react";
import CreatePostForm from "../CreatePost/CreatePostForm";
import axios from "axios";
import "./CreatePost.css";
import userProfile from "./media/user_profile.svg";
import { useTranslation } from "react-i18next";

const CreatePost = (userName) => {
  const { t } = useTranslation();
  const [showCreatePostForm, setShowCreatePostForm] = useState(false);
  const userId = parseInt(localStorage.getItem("UserId"), 10);

  const handleCreate = (title, content, category, file) => {
    const formData = new FormData();
    formData.append("author_id", userId);
    formData.append("title", title);
    formData.append("description", content);
    formData.append("votes", "0");
    formData.append("category", category);
    formData.append("file", file);
    axios
      .post(`http://localhost:3000/posts`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Post created successfully");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error creating post:", error);
      });
  };

  const handleClose = () => {
    setShowCreatePostForm(false);
  };

  return (
    <div className="createPost_frame">
      <img src={userProfile} alt="Header" className="userProfileImage" />
      <button
        className="createPost_redirect"
        onClick={() => setShowCreatePostForm(true)}
      >
        {t("createPost")}
      </button>
      {showCreatePostForm && (
        <CreatePostForm onCreate={handleCreate} onCancel={handleClose} />
      )}
    </div>
  );
};

export default CreatePost;
