import { Link } from "react-router-dom";
import Navbar_superior from "../components/Navbar_superior";
import Navbar from '../components/Navbar';
import Post from '../components/Post/post';
import PostList from '../components/PostsList/PostList';
import News from '../components/news/News';
import '../styles/LandingPage.css';

function LandingPage() {
    return (
    <div className="landing-page">      
        <Navbar_superior />
        <div className="landing-content">
            <Navbar /> <News />
            <div className="landing-main-content">
                <PostList />
            </div> 
        </div>
        <Link to="/post" style={{color:'black'}}><h1>Post</h1></Link>
    </div>
    );
}

export default LandingPage
