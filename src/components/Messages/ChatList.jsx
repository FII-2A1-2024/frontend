import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import './general.css';
import './ChatList.css';
import { decryptData } from './encrypt';

import noMessages from './media/no-messages.svg';

function ChatList() {
    // object of type {id: id, username: string}
    const [messagesIds, setMessagesIds] = useState([]);


    // usestate on the actual current chat from the url
    const [activeChat, setActiveChat] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();


    useEffect(() => {
        const urlParams = location.pathname.split('/');
        const decrypted = decryptData(urlParams[2]);

        if (decrypted.id && decrypted.username) {
            setMessagesIds(prevMessagesIds => {
                const chatExists = prevMessagesIds.some(chat => chat.id === parseInt(decrypted.id));
                if (!chatExists) {
                    return [...prevMessagesIds, { id: parseInt(decrypted.id), username: decrypted.username }];
                }
                return prevMessagesIds;
            });
            setActiveChat(parseInt(decrypted.id));
        }
    }, [location.pathname]);

    if (!Array.isArray(messagesIds) || messagesIds.length === 0) {
        return (
            <>
                <div className="no-msg-container flex justify-center items-center flex-col">
                    <p>You don't have any messages at the moment. Select a person from a post/comment and message them to get started.</p>
                    <img src={noMessages} alt="No available messages" />
                </div>
            </>
        );
    }


    

    const handleClick = (messId) => {
        setActiveChat(messId);
        navigate(`/messages/${messId}`);
    };

    return (
        <div className={`flex flex-col gap-2`}>
            {messagesIds.map((messData) => (
                <div key={messData.id} className={`chat-list-item flex justify-between px-10 py-4 ${activeChat === messData.id ? 'active-chat' : ''}`} onClick={() => handleClick(messData.id)}>
                    <div className="chat-list-item-info">
                        <div className="chat-list-item-name">
                            {messData.username}
                        </div>
                        <div className="chat-list-item-mess">
                            FillerLastMessage
                        </div>
                    </div>
                    <div className="chat-list-item-time">
                        5m
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ChatList