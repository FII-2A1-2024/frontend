import { Link } from "react-router-dom";
import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";
import "./PostList.css";

const Post = React.lazy(() => import("../../Post/post"));

const PostListF = ({categorie}) => {
  const [posts, setPosts] = useState([]);
const [loading, setLoading] = useState(true);

  const handleDelete = (postId) => {
    axios
      .delete(`${import.meta.env.VITE_URL_BACKEND}/posts?id=${postId}`)
      .then((response) => {
        setPosts(posts.filter((post) => post.id !== postId));
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
      });
  };
 
  useEffect(() => {
    console.log("Categorie: " + categorie);
    axios
    .get(`${import.meta.env.VITE_URL_BACKEND}/posts/all`)
    .then((response) => {
      const allPosts = response.data.posts;
      const filteredPosts = allPosts.filter(post => post.category.toLowerCase() === categorie);
      setPosts(filteredPosts);
      setLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching posts:", error);
      setLoading(false);
    });
}, [categorie]);
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="container-posts-list">
        {
        posts.map((post) => (
            
          <Post
            key={post.id}
            id={post.id}
            authorId={post.author_id}
            userName={post.username ? post.username : `User ${post.author_id}`}
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

export default PostListF;
