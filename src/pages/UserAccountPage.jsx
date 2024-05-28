import React, { useState, useEffect, Suspense } from "react";
import Navbar_superior from "../components/Navbar_Superior/Navbar_superior";
import Navbar from "../components/SideNavbar/Navbar";
import AccountInfo from "../components/UserAccount/AccountInfo";
import "../components/UserAccount/Info.css";
import UserPostList from "../components/LandingPageComponents/PostsList/UserPostList";
import axios from "axios";

const Post = React.lazy(() => import("../components/Post/post"));

function UserAccountPage() {
  const [posts, getAll] = useState([]);
  const userRole = localStorage.getItem("UserRole");

  const [loading, setLoading] = useState(true);
  const [userPostCount, setUserPostCount] = useState(0);
  const userAccount = localStorage.getItem("UserRole");
  const userId = 408; //localStorage.getItem("UserId"); // ID-ul utilizatorului curent, poți schimba cu valoarea din localStorage

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
                      <p>Admin</p>
                    </div>
                    <h3>Reported posts</h3>
                    <table class="report-table">
                      <thead>
                        <tr>
                          <th class="flex-column">Post</th>
                          <th>Reason</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {posts.map((post) => (
                          <tr>
                            <td className="postItem">
                              <Post
                                key={post.id}
                                id={post.id}
                                authorId={post.author_id}
                                userName={`User ${post.author_id}`}
                                title={post.title}
                                content={post.description}
                                upVotesCount={post.votes}
                                commentsCount={post.comments_count}
                                category={post.category}
                              />
                            </td>
                            <td className="reasonBox">
                              <p className="reason">Inappropriate Content</p>
                            </td>
                            <td className="actionBtns">
                              <button class="action-button">Warn User</button>
                              <button class="action-button">
                                Timeout User
                              </button>
                              <button class="action-button">Delete Post</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UserAccountPage;
