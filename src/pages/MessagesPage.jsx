/*
Ciprian 5 apr & 29 apr
*/

import { Outlet, useLocation } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Navbar_superior from "../components/Navbar_superior";
import ChatList from "../components/Messages/ChatList";
import general from '../components/Messages/general.module.css';
import '../components/Messages/ChatList.css'

function MessagesPage() {
    const [isChatListOpen, setIsChatListOpen] = useState(true);
    const [isChatButtonClicked, setIsChatButtonClicked] = useState(false);

    const handleCloseChatList = () => {
        setIsChatListOpen(prevIsChatListOpen => !prevIsChatListOpen);
        setIsChatButtonClicked(true);
    };


    // Don't delete this even if it appears as not used
    const pathname = useLocation();

    useEffect(() => {
        function handleResize() {
            if (!isChatButtonClicked) { // do the change only if the user hasn't interacted with the buttons
                // otherwise, it means he wants this opened/closed regardless of the screensize
                if (window.innerWidth < 768) {
                    setIsChatListOpen(false);
                } else {
                    setIsChatListOpen(true);
                }
            }
        }

        handleResize(); // page load

        window.addEventListener('resize', handleResize);

        // Don't know why it's needed, "clean-up" someone may say
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [isChatButtonClicked]);

    return (
        <>
            <Navbar_superior />
            <section className={general.container}>
                <div className={`flex ${general.containerChild}`}>
                    {isChatListOpen ? (
                        <nav className="chat-list-container flex flex-col">
                            <div className="chat-list-top flex justify-around items-center">
                                <div className="chat-list-title text-2xl">Chat</div>
                                <button className="chat-list-toggle p-4 flex justify-center items-center" title="Close chat list" onClick={handleCloseChatList}>X</button>
                            </div>
                            <ChatList />
                        </nav>) : (
                        <button className="chat-list-toggle chat-list-expand" onClick={handleCloseChatList} title="Expand chat list">
                            {location.pathname === "/messages" ? (
                                <img src="src/media/icons/message-expand.svg" alt="Expand" />) : (
                                <img src="../src/media/icons/message-expand.svg" alt="Expand" />
                            )}
                        </button>
                    )}

                    {location.pathname === "/messages" ? (
                        <div className="flex justify-center items-center flex-grow text-2xl">
                            In order to get started, select a chat from the left, if any.
                        </div>) : (
                        <Outlet /> // Individual message chat placeholder - see MessagePage.jsx
                    )}
                </div>
            </section>
        </>
    );
}

export default MessagesPage