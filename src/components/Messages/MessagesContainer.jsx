import React from 'react';
import './MessagesContainer.css';
import Message from './Message.jsx';

function MessagesContainer({ messages }) {
    return (
        <section className="messages-container flex flex-col-reverse">
            {messages.map((msg, index) => (
                <Message key={index} sender={msg.sender} content={msg.content} />
            ))}
        </section>
    );
}

export default MessagesContainer;
