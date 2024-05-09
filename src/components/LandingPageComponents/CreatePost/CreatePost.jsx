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

const CreatePost = (userName) => {
  const [showCreatePostForm, setShowCreatePostForm] = useState(false);

  const handleCreate = (title, content, category) => {
    setShowCreatePostForm(true);
    {
      axios
        .post(`http://localhost:3000/posts`, {
          author_id: 5,
          title: title,
          description: content,
          votes: 1,
          category: category,
        })
        .then((response) => {
          console.log("Post title updated successfully");
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error updating post:", error);
        });
    }
  };

  const handleClose = () => {
    setShowCreatePostForm(false);
  };

  return (
    <div className="createPost_frame">
      <img src={userProfile} alt="Header" className="userProfileImage" />
      <button className="createPost_redirect" onClick={handleCreate}>
        Ask a question or write a new post
      </button>
      {showCreatePostForm && (
        <CreatePostForm onCreate={handleCreate} onCancel={handleClose} />
      )}
    </div>
  );
};

export default CreatePost;
