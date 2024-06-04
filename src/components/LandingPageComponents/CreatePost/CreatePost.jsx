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

const CreatePost = () => {
  const { t } = useTranslation();
  const [showCreatePostForm, setShowCreatePostForm] = useState(false);
  const userId = parseInt(localStorage.getItem("UserId"), 10);
  const username = localStorage.getItem("UserName");
  const token = localStorage.getItem("token");
  const [isPostWithSlurs, setIsPostWIthSlurs] = useState(false);

  const handleCreate = (title, content, category, file) => {
    axios
      .post(
        `${import.meta.env.VITE_URL_BACKEND}/posts`,
        {
          author_id: userId,
          title: title,
          username: localStorage.getItem("UserName"),
          description: content,
          category: category,
          votes: 0,
          file: file,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log("Post created successfully");
        window.location.reload();
      })
      .catch((error) => {

        if (error.response) {
          console.error("Error creating post:", error.response.data);
        } else if (error.request) {
          console.error(
            "Error creating post: No response received",
            error.request
          );
        } else {
          console.error("Error creating post:", error.message);
        }
        setIsPostWIthSlurs(true);
        setTimeout(() => {
          setIsPostWIthSlurs(false);
      }, 3000); 
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
      {isPostWithSlurs && <div className="btn_message_post">The post may contain slurs!</div>}
    </div>
  );
};

export default CreatePost;
