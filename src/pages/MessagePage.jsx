import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import UserStats from '../components/Messages/UserStats.jsx';
import '../components/Messages/messages.css';
import '../components/Messages/info.css';
import MessagesContainer from '../components/Messages/MessagesContainer.jsx';
import { decryptData } from '../components/Messages/encrypt.js';
import { sendMessage } from '../components/Messages/handler.js';
import socket from '../socket';  // Import the socket instance

import sendIcon from '../components/Messages/media/send-icon.svg';
import emojiIcon from '../components/Messages/media/smile-emoji.svg';
import attachIcon from '../components/Messages/media/attachment.svg';

function MessagePage() {
    const location = useLocation();
    const urlParams = location.pathname.split('/');
    const decrypted = decryptData(urlParams[2]);
    const interests = ["Test", "Something", "Test2", "Another", "Third", "Max", "Plane", "Drone"];

    const [isInfoOpen, setIsInfoOpen] = useState(true);
    const [isInfoButtonClicked, setIsInfoButtonClicked] = useState(false);
    const [messages, setMessages] = useState([
        { sender: "1", content: "11" },
        { sender: "0", content: "22" },
        { sender: "1", content: "33" }
    ]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        function handleResize() {
            if (!isInfoButtonClicked) {
                if (window.innerWidth < 1200) {
                    setIsInfoOpen(false);
                } else {
                    setIsInfoOpen(true);
                }
            }
        }

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [isInfoButtonClicked]);

    useEffect(() => {
        socket.on('message', (data) => {
            console.log('Event received from server:', data);
            setMessages((prevMessages) => [data, ...prevMessages]);
        });

        return () => {
            socket.off('message');
        };
    }, []);

    const handleCloseInfo = () => {
        setIsInfoOpen(previsInfoOpen => !previsInfoOpen);
        setIsInfoButtonClicked(true);
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const infoToggleBtnId = isInfoOpen ? "info-toggle-btn-active" : null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const sender_id = parseInt(localStorage.getItem("UserId"), 10);
        console.log("Sending message:", {
            sender_id: sender_id,
            receiver_id: decrypted.id,
            content: newMessage
        });

        try {
            const response = await sendMessage(sender_id, decrypted.id, newMessage);
            console.log("Message sent successfully:", response);

            if (newMessage.trim() !== "") {
                setMessages([{ sender: "0", content: newMessage }, ...messages]);
                setNewMessage("");
                console.log("Message added to local state");
            }
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <main className="flex flex-grow" id="messages-main">
            <div className="main-container flex-grow flex flex-col">
                <div className='header flex justify-between'>
                    <p className='truncate'>{decrypted.username}</p>
                    <button className="chat-list-toggle p-4 flex justify-center items-center info-toggle" title="Toggle user info"
                        id={infoToggleBtnId} onClick={handleCloseInfo}>i</button>
                </div>

                <MessagesContainer messages={messages} />

                <div className="form-container flex items-center gap-4 relative">
                    <label htmlFor="file-input">
                        <img src={attachIcon} alt="Attach files" className='icon' />
                    </label>
                    <input type="file" id="file-input" style={{ display: "none" }} onChange={handleFileChange} />
                    <form onSubmit={handleSubmit} className='flex items-center flex-grow gap-2 relative'>
                        <input
                            type="text"
                            name="send-message"
                            id="send-message"
                            placeholder='Send a message...'
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <button type="submit">
                            <img src={sendIcon} alt="Send" className='icon' />
                        </button>

                        <img src={emojiIcon} alt="Emojies" className='icon absolute right-14 top-0 bottom-0 m-auto' id="emojies" />
                    </form>
                </div>
            </div>

            {isInfoOpen && (
                <div className="info-container flex flex-col items-center p-8 gap-8">
                    <div className="info-top flex flex-col items-center">
                        <div className="circle circle-big">
                            <p className="profile-pic text-5xl">A</p>
                        </div>
                        <p className="text-2xl">{decrypted.username}</p>
                    </div>
                    <div className="info-stats-container flex justify-around">
                        <UserStats number="13" title="Messages" />
                        <UserStats number="2" title="Files" />
                    </div>
                    <p className="interests-title text-xl">Utilities</p>
                    <div className="interests-container flex flex-wrap gap-3 justify-center">
                        {interests.map((interest) => (
                            <div key={interest} className="interest-item">
                                {interest}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </main>
    );
}

export default MessagePage;
