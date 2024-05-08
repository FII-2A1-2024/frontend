import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import UserStats from '../components/Messages/UserStats.jsx';
import '../components/Messages/messages.css';
import '../components/Messages/info.css';
import MessagesContainer from '../components/Messages/MessagesContainer.jsx';

function MessagePage() {
    const params = useParams();
    const interests = ["Test", "Something", "Test2", "Another", "Third", "Max", "Plane", "Drone"];

    const [isInfoOpen, setIsInfoOpen] = useState(true);
    const [isInfoButtonClicked, setIsInfoButtonClicked] = useState(false);

    const handleCloseInfo = () => {
        setIsInfoOpen(previsInfoOpen => !previsInfoOpen);
        setIsInfoButtonClicked(true);
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    useEffect(() => {
        function handleResize() {
            if (!isInfoButtonClicked) { // do the change only if the user hasn't interacted with the buttons
                // otherwise, it means he wants this opened/closed regardless of the screensize
                if (window.innerWidth < 1200) {
                    setIsInfoOpen(false);
                } else {
                    setIsInfoOpen(true);
                }
            }
        }

        handleResize(); // page load

        window.addEventListener('resize', handleResize);

        // Don't know why it's needed, "clean-up" someone may say
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [isInfoButtonClicked]);

    const infoToggleBtnId = isInfoOpen ? "info-toggle-btn-active" : null;

    return (
        <main className="flex flex-grow" id="messages-main">
            {/* Effective messages container */}
            <div className="main-container flex-grow flex flex-col">
                <div className='header flex justify-between'>
                    <p className='truncate'>
                        Anonymous
                    </p>
                    <button className="chat-list-toggle p-4 flex justify-center items-center info-toggle" title="Toggle user info"
                        id={infoToggleBtnId} onClick={handleCloseInfo}>i</button>
                </div>

                <MessagesContainer />

                <div className="form-container flex items-center gap-4 relative">
                    <label htmlFor="file-input">
                            <img src="../src/media/icons/attachment.svg" alt="Attach files" className='icon' />
                    </label>
                    <input type="file" id="file-input" style={{ display: "none" }} onChange={handleFileChange} /> {/* Inputul de tip "file" ascuns, care va fi activat atunci când utilizatorul face clic pe iconita de atașare */}
                    <form action="" className='flex items-center flex-grow gap-2 relative'>
                        <input type="text" name="send-message" id="send-message" placeholder='Send a message...' />
                        <button type="submit">
                            <img src="../src/media/icons/send-icon.svg" alt="Send" className='icon' />
                        </button>

                        <img src="../src/media/icons/smile-emoji.svg" alt="Emojies" className='icon absolute right-14 top-0 bottom-0 m-auto' id="emojies" />
                    </form>
                </div>

            </div>

            {/* Info about the messaged user */}

            {isInfoOpen && (<div className="info-container flex flex-col items-center p-8 gap-8">
                <div className="info-top flex flex-col items-center">
                    <div className="circle circle-big">
                        <p className="profile-pic text-5xl">A</p>
                    </div>
                    <p className="text-2xl">ID: {params.messageId}</p>
                </div>
                <div className="info-stats-container flex justify-around">
                    <UserStats number="1" title="Posts made"></UserStats>
                    <UserStats number="2" title="Comments on posts"></UserStats>
                    <UserStats number="0" title="Votes on posts"></UserStats>
                </div>
                <p className="interests-title text-xl">
                    Interests
                </p>
                <div className="interests-container flex flex-wrap gap-3 justify-center">
                    {interests.map((interest) => (
                        <div key={interest} className="interest-item">
                            {interest}
                        </div>
                    ))}
                </div>
            </div>)}

        </main>
    );
}

export default MessagePage