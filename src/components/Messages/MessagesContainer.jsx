import React from 'react';
import './MessagesContainer.css';
import Message from './Message.jsx';

function MessagesContainer({ messages }) {
    // Inversează ordinea mesajelor
    const reversedMessages = messages.slice().reverse();

    return (
        <section className="messages-container flex flex-col-reverse">
            {reversedMessages.map((msg, index) => (
                <Message key={index} sender={msg.sender} content={msg.content} />
            ))}
        </section>
    );
}

export default MessagesContainer;
