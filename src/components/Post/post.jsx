/**
User: Daniela Rusu
Date: 9 aprilie 2024
Descriere: Facut template-ul la post, trebuie de vazut cum punem hover si click  la butoanele de like/dislike, comment si share

Patricia Onisor(01.05.2024)
Am adaugat pop-ul pt 3Dots
*/
<<<<<<< HEAD
import React, { useState } from 'react';
import './post.css';
import userProfile from './icons/user_profile.svg';
import threeDots from './icons/3-dots.svg';
import shareSVG from './icons/share.svg';
import downVotesSVG from './icons/shift_down.svg';
import upVotesSVG from './icons/shift_up.svg';
import commentsSVG from './icons/chat_bubble.svg';

import Comments from '../comments/Comments';

const Post = ({ userName, title, content, upVotesCount, commentsCount }) => {
  const [voted, setVoted] = useState(null); 
=======
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./post.css";
import DeleteConfirmationPopup from "./DeleteConfirmationPopup";
import userProfile from "./icons/user_profile.svg";
import threeDots from "./icons/3-dots.svg";
import shareSVG from "./icons/share.svg";
import downVotesSVG from "./icons/shift_down.svg";
import upVotesSVG from "./icons/shift_up.svg";
import commentsSVG from "./icons/chat_bubble.svg";
>>>>>>> 16f8f0a5b2364b0c0d18510b964f87439e9f487c

const Post = ({
  id,
  userName,
  title,
  content,
  upVotesCount,
  commentsCount,
}) => {
  const [voted, setVoted] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  //const userId = getCurrentUserIdFromCookies();
  
  const handleVote = (voteType) => {
    if (voted === voteType) {
      setVoted(null);
    } else {
      setVoted(voteType);
    }
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
        onDelete(id);
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
      });

    setShowDeleteConfirmation(false);
  };

  const handleCloseDeleteConfirmation = () => {
    setShowDeleteConfirmation(false);
  };

  return (
    <div>
    <div className="post">
      <div className="postHeader">
        <div className="userHeader">
          <img src={userProfile} alt="Header" className="userProfileImage" />
          <h2>{userName}</h2>
        </div>

        <div
          className="three-dots"
          onMouseEnter={() => setMenuVisible(true)}
          onMouseLeave={() => setMenuVisible(false)}
        >
          <button onClick={toggleMenu}>
            <img src={threeDots} alt="ThreeDots" />
          </button>
          {menuVisible && (
            <div className="post_menu">
              <button className="post_menu_btn">Report</button>
              <button className="post_menu_btn">Edit</button>
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
          <p>{upVotesCount + (voted === "upvote" ? 1 : 0)}</p>
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
            <img src={commentsSVG} alt="Comments" className="SVG" />
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
   { /*<Comments currentUserId = "1"/>*/}
   <Comments/>
    </div>
  );
};

export default Post;
