import React, { useEffect, useRef, useState } from 'react';
import './info.css';

const Message = ({ sender, content }) => {
    const messageRef = useRef(null);
    const [showProfilePic, setShowProfilePic] = useState(true);

    useEffect(() => {
        const currentMessage = messageRef.current;
        const prevSibling = currentMessage.previousElementSibling;

        const messageContent = currentMessage.querySelector('.message-content');

        const removeExtraMarginClasses = () => {
            messageContent.classList.remove('extra-margin-right', 'extra-margin-left');
        };

        removeExtraMarginClasses();

        if (prevSibling) {
            const prevClass = prevSibling.classList.contains('right') ? 'right' : 'left';
            const currentClass = sender === parseInt(localStorage.getItem("UserId"), 10) ? 'right' : 'left';
            const sameClass = prevClass === currentClass;

            if (sameClass) {
                setShowProfilePic(false);
                if (currentClass === 'right') {
                    messageContent.classList.add('extra-margin-right');
                } else {
                    messageContent.classList.add('extra-margin-left');
                }
            } else {
                setShowProfilePic(true);
            }
        } else {
            setShowProfilePic(true);
        }
    }, [sender, content]);

    return (
        <div
            ref={messageRef}
            className={`message-container flex items-center ${sender === parseInt(localStorage.getItem("UserId"), 10) ? 'right' : 'left'}`}
            data-sender={sender}
        >
            {
                showProfilePic &&
                <div className="profile-pic circle circle-small">
                    {sender === parseInt(localStorage.getItem("UserId"), 10) ? 'Y' : 'A'}
                </div>
            }
            <div className={`message-content`}>
                {content}
            </div>
        </div>
    );
};

export default Message;
