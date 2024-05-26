import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { encryptData } from "./encrypt";
import { checkConnection } from "./checkConnection";
const MessageLink = ({ username, id, type }) => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const hashedUsername = encryptData(username, id);

    const handleClick = async (e) => {
        e.preventDefault();  // stop a redirect
        const data = await checkConnection(id);
    
        if (data.message === 'User not logged in' || !data.socket) {
            setError("User not logged in.");
        } else {
            // Save the chat in localStorage, with the id, username, and an array of messages
            const storedMessages = JSON.parse(localStorage.getItem('messages')) || {};
            if (!storedMessages[id]) {
                storedMessages[id] = { username, messages: [], timestamp: Date.now() };
                localStorage.setItem('messages', JSON.stringify(storedMessages));
            }
            navigate(`/messages/${hashedUsername}`);
        }
    };    

    useEffect(() => {
        let timer;
        if (error) {
            timer = setTimeout(() => {
                setError(null);
            }, 1500);  // error pop up stays for 1.5 seconds
        }
        return () => clearTimeout(timer); 
    }, [error]);

    const errorClass = type === "PostLink" ? "error-msg error-msg-post" : "error-msg error-msg-comm";

    return (
        <span>
            <Link to={`/messages/${hashedUsername}`} style={{ color: "black" }} onClick={handleClick}>
                <p>{username}</p>
            </Link>
            {error && <div className={errorClass}>{error}</div>}
        </span>
    );
};

export default MessageLink;
