import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar_superior from "../components/Navbar_superior";
import Navbar from "../components/Navbar";
import Post from "../components/Post/post";
import News from "../components/news/News";
import Comments from "../components/comments/Comments";
import "../styles/PostPage.css";

const PostPage = ({ id }) => {
  const [posts, getAll] = useState([]);

  useEffect(() => {
    console.log(id);
    axios
      .get(`http://localhost:3000/posts?id=${id}`)
      .then((response) => {
        getAll(response.data.posts);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  return (
    <div className="post-page">
      <Navbar_superior />
      <div className="post-content">
        <Navbar />
        <div className="post-main-content">
          <>
            {posts.map((post) => (
              <Post
                key={post.id}
                id={post.id}
                userName={`User ${post.author_id}`}
                title={post.title}
                content={post.description}
                upVotesCount={post.votes}
                commentsCount={0} // Count comments nu e în JSON
                category={post.category}
              />
            ))}
          </>

          <News />
          <Comments currentUserId={2} id={id} />
        </div>
      </div>
    </div>
  );
};

export default PostPage;
