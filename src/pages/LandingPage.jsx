import { Link } from "react-router-dom";
import { useState } from "react";
import Navbar_superior from "../components/Navbar_Superior/Navbar_superior";
import Navbar from "../components/SideNavbar/Navbar";
import CreatePost from "../components/LandingPageComponents/CreatePost/CreatePost";
import PostList from "../components/LandingPageComponents/PostsList/PostList";
import News from "../components/news/News";
import "../styles/LandingPage.css";
import ChatList from "../components/Messages/ChatList";

function LandingPage() {
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
            {<CreatePost />}
            {<PostList />}
          </div>
        </div>
        <div className="landing-side-containers">
        <div className="side_bar_chats_body"><ChatList /></div> <News />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

/*
 { /*<div className="landing-page">
      <div className="navbar-sup">
         <Navbar_superior toggleNavbar={toggleNavbar} />
      </div>
      <div className="landing-content">
        <div className="sidebar">
          {showNavbar && <Navbar />}
        </div>
        <div className="landing-main-content">
          {<CreatePost />}
          {<PostList />}
          mama
        </div>
        <div className="side-containers">
          <div className="side_bar_chats_body"><div className="side_bar_chats_body"><ChatList /></div></div> <News />
        </div>
      </div>
  </div> */
