import { Link } from "react-router-dom";
import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";
import "./PostList.css";

const Post = React.lazy(() => import("../../Post/post"));

const PostList = () => {
  const [posts, getAll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userPostCount, setUserPostCount] = useState(0);
  const [userAccount, setUserAccount] = useState("student");
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

  const handleSwitchAccount = () => {
    const info = document.getElementsByClassName("user-account-info")[0];
    if (userAccount == "student") {
      setUserAccount("admin");
      info.style.display = "none";
    } else {
      setUserAccount("student");
      info.style.display = "block";
    }
  };

  return (
    <>
      {userAccount === "student" ? (
        <Suspense fallback={<div>Loading...</div>}>
          <div className="topPart">
            <button onClick={handleSwitchAccount}>change page</button>
            <div className="name">
              <h2>Anonymous123</h2>
              <p>Student</p>
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
            </div>
          </div>
          <div className="container-posts-list">
            {posts.map((post) =>
              post.author_id == userId ? (
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
                  file={post.url}
                />
              ) : (
                <div key={post.id}></div>
              )
            )}
          </div>
        </Suspense>
      ) : (
        <Suspense fallback={<div>Loading...</div>}>
          <div className="topPart">
            <button onClick={handleSwitchAccount}>change page</button>
            <div className="name">
              <h2>Anonymous123</h2>
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
                {posts.map((post) =>
                  post.author_id == userId ? (
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
                        <button class="action-button">Timeout User</button>
                        <button class="action-button">Delete Post</button>
                      </td>
                    </tr>
                  ) : (
                    <div key={post.id}></div>
                  )
                )}
              </tbody>
            </table>
          </div>
        </Suspense>
      )}
    </>
  );
};

export default PostList;
