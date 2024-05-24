import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import Navbar_superior from "../components/Navbar_Superior/Navbar_superior";
import Navbar from "../components/SideNavbar/Navbar";
import CreatePost from "../components/LandingPageComponents/CreatePost/CreatePost";
import PostListF from "../components/LandingPageComponents/PostsList/PostListF";
import News from "../components/news/News";
import SideBarChats from "../components/SideBarChats/SideBarChats";
import "../styles/LandingPage.css";

function LandingPageF() {
  const [showNavbar, setShowNavbar] = useState(true);
  const {category} = useParams();
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
            <CreatePost />
            <PostListF categorie={category} />
          </div>
        </div>
        <div className="landing-side-containers">
          <SideBarChats /> <News />
        </div>
      </div>
    </div>
  );
}

export default LandingPageF;