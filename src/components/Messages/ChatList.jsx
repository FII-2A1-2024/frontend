import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './general.css';
import './ChatList.css';
import { encryptData, decryptData } from './encrypt';
import noMessages from './media/no-messages.svg';

const getTimeAgo = (timestamp) => {
    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffInSeconds = Math.floor((now - messageTime) / 1000);

    if (diffInSeconds >= 86400) {
        const days = Math.floor(diffInSeconds / 86400);
        return `${days}d`;
    } else if (diffInSeconds >= 3600) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours}h`;
    } else if (diffInSeconds >= 60) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes}m`;
    } else {
        return `${diffInSeconds}s`;
    }
};

function ChatList() {
    const [messagesIds, setMessagesIds] = useState([]);
    const [activeChat, setActiveChat] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();

    const fetchMessages = () => {
        const storedMessages = JSON.parse(localStorage.getItem('messages')) || {};
        const messageIdsArray = Object.keys(storedMessages).map(key => ({
            id: key,
            username: storedMessages[key].username,
            lastMessage: storedMessages[key].messages.length > 0 ? storedMessages[key].messages[storedMessages[key].messages.length - 1].content : 'No messages yet',
            timestamp: storedMessages[key].messages.length > 0 ? storedMessages[key].messages[storedMessages[key].messages.length - 1].timestamp : 0
        }));
        // Sort by most recent message
        messageIdsArray.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setMessagesIds(messageIdsArray);
    };

    useEffect(() => {
        fetchMessages();

        const handleStorageChange = (event) => {
            if (event.key === 'messages') {
                fetchMessages();
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    useEffect(() => {
        const urlParams = location.pathname.split('/');
        const decrypted = decryptData(urlParams[2]);

        if (decrypted.id && decrypted.username) {
            setMessagesIds(prevMessagesIds => {
                const chatExists = prevMessagesIds.some(chat => chat.id === decrypted.id);
                if (!chatExists) {
                    const updatedMessagesIds = [...prevMessagesIds, { id: decrypted.id, username: decrypted.username, lastMessage: 'No messages yet', timestamp: 0 }];
                    // Save the chat in localStorage
                    const storedMessages = JSON.parse(localStorage.getItem('messages')) || {};
                    if (!storedMessages[decrypted.id]) {
                        storedMessages[decrypted.id] = { username: decrypted.username, messages: [] };
                        localStorage.setItem('messages', JSON.stringify(storedMessages));
                    }
                    // Sort by most recent message
                    updatedMessagesIds.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
                    return updatedMessagesIds;
                }
                return prevMessagesIds;
            });
            setActiveChat(decrypted.id);
        }
    }, [location.pathname]);

    const handleClick = (messData) => {
        setActiveChat(messData.id);
        const hashedUsername = encryptData(messData.username, messData.id);
        navigate(`/messages/${hashedUsername}`);
    };

    if (!Array.isArray(messagesIds) || messagesIds.length === 0) {
        return (
            <div className="no-msg-container flex justify-center items-center flex-col">
                <p>You don't have any messages at the moment. Select a person from a post/comment and message them to get started.</p>
                <img src={noMessages} alt="No available messages" />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-2">
            {messagesIds.map((messData) => (
                <div key={messData.id} className={`chat-list-item flex justify-between px-10 py-4 ${activeChat === messData.id ? 'active-chat' : ''}`} onClick={() => handleClick(messData)}>
                    <div className="chat-list-item-info">
                        <div className="chat-list-item-name">
                            {messData.username}
                        </div>
                        <div className="chat-list-item-mess">
                            {messData.lastMessage}
                        </div>
                    </div>
                    <div className="chat-list-item-time">
                        {messData.timestamp ? getTimeAgo(messData.timestamp) : ''}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ChatList;