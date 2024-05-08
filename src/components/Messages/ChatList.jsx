import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './general.css';
import './ChatList.css';

function ChatList() {
    const messagesIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    const [activeChat, setActiveChat] = useState(null);

    if (!Array.isArray(messagesIds) || messagesIds.length === 0) {
        return (
            <>
                <div className="no-msg-container flex justify-center items-center flex-col">
                    <p>You don't have any messages at the moment. Select a person from a post/comment and message them to get started.</p>
                    <img src="../src/components/Messages/media/no-messages.png" alt="No available messages" />
                </div>
            </>
        );
    }


    const navigate = useNavigate();

    const handleClick = (messId) => {
        setActiveChat(messId);
        navigate(`/messages/${messId}`);
    };

    return (
        <div className={`flex flex-col gap-2`}>
            {messagesIds.map((messId) => (
                <div key={messId} className={`chat-list-item flex justify-between px-10 py-4 ${activeChat === messId ? 'active-chat' : ''}`} onClick={() => handleClick(messId)}>
                    <div className="chat-list-item-info">
                        <div className="chat-list-item-name">
                            Conversatia {messId}
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