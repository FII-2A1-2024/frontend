import { Link } from "react-router-dom";
import { useState } from "react";
import Navbar_superior from "../components/Navbar_Superior/Navbar_superior";
import Navbar from "../components/SideNavbar/Navbar";
import CreatePost from "../components/LandingPageComponents/CreatePost/CreatePost";
import PostListSaved from "../components/LandingPageComponents/PostsList/PostListSaved";
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
            {<PostListSaved />}
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