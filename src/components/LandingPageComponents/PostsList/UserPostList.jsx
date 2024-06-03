import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";
import "./PostList.css";
import { useTranslation } from "react-i18next";
import CreatePostForm from "../CreatePost/CreatePostForm";
import { Link } from "react-router-dom";
import { getComments as getCommentsApi } from "../../comments/api";

const Post = React.lazy(() => import("../../Post/post"));

const PostList = () => {
  const { t } = useTranslation();
  const [showCreatePostForm, setShowCreatePostForm] = useState(false);
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  const [posts, getAll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quickAction, setQuickAction] = useState("posts");
  const [userPostCount, setUserPostCount] = useState(0);
  const userAccount = localStorage.getItem("UserRole");
  const userId = localStorage.getItem("UserId");
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
        if (error.response) {
          console.error("Error creating post:", error.response.data);
          setError("Error creating post: " + error.response.data.message);
        } else if (error.request) {
          console.error(
            "Error creating post: No response received",
            error.request
          );
          setError("Error creating post: No response received");
        } else {
          console.error("Error creating post:", error.message);
          setError("Error creating post: " + error.message);
        }
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

        console.log(posts);

        getAll(sortedPosts);
        setLoading(false);

        const userPostCount = sortedPosts.filter(
          (post) => post.author_id == userId
        ).length;
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
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
            className={quickAction === "comments" ? "outLine" : ""}
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
            className={quickAction === "downvoted" ? "outLine" : ""}
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
          {showCreatePostForm && (
            <CreatePostForm onCreate={handleCreate} onCancel={handleClose} />
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
            <Link to={`/post/${comment.post_id}`} key={comment.id}>
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
      {error && <div className="error-message">{error}</div>}
    </Suspense>
  );
};

export default PostList;
