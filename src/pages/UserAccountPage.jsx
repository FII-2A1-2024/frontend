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
import CreatePostForm from "../components/LandingPageComponents/CreatePost/CreatePostForm";

const Post = React.lazy(() => import("../components/Post/post"));

function UserAccountPage() {
  const [posts, getAll] = useState([]);
  const userRole = localStorage.getItem("UserRole");

  const [reportsAdmin, setReportsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userPostCount, setUserPostCount] = useState(0);
  const userAccount = localStorage.getItem("UserRole");
  const userId = localStorage.getItem("UserId");
  const [showCreatePostForm, setShowCreatePostForm] = useState(false);
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  const [quickAction, setQuickAction] = useState("posts");
  const [userComments, setUserComments] = useState([]);
  const [error, setError] = useState(null);

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
      })
      .catch((error) => {
        console.error("Error creating post:", error);
        setError("Error creating post");
      });
  };

  const handleClose = () => {
    setShowCreatePostForm(false);
  };

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
        setUserPostCount(userPostCount);

        console.log(posts);

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

  const handleDelete = (postId) => {
    axios
      .delete(`${import.meta.env.VITE_URL_BACKEND}/posts?id=${postId}`)
      .then((response) => {
        getAll(posts.filter((post) => post.id !== postId));
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
      });
  };
  const handleWarnUser = (userId) => {
    axios
      .delete(`${import.meta.env.VITE_URL_BACKEND}/posts?id=${postId}`)
      .then((response) => {
        getAll(posts.filter((post) => post.id !== postId));
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
      });
  };
  const handleTimeOutUser = (userId) => {
    axios
      .delete(
        `${import.meta.env.VITE_URL_BACKEND}/admin/timeoutUser?id=${userId}`
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("Error time out user:", error);
      });
  };

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

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
      ) : userRole === "admin" ? (
        <div className="user-account-page">
          <Navbar_superior />
          {reportsAdmin === false ? (
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
                        <p>{localStorage.getItem("UserRole")}</p>
                      </div>
                      <ul>
                        <li
                          onClick={() => setQuickAction("posts")}
                          className={quickAction === "posts" ? "outLine" : ""}
                        >
                          Posts
                        </li>
                        <li
                          onClick={() => setQuickAction("comments")}
                          className={
                            quickAction === "comments" ? "outLine" : ""
                          }
                        >
                          Comments
                        </li>
                        <li
                          onClick={() => setQuickAction("upvoted")}
                          className={quickAction === "upvoted" ? "outLine" : ""}
                        >
                          Upvoted
                        </li>
                        <li
                          onClick={() => setQuickAction("downvoted")}
                          className={
                            quickAction === "downvoted" ? "outLine" : ""
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
                    {quickAction === "posts" ? (
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
                    ) : quickAction === "comments" ? (
                      <div>
                        {userComments.map((comment) => (
                          <Link
                            to={`/post/${comment.post_id}`}
                            key={comment.id}
                          >
                            <div className="commentContainer">
                              <h2>{comment.description}</h2>
                              <p>{comment.created_at}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : quickAction === "upvoted" ? (
                      <div>upvoted</div>
                    ) : (
                      <div>downvoted</div>
                    )}
                  </Suspense>
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
                          <p>{localStorage.getItem("UserRole")}</p>
                        </div>
                        <h3>Reported posts</h3>
                        <table className="report-table">
                          <thead>
                            <tr>
                              <th className="flex-column">Post</th>
                              <th>Reason</th>
                              <th>Action</th>
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
                                    file={post.url}
                                  />
                                </td>
                                <td className="reasonBox">
                                  <p className="reason">
                                    Inappropriate Content
                                  </p>
                                </td>
                                <td className="actionBtns">
                                  <button
                                    className="action-button"
                                    onClick={() =>
                                      console.log(
                                        `warned user: ${post.author_id}`
                                      )
                                    }
                                  >
                                    Warn User
                                  </button>
                                  <button
                                    className="action-button"
                                    onClick={() =>
                                      console.log(
                                        `timeout user: ${post.author_id}`
                                      )
                                    }
                                  >
                                    Timeout User
                                  </button>
                                  <button
                                    className="action-button"
                                    onClick={() => handleDelete(post.id)}
                                  >
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
      {error && <div className="error-message">{error}</div>}
    </>
  );
}

export default UserAccountPage;
