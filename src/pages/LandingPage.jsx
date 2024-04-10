import { Link } from "react-router-dom";
import Navbar_superior from "../components/Navbar_superior";
import Navbar from '../components/Navbar';
import Post from '../components/post';

function LandingPage() {
    const name = 'Ugly Button';
    return (<>      
        <h1>{name}</h1>
        <p>Pagina principala (main)</p>
        <Navbar_superior />
        <Navbar />
        < Post userName='Samuel Jackson' title='The title goes here' content='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut ' upVotesCount={124} commentsCount={12}/>
        <div className="flex flex-col gap-1 temporary">
            <Link to="/connect">Conectare</Link>
            <Link to="/conversation">Conversatie</Link>
            <Link to="/post/1">Postare</Link>
        </div>  
    </>);
}

export default LandingPage
