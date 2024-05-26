import React, { useState, useEffect, Suspense } from "react";
import "../UserAccount/Info.css";
import axios from "axios";
import accountSettings from "../UserAccount/Icons/AccountSettingsIcon.svg";

const Post = React.lazy(() => import("../Post/post"));

function AccountInfo() {
  const [posts, getAll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userPostCount, setUserPostCount] = useState(0);
  const userId = 408; //localStorage.getItem("UserId"); // ID-ul utilizatorului curent, poți schimba cu valoarea din localStorage

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_URL_BACKEND}/posts/all`)
      .then((response) => {
        const sortedPosts = response.data.posts.sort(
          (a, b) => b.votes - a.votes
        );
        getAll(sortedPosts);
        setUserPostCount(
          sortedPosts.filter((post) => post.author_id == userId).length
        );
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const userID = localStorage.getItem("UserId");

  return (
    <div className="account-info-container">
      <div className="user-account-settings">
        <p className="account-setting-text">Account settings</p>
        <img
          src={accountSettings}
          alt="icon"
          className="account-settings-icon"
        />
      </div>
      <div className="account-info-content">
        <div className="info-user-name">
          <p className="user-anonymous-name">Anonymous-demo</p>
          <p className="text-2xl">ID: {userID}</p>
        </div>
        <div className="info-stats-container">
          <div className="info-stats-posts-made">
            <p className="info-stats-posts-made-number">
              {posts.filter((post) => post.author_id === userId).length}
            </p>
            <p className="info-stats-posts-made-text">Posts made</p>
          </div>
          <div className="info-stats-comments">
            <p className="info-stats-comments-number">0</p>
            <p className="info-stats-comments-text">Comments on posts</p>
          </div>
          <div className="info-stats-votes">
            <p className="info-stats-votes-number">2</p>
            <p className="info-stats-votes-text">Votes on posts</p>
          </div>
        </div>
        <p className="interests-title">Interests</p>
        <div className="interests-container">
          {/* Aici puteți adăuga elemente pentru interese, dar le-am eliminat în acest exemplu */}
        </div>
        <div className="topics-container">
          {/* Aici puteți adăuga elemente pentru interese, dar le-am eliminat în acest exemplu */}
        </div>
      </div>
    </div>
  );
}

export default AccountInfo;
