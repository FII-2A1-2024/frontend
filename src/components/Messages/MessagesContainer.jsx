import React, { useState } from 'react';
import './MessagesContainer.css';
import Message from './Message.jsx';

function MessagesContainer() {
    return (
        <section className="messages-container flex flex-col-reverse">
            <Message sender="1" content="11" />
            <Message sender="0" content="22" />
            <Message sender="1" content="33" />
            <Message sender="1" content="33" />
            <Message sender="1" content="33" />
            <Message sender="1" content="33" />
            <Message sender="1" content="33" />
            <Message sender="1" content="33" />
            <Message sender="1" content="33" />
            <Message sender="1" content="33" />
            <Message sender="1" content="33" />
            <Message sender="1" content="33" />
            <Message sender="1" content="33" />
            <Message sender="1" content="33" />
            <Message sender="1" content="33" />
            <Message sender="1" content="33" />
            <Message sender="1" content="33" />
            <Message sender="1" content="33" />
            <Message sender="1" content="33" />
            <Message sender="1" content="33" />
            <Message sender="1" content="33" />
            <Message sender="1" content="33" />
            <Message sender="1" content="33" />
            <Message sender="1" content="33" />
            <Message sender="1" content="33" />
            <Message sender="1" content="33" />
            <Message sender="1" content="33" />
            <Message sender="1" content="33" />
            <Message sender="1" content="33" />
            <Message sender="1" content="33" />
            <Message sender="1" content="33" />
            <Message sender="1" content="33" />
            <Message sender="1" content="
            Lorem Ipsum is simply dummy text 
        
            of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
            " />

        </section>
    );
}

export default MessagesContainer