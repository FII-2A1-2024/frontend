import React, { createContext, useContext, useState, useEffect } from 'react';
import socket from '../../socket';

const MessageContext = createContext();

export const useMessages = () => {
    return useContext(MessageContext);
};

export const MessageProvider = ({ children }) => {
    const [messages, setMessages] = useState({});

    useEffect(() => {
        const storedMessages = JSON.parse(localStorage.getItem('messages')) || {};
        setMessages(storedMessages);

        const handleStorageChange = (event) => {
            if (event.key === 'messages') {
                setMessages(JSON.parse(event.newValue) || {});
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    useEffect(() => {
        const handleMessage = (data) => {
            const messageWithTimestamp = {
                ...data,
                timestamp: Date.now()
            };

            setMessages((prevMessages) => {
                const updatedMessages = { ...prevMessages };
                const receiver_id = data.sender_id;  // Ensure sender_id is defined
                if (!updatedMessages[receiver_id]) {
                    updatedMessages[receiver_id] = { username: data.username || ('User ' + data.sender_id), messages: [] };
                }
                updatedMessages[receiver_id].messages.push(messageWithTimestamp);
                localStorage.setItem('messages', JSON.stringify(updatedMessages));
                window.dispatchEvent(new Event('storage')); // Force update
                return updatedMessages;
            });
        };

        socket.on('message', handleMessage);

        return () => {
            socket.off('message', handleMessage);
        };
    }, []);

    const updateMessages = (newMessages) => {
        setMessages(newMessages);
        localStorage.setItem('messages', JSON.stringify(newMessages));
        window.dispatchEvent(new Event('storage')); // Force update
    };

    const addMessage = (receiver_id, newMessage) => {
        const storedMessages = JSON.parse(localStorage.getItem('messages')) || {};
        if (!storedMessages[receiver_id]) {
            storedMessages[receiver_id] = { username: 'Unknown', messages: [] };
        }
        storedMessages[receiver_id].messages.push(newMessage);
        updateMessages(storedMessages);
    };

    return (
        <MessageContext.Provider value={{ messages, updateMessages, addMessage }}>
            {children}
        </MessageContext.Provider>
    );
};

export { MessageContext };
