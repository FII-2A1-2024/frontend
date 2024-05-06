/**
User: Daniela Rusu
Date: 9 aprilie 2024
Descriere: Facut template-ul la post, trebuie de vazut cum punem hover si click  la butoanele de like/dislike, comment si share

Patricia Onisor(01.05.2024)
Am adaugat pop-ul pt 3Dots
*/
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./post.css";
import DeleteConfirmationPopup from "./DeleteConfirmationPopup";
import EditPopup from "../EditPost/editPost";
import userProfile from "./icons/user_profile.svg";
import threeDots from "./icons/3-dots.svg";
import shareSVG from "./icons/share.svg";
import downVotesSVG from "./icons/shift_down.svg";
import upVotesSVG from "./icons/shift_up.svg";
import commentsSVG from "./icons/chat_bubble.svg";

import Comments from "../comments/Comments";

const Post = ({
  id,
  userName,
  title,
  content,
  upVotesCount,
  commentsCount,
  category,
}) => {
  const [voted, setVoted] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  //const userId = getCurrentUserIdFromCookies();
  const [initialVote, setInitialVote] = useState(upVotesCount);
  const [showEditPopup, setShowEditPopup] = useState(false);

  useEffect(() => {
    if (initialVote > upVotesCount) {
      setVoted("upvote");
    } else if (initialVote < upVotesCount) {
      setVoted("downvote");
    }
  }, []);

  const handleVote = (voteType) => {
    if (voteType === "upvote" && voted !== "upvote") {
      setVoted("upvote");
      updateVoteCount(id, upVotesCount + 1);
    } else if (voteType === "downvote" && voted !== "downvote") {
      setVoted("downvote");
      updateVoteCount(id, upVotesCount - 1);
    } else {
      setVoted(null);
      updateVoteCount(id, upVotesCount);
    }
  };

  const updateVoteCount = (postId, voteCount) => {
    axios
      .put(`http://localhost:3000/posts`, {
        id: postId,
        votes: voteCount,
      })
      .then((response) => {
        console.log("Vote count updated successfully");
      })
      .catch((error) => {
        console.error("Error updating vote count:", error);
      });
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleDelete = () => {
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = () => {
    axios
      .delete(`http://localhost:3000/posts?id=${id}`)
      .then((response) => {
        console.log("Post deleted successfully");
        window.location.reload();
        setShowDeleteConfirmation(false);
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
      });
  };

  const handleCloseDeleteConfirmation = () => {
    setShowDeleteConfirmation(false);
  };

  const handleEdit = () => {
    setShowEditPopup(true);
  };

  const handleSave = (editedTitle, editedContent, editedCategory) => {
    updateTitle(editedTitle);
    updateContent(editedContent);
    updateCategory(editedCategory);
    window.location.reload();
  };

  const updateTitle = (new_title) => {
    axios
      .put(`http://localhost:3000/posts`, {
        id: id,
        title: new_title,
      })
      .then((response) => {
        console.log("Post title updated successfully");
      })
      .catch((error) => {
        console.error("Error updating post title:", error);
      });
  };

  const updateContent = (new_content) => {
    axios
      .put(`http://localhost:3000/posts`, {
        id: id,
        description: new_content,
      })
      .then((response) => {
        console.log("Post content updated successfully");
      })
      .catch((error) => {
        console.error("Error updating post content:", error);
      });
  };

  const updateCategory = (new_category) => {
    axios
      .put(`http://localhost:3000/posts`, {
        id: id,
        category: new_category,
      })
      .then((response) => {
        console.log("Post category updated successfully");
      })
      .catch((error) => {
        console.error("Error updating post category:", error);
      });
  };

  const handleCancel = () => {
    setShowEditPopup(false);
  };

  return (
    <div>
    <div className="post">
      <div className="postHeader">
        <div className="userHeader">
          <img src={userProfile} alt="Header" className="userProfileImage" />
          <Link to="/conversation" style={{ color: "black" }}>
            <h2>{userName}</h2>
          </Link>
        </div>

        <div
          className="three-dots"
          onMouseEnter={() => setMenuVisible(true)}
          onMouseLeave={() => setMenuVisible(false)}
        >
          <button onClick={toggleMenu} button="true">
            <img src={threeDots} alt="ThreeDots" />
          </button>
          {menuVisible && (
            <div className="post_menu">
              <button className="post_menu_btn">Report</button>
              <button className="post_menu_btn">Save</button>
              <button className="post_menu_btn" onClick={handleEdit}>
                Edit
              </button>
              <button className="post_menu_btn" onClick={handleDelete}>
                Delete
              </button>
            </div>
          )}

          {/* 
          {userId === authorId && menuVisible && (
            <div className="post_menu">
              <button className="post_menu_btn">Edit</button>
              <button className="post_menu_btn" onClick={handleDelete}>
                Delete
              </button>
            </div>
          )}
          
          {userId !== authorId && menuVisible && (
            <div className="post_menu">
              <button className="post_menu_btn">Report</button>
          )}
          */}

          {showEditPopup && (
            <EditPopup
              currentCategory={category}
              currentContent={content}
              currentTitle={title}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          )}

          {/* Delete confirmation popup */}
          {showDeleteConfirmation && (
            <DeleteConfirmationPopup
              onDelete={handleConfirmDelete}
              onClose={handleCloseDeleteConfirmation}
            />
          )}
        </div>
      </div>

      <div className="postArticle">
        <h1>{title}</h1>
        <p>{content} </p>
      </div>

      <div className="feedback-section">
        {/* Likes/DisLike Button */}
        <div className="feedback-container">
          <div className="btn btn-upvotes" onClick={() => handleVote("upvote")}>
            <img src={upVotesSVG} alt="upVotes" />
          </div>
          <p>
            {upVotesCount +
              (voted === "upvote" ? 1 : voted === "downvote" ? -1 : 0)}
          </p>
          <div
            className="btn btn-downVotes"
            onClick={() => handleVote("downvote")}
          >
            <img src={downVotesSVG} alt="downVotes" />
          </div>
        </div>

        {/* Comments Button*/}
        <div className="feedback-container comm-btn">
          <div className="btn">
            <Link to="/post" style={{ color: "black" }}>
              <img src={commentsSVG} alt="Comments" className="SVG" />
            </Link>
          </div>

          <p>{commentsCount}</p>
        </div>

        {/* Shares Button */}
        <div className="feedback-container">
          <div className="btn btn-share">
            <img src={shareSVG} alt="Share" />
          </div>
          <p>Share</p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Post;
