import { Link } from "react-router-dom";
import { useState } from "react";
import Navbar_superior from "../components/Navbar_Superior/Navbar_superior";
import Navbar from "../components/SideNavbar/Navbar";
import CreatePost from "../components/LandingPageComponents/CreatePost/CreatePost";
import PostList from "../components/LandingPageComponents/PostsList/PostList";
import News from "../components/news/News";
import SideBarChats from "../components/SideBarChats/SideBarChats";
import "../styles/LandingPage.css";

function LandingPage() {
  const [showNavbar, setShowNavbar] = useState(true);
  const toggleNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  return (
    <div className="landing-page">
      <Navbar_superior toggleNavbar={toggleNavbar} />
      <div className="landing-content">
        {showNavbar && <Navbar />}
        <div className="landing-main-content">
          <CreatePost />
          <PostList />
        </div>
        <div className="side-containers">
          <SideBarChats /> <News />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
