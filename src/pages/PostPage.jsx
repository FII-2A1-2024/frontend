import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar_superior from "../components/Navbar_superior";
import Navbar from "../components/Navbar";
import Post from "../components/Post/post";
import News from "../components/news/News";
import Comments from "../components/comments/Comments";
import "../styles/PostPage.css";

const PostPage = () => {
  const [post, setPost] = useState([]);
  const {postId} = useParams();

  const postIdInt = parseInt(postId, 10);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/posts?id=${postId}`)
      .then((response) => {
        setPost(response.data.post);
        console.log(response.data.post);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
      console.log("This is the post: ", post)
  }, []);

 useEffect(() => {
    console.log("This is the post:", post);
  }, [post]); // Log post whenever it changes

  
  return (
    <div className="post-page">
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
                commentsCount={0} // Count comments nu e în JSON
                category={post.category}
              />
            
          </>

          <News />
          <Comments currentUserId={2} postId={postIdInt} />
        </div>
      </div>
    </div>
  );
};

export default PostPage;
