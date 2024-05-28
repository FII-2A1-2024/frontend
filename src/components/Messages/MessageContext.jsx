import React, { createContext, useContext, useState, useEffect } from 'react';
import socket from '../../socket';

// Multe comentarii cu initialLoad - daca nu astept ca pagina sa se incarce, dau reset fara sa vreau la mesaje
const MessageContext = createContext();

export const useMessages = () => {
    return useContext(MessageContext);
};

export const MessageProvider = ({ children }) => {
    const [messages, setMessages] = useState({});
    const [initialLoad, setInitialLoad] = useState(false);

    useEffect(() => {
        const storedMessages = JSON.parse(localStorage.getItem('messages')) || {};
        setMessages(storedMessages);
        setInitialLoad(true); // Indicate that initial load is complete

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
            if (!initialLoad) return; // Prevent updates before initial load completes

            const messageWithTimestamp = {
                ...data,
                timestamp: Date.now()
            };

            setMessages((prevMessages) => {
                const updatedMessages = { ...prevMessages };
                const receiver_id = data.sender_id; // Don't ask me the logic of this, I forgot
                if (!updatedMessages[receiver_id]) {
                    updatedMessages[receiver_id] = { username: data.sender_username || ('User ' + data.sender_id), messages: [] };
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
    }, [initialLoad]); // Add initialLoad as a dependency

    const updateMessages = (newMessages) => {
        if (!initialLoad) return; // Prevent updates before initial load completes
        setMessages(newMessages);
        localStorage.setItem('messages', JSON.stringify(newMessages));
        window.dispatchEvent(new Event('storage')); // Force update
    };

    const addMessage = (receiver_id, newMessage) => {
        if (!initialLoad) return; // Prevent updates before initial load completes
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
