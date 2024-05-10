import { Link } from 'react-router-dom'


function NotFoundPage() {
    return (<div>404 Not Found<br></br>
        <Link to="/main">Click to go to the Main Page</Link>
    </div>);
}

export default NotFoundPage