import { Link } from "react-router-dom";
import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";
import "./PostList.css";

const Post = React.lazy(() => import("../../Post/post"));

const PostListSaved = () => {
  const [posts, getAll] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = parseInt(localStorage.getItem("UserId"), 10);
  const [followedPostIds, setFollowedPostIds] = useState([]);

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

  useEffect(() => {
    // Funcție pentru a obține ID-urile postărilor urmărite de utilizator
    const fetchFollowedPosts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_URL_BACKEND}/postFollow/user?id=${userId}`
        );
        const followedPosts = response.data.postFollow.map(
          (follow) => follow.post_id
        );
        setFollowedPostIds(followedPosts);
      } catch (error) {
        console.error("Eroare la obținerea postărilor urmărite:", error);
      }
    };

    fetchFollowedPosts();
  }, [userId]);

  useEffect(() => {
    // Funcție pentru a obține toate postările urmărite după ID
    const fetchPostsByIds = async () => {
      try {
        const postsData = await Promise.all(
          followedPostIds.map(async (postId) => {
            const url = `${import.meta.env.VITE_URL_BACKEND}/posts?id=${postId}`;
            console.log(`Fetching post with URL: ${url}`);
            const response = await axios.get(url);
            console.log(`Response for post ID ${postId}:`, response.data);
            return response.data.post;
          })
        );
        getAll(postsData);
        setLoading(false);
      } catch (error) {
        console.error("Eroare la obținerea postărilor:", error);
        setLoading(false);
      }
    };

    if (followedPostIds.length > 0) {
      fetchPostsByIds();
    }
  }, [followedPostIds]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="container-posts-list">
        {posts.length > 0 ? (
          <ul>
            {posts.map((post) => (
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
                handleDelete={() => handleDelete(post.id)}
              />
            ))}
          </ul>
        ) : (
          <p>Nu există postări salvate.</p>
        )}
      </div>
    </Suspense>
  );
};

export default PostListSaved;
