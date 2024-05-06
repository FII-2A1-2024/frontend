import { Link } from "react-router-dom";
import Navbar_superior from "../components/Navbar_superior";
import Navbar from "../components/Navbar";
import CreatePost from "../components/CreatePost/CreatePost";
import PostList from "../components/PostsList/PostList";
import News from "../components/news/News";
import SideBarChats from "../components/SideBarChats/SideBarChats";
import "../styles/LandingPage.css";

function LandingPage() {
  return (
    <div className="landing-page">
      <Navbar_superior />
      <div className="landing-content">
        <Navbar />
        <SideBarChats /> <News />
        <div className="landing-main-content">
          <CreatePost />
          <PostList />
        </div>
      </div>
      <Link to="/post" style={{ color: "black" }}>
        <h1>Post</h1>
      </Link>
      <Link to="/conversation" style={{ color: "black" }}>
        <h1>Conversation</h1>
      </Link>
    </div>
  );
}

export default LandingPage;
