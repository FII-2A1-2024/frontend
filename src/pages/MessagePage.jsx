import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import UserStats from '../components/Messages/UserStats.jsx';
import '../components/Messages/messages.css';
import '../components/Messages/info.css';
import MessagesContainer from '../components/Messages/MessagesContainer.jsx';
import { decryptData } from '../components/Messages/encrypt.js';
import { sendMessage } from '../components/Messages/handler.js';
import { MessageContext } from '../components/Messages/MessageContext';
import { useMessageUpdate } from '../components/Messages/useMessageUpdate';

import sendIcon from '../components/Messages/media/send-icon.svg';
import emojiIcon from '../components/Messages/media/smile-emoji.svg';
import attachIcon from '../components/Messages/media/attachment.svg';
import conversationIcon from '../components/Messages/media/Conversation-rafiki.svg'

function MessagePage() {
    const location = useLocation();
    const urlParams = location.pathname.split('/');
    const decrypted = decryptData(urlParams[2]);
    const [sendMessageError, setSendMessageError] = useState("");
    const [isErrorVisible, setIsErrorVisible] = useState(false);


    const [isInfoOpen, setIsInfoOpen] = useState(true);
    const [isInfoButtonClicked, setIsInfoButtonClicked] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const { messages } = useContext(MessageContext);
    const { addMessage } = useMessageUpdate();
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredMessages, setFilteredMessages] = useState([]);

    const receiver_id = decrypted.id;
    const currentMessages = messages[receiver_id]?.messages || [];

    const emojiMap = {
        smiling_face: "😊",
        thumbs_up: "👍",
        heart_eyes: "😍",
        laughing: "😂",
        rolling_on_the_floor_laughing: "🤣",
        red_heart: "❤️",
        unamused: "😒",
        ok_hand: "👌",
        kissing_face_with_closed_eyes: "😚",
        smiling_face_with_heart_eyes: "😍",
        kissing_face: "😘",
        two_hearts: "💕",
        grinning_face_with_smiling_eyes: "😁",
        grinning_face: "😀",
        face_savoring_food: "😋",
        smiling_face_with_sunglasses: "😎",
        hugging_face: "🤗",
        star_struck: "🤩",
        thinking_face: "🤔",
        face_with_raised_eyebrow: "🤨",
        neutral_face: "😐",
        expressionless_face: "😑",
        face_without_mouth: "😶",
        face_with_rolling_eyes: "🙄",
        smirking_face: "😏",
        persevering_face: "😣",
        disappointed_face: "😞",
        slightly_frowning_face: "🙁",
        confounded_face: "😖",
        worried_face: "😟",
        fearful_face: "😨",
        weary_face: "😩",
        exploding_head: "🤯",
        flushed_face: "😳",
        hot_face: "🥵",
        cold_face: "🥶",
        dizzy_face: "😵",
        mask: "😷",
        angry_face: "😠",
        face_with_symbols_on_mouth: "🤬",
        pouting_face: "😡",
        woozy_face: "🥴",
        nauseated_face: "🤢",
        face_vomiting: "🤮",
        sneezing_face: "🤧",
        smiling_face_with_halo: "😇",
        partying_face: "🥳",
        lying_face: "🤥",
        face_with_monocle: "🧐",
        nerd_face: "🤓",
        face_with_head_bandage: "🩹",
        pleading_face: "🥺",
        zipper_mouth_face: "🤐",
        face_with_hand_over_mouth: "🤭",
        face_with_symbols_over_mouth: "🤫",
        skeletal: "💀",
        pile_of_poo: "💩",
    };

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

    const handleCloseInfo = () => {
        setIsInfoOpen(prevIsInfoOpen => !prevIsInfoOpen);
        setIsInfoButtonClicked(true);
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const toggleEmojiPicker = () => {
        setShowEmojiPicker(!showEmojiPicker);
    };

    const handleEmojiSelection = (emoji) => {
        setNewMessage(prevMessage => prevMessage + emoji);
    };

    const infoToggleBtnId = isInfoOpen ? "info-toggle-btn-active" : null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const sender_id = parseInt(localStorage.getItem("UserId"), 10);
        const receiver_id = decrypted.id;

        try {
            if (sender_id != receiver_id && newMessage.trim() !== "") {
                const response = await sendMessage(sender_id, receiver_id, newMessage);
            }

            const timestamp = new Date().toISOString();
            if (newMessage.trim() !== "") {
                const newMsg = { sender: sender_id, content: newMessage, timestamp: timestamp };
                setNewMessage("");

                addMessage(receiver_id, newMsg); // Add message to context and localStorage
                setShowEmojiPicker(false);
                if (searchTerm.trim() === "") {
                    setFilteredMessages((prevMessages) => [...prevMessages, newMsg]);
                } else if (newMsg.content.toLowerCase().includes(searchTerm.toLowerCase())) {
                    setFilteredMessages((prevMessages) => [...prevMessages, newMsg]);
                }
            }
        } catch (error) {
            console.error("Error sending message:", error);
            setSendMessageError("Message could not be sent. If the message doesn't contains slurs, please try again.");
            setIsErrorVisible(true);
            
            // Setează un timer pentru a ascunde automat mesajul de eroare după un anumit timp
            setTimeout(() => {
                setSendMessageError("");
                setIsErrorVisible(false);
            }, 3000); // Mesajul de eroare va fi ascuns după 3 secunde
            
        }
    };

    const searchMessages = (term) => {
        const storedMessages = JSON.parse(localStorage.getItem('messages')) || {};
        if (storedMessages[decrypted.id]) {
            const userMessages = storedMessages[decrypted.id].messages;
            const filteredMessages = userMessages.filter(message => message.content.includes(term));
            setFilteredMessages(filteredMessages);
        }
    };

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        searchMessages(term);
    };
    

    return (
        <main className="flex flex-grow" id="messages-main">
            <div className="main-container flex-grow flex flex-col">
                <div className='header flex justify-between'>
                    <p className='truncate'>{decrypted.username}</p>
                    <button className="chat-list-toggle p-4 flex justify-center items-center info-toggle" title="Toggle user info"
                        id={infoToggleBtnId} onClick={handleCloseInfo}>i</button>
                </div>
               

                <MessagesContainer messages={currentMessages} />
                {sendMessageError && <p className="send-message-error" style={{ color: "black", maxWidth: "90%", marginLeft: "5%" }}>{sendMessageError}</p>}
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
                    
                    </form>
                    <button onClick={toggleEmojiPicker}> 
                        <img src={emojiIcon} alt="Emojies" className='icon absolute right-24 top-0 bottom-0 m-auto' id="emojies" />
                    </button>
                     {showEmojiPicker && (
                        <div className="emoji-picker">
                            {Object.keys(emojiMap).map((emojiName) => (
                                <button key={emojiName} onClick={() => handleEmojiSelection(emojiMap[emojiName])}>
                                    {emojiMap[emojiName]}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

                   {isInfoOpen && (
                <div className="info-container flex flex-col items-center p-8 gap-8">
                    <div className="info-top flex flex-col items-center">
                        <div className="circle circle-big">
                            <p className="profile-pic text-5xl">{decrypted.username[0]}</p>
                        </div>
                        <p className="text-2xl">{decrypted.username}</p>
                    </div>
                    <div className="info-stats-container flex justify-around">
                        <UserStats number="?" title="Gossips" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search messages..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="search_bar_messages"
                    />
                    {searchTerm ? (
                        filteredMessages.length > 0 ? (
                            <MessagesContainer messages={filteredMessages} />
                        ) : (
                            <p>No message was found</p>
                        )
                    ) : (
                        <>
                            <img src={conversationIcon} alt="converation" id="conversation" />
                        </>
                    )}
                </div>
            )}
        </main>
    );
}

export default MessagePage;
