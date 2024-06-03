import React, { useState, useEffect, Suspense } from "react";
import Navbar_superior from "../components/Navbar_Superior/Navbar_superior";
import Navbar from "../components/SideNavbar/Navbar";
import AccountInfo from "../components/UserAccount/AccountInfo";
import "../components/UserAccount/Info.css";
import UserPostList from "../components/LandingPageComponents/PostsList/UserPostList";
import axios from "axios";
import { getComments as getCommentsApi } from "../components/comments/api";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Post = React.lazy(() => import("../components/Post/post"));

function UserAccountPage() {
  const [posts, getAll] = useState([]);
  const userRole = localStorage.getItem("UserRole");

  const [reportsAdmin, setReportsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userPostCount, setUserPostCount] = useState(0);
  const userAccount = localStorage.getItem("UserRole");
  const userId = 408; //localStorage.getItem("UserId"); // ID-ul utilizatorului curent, poți schimba cu valoarea din localStorage
  const [showCreatePostForm, setShowCreatePostForm] = useState(false);
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  const [quickAction, setQuickAction] = useState("posts");
  const [userComments, setUserComments] = useState([]);

  const handleCreate = (title, content, category, file) => {
    axios
      .post(
        `${import.meta.env.VITE_URL_BACKEND}/posts`,
        {
          author_id: userId,
          title: title,
          username: localStorage.getItem("username"),
          description: content,
          category: category,
          votes: 0,
          file: file,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log("Post created successfully");
        window.location.reload();
      });
  };

  const handleClose = () => {
    setShowCreatePostForm(false);
  };

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
      ) : userRole == "admin" ? (
        <div className="user-account-page">
          <Navbar_superior />
          {reportsAdmin == false ? (
            <div className="user-account-page-content">
              <div className="user-account-sidebar">
                <Navbar />
              </div>
              <div className="content-wrapper">
                <div className="user-posts">
                  {
                    <Suspense fallback={<div>Loading...</div>}>
                      <div className="topPart">
                        <div className="name">
                          <h2>{localStorage.getItem("UserName")}</h2>
                          <p>Student</p>
                        </div>
                        <ul>
                          <li
                            onClick={() => setQuickAction("overview")}
                            className={
                              quickAction == "overview" ? "outLine" : ""
                            }
                          >
                            Overview
                          </li>
                          <li
                            onClick={() => setQuickAction("posts")}
                            className={quickAction == "posts" ? "outLine" : ""}
                          >
                            Posts
                          </li>
                          <li
                            onClick={() => setQuickAction("comments")}
                            className={
                              quickAction == "comments" ? "outLine" : ""
                            }
                          >
                            Comments
                          </li>
                          <li
                            onClick={() => setQuickAction("upvoted")}
                            className={
                              quickAction == "upvoted" ? "outLine" : ""
                            }
                          >
                            Upvoted
                          </li>
                          <li
                            onClick={() => setQuickAction("downvoted")}
                            className={
                              quickAction == "downvoted" ? "outLine" : ""
                            }
                          >
                            Downvoted
                          </li>
                        </ul>
                        <div className="left">
                          <button
                            className="createBtn"
                            onClick={() => setShowCreatePostForm(true)}
                          >
                            Create post
                          </button>
                          <button
                            className="reportsBtn"
                            onClick={() => setReportsAdmin(true)}
                          >
                            View reports
                          </button>
                          {showCreatePostForm && (
                            <CreatePostForm
                              onCreate={handleCreate}
                              onCancel={handleClose}
                            />
                          )}
                        </div>
                      </div>
                      {quickAction == "posts" ? (
                        <div className="container-posts-list">
                          {posts.map((post) =>
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
                          )}
                        </div>
                      ) : quickAction == "overview" ? (
                        <div>overview</div>
                      ) : quickAction == "comments" ? (
                        <div>
                          {userComments.map((comment) => (
                            <Link to={`/post/${comment.post_id}`}>
                              <div className="commentContainer">
                                <h2>{comment.description}</h2>
                                <p>{comment.created_at}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      ) : quickAction == "upvoted" ? (
                        <div>upvoted</div>
                      ) : (
                        <div>downvoted</div>
                      )}
                    </Suspense>
                  }
                </div>
                <div className="user-account-info">
                  <AccountInfo />
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
                                  <p className="reason">
                                    Inappropriate Content
                                  </p>
                                </td>
                                <td className="actionBtns">
                                  <button class="action-button">
                                    Warn User
                                  </button>
                                  <button class="action-button">
                                    Timeout User
                                  </button>
                                  <button class="action-button">
                                    Delete Post
                                  </button>
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
        </div>
      ) : (
        <div>moderator</div>
      )}
    </>
  );
}

export default UserAccountPage;
