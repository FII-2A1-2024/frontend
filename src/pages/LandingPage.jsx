import { Link } from "react-router-dom";
import Navbar_superior from "../components/Navbar_superior";
import Navbar from '../components/Navbar';
import Post from '../components/Post/post';
import News from '../components/news/News';
import '../styles/LandingPage.css';

function LandingPage() {
    return (
    <div className="landing-page">      
        <Navbar_superior />
        <div className="landing-content">
            <Navbar /> <News />
            <div className="landing-main-content">
                < Post userName='Samuel Jackson' title='The title goes here' content='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut ' upVotesCount={124} commentsCount={12}/>
                < Post userName='Samuel Jackson' title='The title goes here' content='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut ' upVotesCount={124} commentsCount={12}/>
                < Post userName='Samuel Jackson' title='The title goes here' content='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut ' upVotesCount={124} commentsCount={12}/>
                < Post userName='Samuel Jackson' title='The title goes here' content='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut ' upVotesCount={124} commentsCount={12}/>
                < Post userName='Samuel Jackson' title='The title goes here' content='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut ' upVotesCount={124} commentsCount={12}/>
                < Post userName='Samuel Jackson' title='The title goes here' content='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut ' upVotesCount={124} commentsCount={12}/>
            </div> 
        </div>
        <Link to="/post" style={{color:'black'}}>Post</Link>
    </div>
    );
}

export default LandingPage
