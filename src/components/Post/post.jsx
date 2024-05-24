/**
User: Daniela Rusu
Date: 9 april 2024
Description: template-ul la post

Patricia Onisor(01.05.2024)
Description: pop-ul pt 3Dots, delete confirmation and delete function, edit popup and edit function. UpVotes and DownVote.

TO DO: Share, Report, options regarding post depending on user_id.
*/
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./post.css";
import DeleteConfirmationPopup from "./DeleteConfirmationPopup";
import EditPopup from "./EditPost/editPost";
import MessageLink from '../Messages/MessageLink';
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
import { useTranslation } from "react-i18next";
const Post = ({
  id,
  authorId,
  userName,
  title,
  content,
  upVotesCount,
  commentsCount,
  category,
  file,
}) => {
  const [voted, setVoted] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [initialVote, setInitialVote] = useState(upVotesCount);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [followedPostIds, setFollowedPostIds] = useState([]);
  const userId = parseInt(localStorage.getItem("UserId"), 10);
  const { t } = useTranslation();

  useEffect(() => {
    if (initialVote > upVotesCount) {
      setVoted("upVote");
    } else if (initialVote < upVotesCount) {
      setVoted("downVote");
    }
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_URL_BACKEND}/postFollow/user?id=${userId}`)
      .then((response) => {
        const followedPosts = response.data.postFollow.map(
          (follow) => follow.post_id
        );
        setFollowedPostIds(followedPosts);
      })
      .catch((error) => {
        console.error("Error fetching followed posts:", error);
      });
  }, [userId]);

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
      .put(`${import.meta.env.VITE_URL_BACKEND}/posts`, {
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
      .delete(`${import.meta.env.VITE_URL_BACKEND}/posts?id=${id}`)
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
      .put(`${import.meta.env.VITE_URL_BACKEND}/posts`, {
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
      .put(`${import.meta.env.VITE_URL_BACKEND}/posts`, {
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
      .put(`${import.meta.env.VITE_URL_BACKEND}/posts`, {
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
      .put(`${import.meta.env.VITE_URL_BACKEND}/posts`, formData, {
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
      .post(`${import.meta.env.VITE_URL_BACKEND}/postFollow`, {
        user_id: userId,
        post_id: id,
      })
      .then((response) => {
        console.log("Post saved successfully");
        setMessage("Post saved successfully");
        setMenuVisible(false);
        setFollowedPostIds([...followedPostIds, id]);
      })
      .catch((error) => {
        console.error("Error saving post:", error);
        setMessage("Error saving post");
        setMenuVisible(false);
      });
  };

  const handleUnfollow = () => {
    axios
      .delete(`${import.meta.env.VITE_URL_BACKEND}/postFollow/?user_id=${userId}&post_id=${id}`)
      .then((response) => {
        console.log("Post unsaved successfully");
        setMessage("Post unsaved successfully");
        setMenuVisible(false);
        setFollowedPostIds(followedPostIds.filter((postId) => postId !== id));
      })
      .catch((error) => {
        console.error("Error unsaving post:", error);
        setMessage("Error unsaving post");
        setMenuVisible(false);
      });
  };

  const handleReport = () => {
    setMessage("Post reported successfully");
    setMenuVisible(false);
  };

  const handleShare = () => {
    const postUrl = `${import.meta.env.VITE_URL_BACKEND}/post/${id}`;

    navigator.clipboard
      .writeText(postUrl)
      .then(() => {
        console.log("Post URL copied to clipboard:", postUrl);
        alert("Post URL copied to clipboard!");
      })
      .catch((error) => {
        console.error("Error copying post URL to clipboard:", error);
      });
  };

  const dropdownRef = useRef(null);
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setMenuVisible(false);
    }
  };

  useEffect(() => {
    if (menuVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuVisible]);

  useEffect(() => {
    let timer;
    if (message) {
      // Setează un timer care va șterge mesajul după 3 secunde
      timer = setTimeout(() => {
        setMessage('');
      }, 2000);
    }

    // Curăță timerul dacă componenta se demontează sau dacă mesajul este schimbat
    return () => clearTimeout(timer);
  }, [message]);


  return (
    <div className="post">
      <div className="postHeader">
        <div className="userHeader">
          <img src={userProfile} alt="Header" className="userProfileImage" />
            <MessageLink username={userName} id={authorId} type={"PostLink"}/>
        </div>

        <div className="three-dots">
          <button onClick={() => setMenuVisible(!menuVisible)} className="btn-three-dots">
            <img src={threeDots} alt="ThreeDots" />
          </button>
          
          {/* <div className="pop-up-message-status-action"> */}
            {message && <div className="btn_message">{message}</div>}
          {/* </div> */}

          {/* {userId === authorId && menuVisible && (
            <div className="post_menu">
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

          {userId !== authorId && menuVisible && (
            <div className="post_menu">
              <button className="post_menu_btn" onClick={handleReport}>
                <img
                  src={flagSVG}
                  alt="Report"
                  className="post_menu_btn_icon"
                />{" "}
                {t("Report")}
              </button>

              {followedPostIds.includes(id) ? (
                <button className="post_menu_btn" onClick={handleUnfollow}>
                  <img
                    src={frameSVG}
                    alt="upVotes"
                    className="post_menu_btn_icon"
                  />{" "}
                  {t("Unsave")}
                </button>
              ) : (
                <button className="post_menu_btn" onClick={handleFollow}>
                  <img
                    src={frameSVG}
                    alt="upVotes"
                    className="post_menu_btn_icon"
                  />{" "}
                  {t("Save")}
                </button>
              )}
            </div>
          )} */}

          {menuVisible && (
            <div className="post_menu" ref={dropdownRef}>
              {userId === authorId ? (
                <>
                  <button className="post_menu_btn" onClick={() => {handleEdit(); setMenuVisible(false);}}>
                    <img src={editSVG} alt="Edit" className="post_menu_btn_icon" />
                    {t('edit')}
                  </button>
                  <button className="post_menu_btn" onClick={() => {handleDelete(); setMenuVisible(false);}}>
                    <img src={blockSVG} alt="Delete" className="post_menu_btn_icon" />
                    {t('delete')}
                  </button>
                </>
              ) : (
                <>
                  <button className="post_menu_btn" onClick={() => {handleReport(); setMenuVisible(false);}}>
                    <img src={flagSVG} alt="Report" className="post_menu_btn_icon" />
                    {t('report')}
                  </button>
                  <button className="post_menu_btn" onClick={() => {handleFollow(); setMenuVisible(false);}}>
                    <img src={frameSVG} alt="Follow" className="post_menu_btn_icon" />
                    {t('save')}
                  </button>
                </>
              )}
            </div>
          )}

          {showEditPopup && (
            <EditPopup
              id={id}
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
            <img src={file} alt="Image" className="postFile" />
          ) : file.endsWith(".mp4") ? (
            <video controls className="postFile">
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
        <Link to={`/post/${id}`} style={{ color: "black" }}>
          <div className="feedback-container comm-btn">
            <div className="btn">
              <img src={commentsSVG} alt="Comments" className="SVG" />
            </div>
            <p>{commentsCount !== null ? commentsCount : 0}</p>
          </div>
        </Link>

        {/* Shares Button */}
        <div className="feedback-container" onClick={handleShare}>
          <div className="btn btn-share">
            <img src={shareSVG} alt="Share" />
          </div>
          <p>{t("share")}</p>
        </div>
      </div>
    </div>
  );
};

export default Post;
