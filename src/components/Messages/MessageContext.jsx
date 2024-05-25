import React, { createContext, useContext, useState, useEffect } from 'react';

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

    const updateMessages = (newMessages) => {
        setMessages(newMessages);
        localStorage.setItem('messages', JSON.stringify(newMessages));
        window.dispatchEvent(new Event('storage')); // Force update
    };

    return (
        <MessageContext.Provider value={{ messages, updateMessages }}>
            {children}
        </MessageContext.Provider>
    );
};
