/**
User: Daniela Rusu
Date: 9 april 2024
Description: template-ul la post

Patricia Onisor(01.05.2024)
Description: pop-ul pt 3Dots, delete confirmation and delete function, edit popup and edit function. UpVotes and DownVote.

TO DO: Share, Report, options regarding post depending on user_id.
*/
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./post.css";
import DeleteConfirmationPopup from "./DeleteConfirmationPopup";
import EditPopup from "./EditPost/editPost";
import userProfile from "./icons/user_profile.svg";
import threeDots from "./icons/3-dots.svg";
import shareSVG from "./icons/share.svg";
import downVotesSVG from "./icons/shift_down.svg";
import upVotesSVG from "./icons/shift_up.svg";
import commentsSVG from "./icons/chat_bubble.svg";
import blockSVG from "./EditPost/icons/block.svg";
import editSVG from "./EditPost/icons/edit.svg";
import flagSVG from "./EditPost/icons/flag.svg";
import frameSVG from "./EditPost/icons/Frame.svg";

const Post = ({
  id,
  authorId,
  userName,
  title,
  content,
  upVotesCount,
  commentsCount,
  category,
  file
}) => {
  const [voted, setVoted] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [initialVote, setInitialVote] = useState(upVotesCount);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [message, setMessage] = useState("");
  //const userId = getCurrentUserIdFromCookies();
  const userId = 5;

  useEffect(() => {
    if (initialVote > upVotesCount) {
      setVoted("upVote");
    } else if (initialVote < upVotesCount) {
      setVoted("downVote");
    }
  }, []);

  const handleVote = (voteType) => {
    if (voteType === "upVote" && voted !== "upVote") {
      setVoted("upVote");
      updateVoteCount(id, upVotesCount + 1);
    } else if (voteType === "downVote" && voted !== "downVote") {
      setVoted("downVote");
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

  const handleSave = (
    editedTitle,
    editedContent,
    editedCategory,
    editedFile
  ) => {
    updateTitle(editedTitle);
    updateContent(editedContent);
    updateCategory(editedCategory);
    updateFile(editedFile);
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

  const updateFile = (new_file) => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("file", new_file);

    axios
      .put(`http://localhost:3000/posts`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Post file updated successfully");
      })
      .catch((error) => {
        console.error("Error updating post file:", error);
      });
  };

  const handleCancel = () => {
    setShowEditPopup(false);
  };

  const handleFollow = () => {
    axios
      .post(`http://localhost:3000/postFollow`, {
        user_id: 5,
        post_id: 20,
      })
      .then((response) => {
        console.log("Post saved successfully");
        setMessage("Post saved successfully");
        setMenuVisible(false);
      })
      .catch((error) => {
        console.error("Error saving post:", error);
        setMessage("Error saving post");
        setMenuVisible(false);
      });
  };

  return (
    <div className="post">
      <div className="postHeader">
        <div className="userHeader">
          <img src={userProfile} alt="Header" className="userProfileImage" />
          <Link to="/messages" style={{ color: "black" }}>
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

          {message && <p>{message}</p>}
         {/*  
          {menuVisible && (
            <div className="post_menu">
              <button className="post_menu_btn">
                <img
                  src={flagSVG}
                  alt="upVotes"
                  className="post_menu_btn_icon"
                />{" "}
                Report
              </button>
              <button className="post_menu_btn" onClick={handleFollow}>
                <img
                  src={frameSVG}
                  alt="upVotes"
                  className="post_menu_btn_icon"
                />{" "}
                Save
              </button>
              <button className="post_menu_btn" onClick={handleEdit}>
                <img
                  src={editSVG}
                  alt="upVotes"
                  className="post_menu_btn_icon"
                />
                Edit
              </button>
              <button className="post_menu_btn" onClick={handleDelete}>
                <img
                  src={blockSVG}
                  alt="upVotes"
                  className="post_menu_btn_icon"
                />{" "}
                Delete
              </button>
            </div>
          )}
 */}
          
          {userId === authorId && menuVisible && (
            <div className="post_menu">
              <button className="post_menu_btn" onClick={handleEdit}>
              <img src={editSVG} alt="upVotes" className="post_menu_btn_icon"/>Edit
              </button>
              <button className="post_menu_btn" onClick={handleDelete}>
              <img src={blockSVG} alt="upVotes" className="post_menu_btn_icon"/> Delete
              </button>
            </div>
          )}

          {userId !== authorId && menuVisible && (
            <div className="post_menu">
              <button className="post_menu_btn">
              <img src={flagSVG} alt="upVotes" className="post_menu_btn_icon"/> Report</button>
              <button className="post_menu_btn" onClick={handleFollow}>
              <img src={frameSVG} alt="upVotes" className="post_menu_btn_icon"/> Save
              </button>
            </div>
          )}
         

          {showEditPopup && (
            <EditPopup
              currentCategory={category}
              currentContent={content}
              currentTitle={title}
              currentFile={file}
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
        {file ? (
          file.endsWith(".jpeg") ||
          file.endsWith(".jpg") ||
          file.endsWith(".png") ? (
            <img src={file} alt="Image" />
          ) : file.endsWith(".mp4") ? (
            <video controls>
              <source src={file} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : file.endsWith(".mp3") ? (
            <audio controls>
              <source src={file} type="audio/mpeg" />
              Your browser does not support the audio tag.
            </audio>
          ) : (
            <a href={file} target="_blank" rel="noopener noreferrer">
              View file
            </a>
          )
        ) : (
          <p></p>
        )}
      </div>

      <div className="feedback-section">
        {/* Likes/DisLike Button */}
        <div className="feedback-container">
          <div className="btn btn-upVotes" onClick={() => handleVote("upVote")}>
            <img src={upVotesSVG} alt="upVotes" />
          </div>
          <p>
            {upVotesCount +
              (voted === "upVote" ? 1 : voted === "downVote" ? -1 : 0)}
          </p>
          <div
            className="btn btn-downVotes"
            onClick={() => handleVote("downVote")}
          >
            <img src={downVotesSVG} alt="downVotes" />
          </div>
        </div>

        {/* Comments Button*/}
        <div className="feedback-container comm-btn">
          <div className="btn">
            <Link to={`/post/${id}`} style={{ color: "black" }}>
              <img src={commentsSVG} alt="Comments" className="SVG" />
            </Link>
          </div>

          <p>{commentsCount !== null ? commentsCount : 0}</p>
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
  );
};

export default Post;
