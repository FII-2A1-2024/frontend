import { Link } from "react-router-dom";
import Navbar_superior from "../components/Navbar_superior";
import Navbar from "../components/Navbar";
import CreatePost from "../components/LandingPageComponents/CreatePost/CreatePost";
import PostList from "../components/LandingPageComponents/PostsList/PostList";
import News from "../components/news/News";
import SideBarChats from "../components/SideBarChats/SideBarChats";
import "../styles/LandingPage.css";

function LandingPage() {
  return (
    <div className="landing-page">
      <Navbar_superior />
      <div className="landing-content">
        
        <Navbar />
        
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
