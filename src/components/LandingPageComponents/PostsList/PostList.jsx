import { Link } from "react-router-dom";
import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";
import "./PostList.css";

const Post = React.lazy(() => import("../../Post/post"));

const PostList = () => {
  const [posts, getAll] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDelete = (postId) => {
    axios
      .delete(`http://localhost:3000/posts?id=${postId}`)
      .then((response) => {
        setPosts(posts.filter((post) => post.id !== postId));
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/posts/all")
      .then((response) => {
        getAll(response.data.posts);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="container-posts-list">
        {posts.map((post) => (
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
        ))}
      </div>
    </Suspense>
  );
};

export default PostList;
