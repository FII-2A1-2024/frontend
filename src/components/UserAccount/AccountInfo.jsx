import React, { useState, useEffect, Suspense } from "react";
import "../UserAccount/Info.css";
import axios from "axios";
import accountSettings from "../UserAccount/Icons/AccountSettingsIcon.svg";
import { getComments as getCommentsApi } from "../comments/api";

function AccountInfo() {
  const [posts, getAll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userPostCount, setUserPostCount] = useState(0);
  const userId = 408; //localStorage.getItem("UserId"); // ID-ul utilizatorului curent, poți schimba cu valoarea din localStorage
  const [userComments, setUserComments] = useState([]);

  useEffect(() => {
    let commentsUser = [];

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

        const commentPromises = sortedPosts.map((post) =>
          getCommentsApi(post.id).then((data) => {
            data.forEach((element) => {
              console.log(element);
              if (element.detaliiComentariu.author_id == 408) {
                commentsUser.push(element.detaliiComentariu);
              }
            });
          })
        );

        Promise.all(commentPromises).then(() => {
          setUserComments(commentsUser);
          setLoading(false);
        });
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

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
            <p>?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountInfo;
