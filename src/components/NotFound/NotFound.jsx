import React from "react";
import { Link } from "react-router-dom"; 
import "./NotFound.css";


function NotFound() {
    return(
        <div className="not-found-container">
            <img src="../src/components/NotFound/icons/notFound.svg" alt="Not Found" />
            <p>Uh-oh... Se pare că te ai rătăcit</p>
            <Link to="../src/pages/LandingPage.jsx">Revino acasă</Link>
        </div>
    );
}

export default NotFound;

