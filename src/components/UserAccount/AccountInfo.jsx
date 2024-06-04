import React, { useState, useEffect, Suspense } from "react";
import "../UserAccount/Info.css";
import axios from "axios";
import accountSettings from "../UserAccount/Icons/AccountSettingsIcon.svg";
import { getComments as getCommentsApi } from "../comments/api";
import { Link } from "react-router-dom";

function AccountInfo() {
  const [posts, getAll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userPostCount, setUserPostCount] = useState(0);
  const [userComments, setUserComments] = useState([]);
  const [error, setError] = useState(null);
  const [votes, setVotes] = useState(0);
  const userId = localStorage.getItem("UserId");

  useEffect(() => {
    let commentsUser = [];

    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_URL_BACKEND}/posts/all`
        );
        const sortedPosts = response.data.posts.sort(
          (a, b) => b.votes - a.votes
        );
        getAll(sortedPosts);
        setLoading(false);

        const userPostCount = sortedPosts.filter(
          (post) => post.author_id == userId
        ).length;

        const totalVotes = sortedPosts
          .filter((post) => post.author_id == userId)
          .reduce((sum, post) => sum + post.votes, 0);
        setVotes(totalVotes);

        setUserPostCount(userPostCount);

        const postsWithComments = sortedPosts.filter(
          (post) => post.comments_count
        );

        const commentPromises = postsWithComments.map((post) =>
          getCommentsApi(post.id)
            .then((data) => {
              data.forEach((element) => {
                if (element.detaliiComentariu.author_id == userId) {
                  commentsUser.push(element.detaliiComentariu);
                }
              });
            })
            .catch((error) => {
              console.error(
                `Error fetching comments for post ${post.id}:`,
                error
              );
              setError(`Error fetching comments for some posts`);
            })
        );

        await Promise.all(commentPromises);

        setUserComments(commentsUser);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError("Error fetching posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [userId]);

  const userID = localStorage.getItem("UserId");

  return (
    <div className="account-info-container">
      <div className="user-account-settings">
        <p className="account-setting-text">Account settings</p>
        <Link to={`/settings`}>
          <img
            src={accountSettings}
            alt="icon"
            className="account-settings-icon"
          />
        </Link>
      </div>
      <div className="account-info-content">
        <div className="info-user-name">
          <p className="user-anonymous-name">
            {localStorage.getItem("UserName")}
          </p>
          <p className="text-2xl">ID: {userID}</p>
        </div>
        <div className="account-info-stats">
          <div>
            <p>Posts made</p>
            <p>{userPostCount}</p>
          </div>
          <div>
            <p>Comments on posts</p>
            <p>{userComments.length}</p>
          </div>
          <div>
            <p>Votes on posts</p>
            <p>{votes}</p>
          </div>
        </div>
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
}

export default AccountInfo;
