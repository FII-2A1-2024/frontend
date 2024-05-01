import React, { useEffect, useRef, useState } from 'react';
import './info.css';

const Message = ({ sender, content }) => {
    const messageRef = useRef(null);
    const [showProfilePic, setShowProfilePic] = useState(true);

    /* Logic used to assure that the profile pic isn't displayed twice */
    useEffect(() => {
        const currentMessage = messageRef.current;
        const prevSibling = currentMessage.nextElementSibling;

        if (prevSibling &&
            ((prevSibling.classList.contains('right') && currentMessage.classList.contains('right')) ||
                (prevSibling.classList.contains('left') && currentMessage.classList.contains('left')))) {
            setShowProfilePic(false);
        } else {
            setShowProfilePic(true);
        }
    }, [sender]);

    return (
        <div
            ref={messageRef}
            className={`message-container flex items-center ${sender == 0 ? 'right' : 'left'}`}>
            {
                showProfilePic &&
                <div className="profile-pic circle circle-small">
                    {sender == 0 ? 'Y' : 'A'}
                </div>
            }
            {showProfilePic ? (
                <div className="message-content">
                    {content}
                </div>
            ) : (
                <div className="message-content extra-margin">
                    {content}
                </div>
            )
            }

        </div>
    );
};

export default Message