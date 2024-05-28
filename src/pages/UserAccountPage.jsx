import React, { useState, useEffect, Suspense } from "react";
import Navbar_superior from "../components/Navbar_Superior/Navbar_superior";
import Navbar from "../components/SideNavbar/Navbar";
import AccountInfo from "../components/UserAccount/AccountInfo";
import "../components/UserAccount/Info.css";
import UserPostList from "../components/LandingPageComponents/PostsList/UserPostList";
import StudentIcon from "../components/LandingPageComponents/PostsList/Icons/StudentIcon.svg";
import AdminIcon from "../components/LandingPageComponents/PostsList/Icons/AdminIcon.svg";

import axios from "axios";

const Post = React.lazy(() => import("../components/Post/post"));

function UserAccountPage() {
  const [posts, getAll] = useState([]);
  const userRole = localStorage.getItem("UserRole");

  const [loading, setLoading] = useState(true);
  const [userPostCount, setUserPostCount] = useState(0);
  const userAccount = localStorage.getItem("UserRole");
  const userId = 408; //localStorage.getItem("UserId"); // ID-ul utilizatorului curent, poți schimba cu valoarea din localStorage
  const [showReports, setShowReports] = useState(false);

  const handleDelete = (postId) => {
    axios
      .delete(`${import.meta.env.VITE_URL_BACKEND}/posts?id=${postId}`)
      .then((response) => {
        const updatedPosts = posts.filter((post) => post.id !== postId);
        getAll(updatedPosts);
        setUserPostCount(
          updatedPosts.filter((post) => post.author_id == userId).length
        );
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
      });
  };
  const handleViewReports = () => {
    if (showReports == true) {
      setShowReports(false);
    } else {
      setShowReports(true);
    }
  };

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
  return (
    <>
      {userRole === "student" ? (
        <div className="user-account-page">
          <Navbar_superior />
          <div className="user-account-page-content">
            <div className="user-account-sidebar">
              <Navbar />
            </div>
            <div className="content-wrapper">
              <div className="user-posts">{<UserPostList />}</div>
              <div className="user-account-info">
                <AccountInfo />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="user-account-page">
          <Navbar_superior />
          <div className="user-account-page-content">
            <div className="user-account-sidebar">
              <Navbar />
            </div>
            <div className="content-wrapper">
              <div className="user-posts">
                <Suspense fallback={<div>Loading...</div>}>
                  <div className="topPart">
                    <div className="name">
                      <h2>{localStorage.getItem("UserName")}</h2>
                      <div className="account-type">
                        <img src={AdminIcon} alt="icon" />
                        <p>Admin</p>
                      </div>
                    </div>

                    <ul>
                      <li>Overview</li>
                      <li>Posts</li>
                      <li>Comments</li>
                      <li>Upvoted</li>
                      <li>Downvoted</li>
                    </ul>
                    <div className="leftBtn">
                      <button className="createPostBtn">Create Post</button>
                      <button
                        className="createPostBtn"
                        onClick={handleViewReports}
                      >
                        View Reports
                      </button>
                    </div>
                  </div>
                  <div className="container-posts-list">
                    {showReports ? (
                      <div className="topPart">
                        <h3>Reported posts</h3>
                        <table className="report-table">
                          <thead>
                            <tr>
                              <th className="flex-column">Post</th>
                              <th className="flex-column">Reason</th>
                              <th className="flex-column">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {posts.map((post) => (
                              <tr key={post.id}>
                                <td className="postItem">
                                  <Post
                                    id={post.id}
                                    authorId={post.author_id}
                                    userName={`User ${post.author_id}`}
                                    title={post.title}
                                    content={post.description}
                                    upVotesCount={post.votes}
                                    commentsCount={post.comments_count}
                                    category={post.category}
                                    className="postFix"
                                  />
                                </td>
                                <td className="reasonBox">
                                  <p className="reason">
                                    Inappropriate Content
                                  </p>
                                </td>
                                <td className="actionBtns">
                                  <button className="action-button">
                                    Warn User
                                  </button>
                                  <button className="action-button">
                                    Timeout User
                                  </button>
                                  <button className="action-button">
                                    Delete Post
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      posts.map((post) =>
                        post.author_id == userId ? (
                          <Post
                            key={post.id}
                            id={post.id}
                            authorId={post.author_id}
                            userName={localStorage.getItem("UserName")}
                            title={post.title}
                            content={post.description}
                            upVotesCount={post.votes}
                            commentsCount={post.comments_count}
                            category={post.category}
                            file={post.url}
                          />
                        ) : (
                          <div key={post.id}></div>
                        )
                      )
                    )}
                  </div>
                </Suspense>
              </div>
              {showReports == false ? (
                <div className="user-account-info">
                  <AccountInfo />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UserAccountPage;
