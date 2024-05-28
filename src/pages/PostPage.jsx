import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar_superior from "../components/Navbar_Superior/Navbar_superior";
import Navbar from "../components/SideNavbar/Navbar";
import Post from "../components/Post/post";
import News from "../components/news/News";
import Comments from "../components/comments/Comments";
import "../styles/PostPage.css";
import ChatList from "../components/Messages/ChatList";

const PostPage = () => {
  const [post, setPost] = useState([]);
  const { postId } = useParams();

  const postIdInt = parseInt(postId, 10);
  const currentUserId = parseInt(localStorage.getItem("UserId"), 10);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_URL_BACKEND}/posts?id=${postId}`)
      .then((response) => {
        setPost(response.data.post);
        console.log(response.data.post);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
    console.log("This is the post: ", post);
  }, []);

  useEffect(() => {
    console.log("This is the post:", post);
  }, [post]); // Log post whenever it changes

  const [showNavbar, setShowNavbar] = useState(true);
  const toggleNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  return (
    <div className="landing-page">
      <Navbar_superior toggleNavbar={toggleNavbar} />

      <div className="landing-page-content">
        {showNavbar && (
          <div className="landing-sidebar">
            <Navbar />
          </div>
        )}
        <div className="landing-main-content">
          <div className="landing-posts-content">
            {
              <Post
                key={post.id}
                id={post.id}
                userName={`User ${post.author_id}`}
                title={post.title}
                content={post.description}
                upVotesCount={post.votes}
                commentsCount={post.comments_count}
                category={post.category}
                file={post.url}
              />
            }
            <Comments currentUserId={currentUserId} postId={postIdInt} />
          </div>
        </div>
        <div className="landing-side-containers">
          <div className="side_bar_chats_body"><ChatList /></div> <News />
        </div>
      </div>
    </div>
  );
};

export default PostPage;

/* <div className="post-page">
      <Navbar_superior />
      <div className="post-content">
        <Navbar />
        <div className="post-main-content">
          <>
             <Post
                key={post.id}
                id={post.id}
                userName={`User ${post.author_id}`}
                title={post.title}
                content={post.description}
                upVotesCount={post.votes}
                commentsCount={post.comments_count}
                category={post.category}
                file={post.url}
              />   
          </>
          <Comments currentUserId={currentUserId} postId={postIdInt} />
        </div>
        <div className="side-containers">
          <div className="side_bar_chats_body"><ChatList /></div>  <News /> 
        </div>
      </div>
    </div> */
