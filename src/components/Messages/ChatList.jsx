import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./general.css";
import "./ChatList.css";

function ChatList() {
  const messagesIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  const [activeChat, setActiveChat] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const fetchMessages = () => {
    const messageIdsArray = Object.keys(allMessages).map((key) => {
      const messages = allMessages[key].messages || [];
      return {
        id: key,
        username: allMessages[key].username,
        lastMessage:
          messages.length > 0
            ? messages[messages.length - 1].content
            : "No messages yet",
        timestamp:
          messages.length > 0 ? messages[messages.length - 1].timestamp : 0,
      };
    });
    // Sort by most recent message
    messageIdsArray.sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    );
    setMessagesIds(messageIdsArray);
  };

  useEffect(() => {
    fetchMessages();

    const intervalId = setInterval(fetchMessages, 60000); // Re-fetch messages every minute (for accurate timestamp)

    return () => clearInterval(intervalId); // Cleanup
  }, [allMessages]);

  useEffect(() => {
    const urlParams = location.pathname.split("/");
    if (location.pathname.includes("messages")) {
      const decrypted = decryptData(urlParams[2]);
      if (decrypted.id && decrypted.username) {
        setMessagesIds((prevMessagesIds) => {
          const chatExists = prevMessagesIds.some(
            (chat) => chat.id === decrypted.id
          );
          if (!chatExists) {
            const updatedMessagesIds = [
              ...prevMessagesIds,
              {
                id: decrypted.id,
                username: decrypted.username,
                lastMessage: "No messages yet",
                timestamp: 0,
              },
            ];
            // Save the chat in context and localStorage
            const updatedAllMessages = { ...allMessages };
            if (!updatedAllMessages[decrypted.id]) {
              updatedAllMessages[decrypted.id] = {
                username: decrypted.username,
                messages: [],
              };
            }
            // update context
            updateMessages(updatedAllMessages);
            // Sort by most recent message
            updatedMessagesIds.sort(
              (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
            );
            return updatedMessagesIds;
          }
          return prevMessagesIds;
        });
        setActiveChat(decrypted.id);
      }
    }
  }, [location.pathname, allMessages, updateMessages]);

  const handleClick = (messData) => {
    setActiveChat(messData.id);
    const hashedUsername = encryptData(messData.username, messData.id);
    navigate(`/messages/${hashedUsername}`);
  };

  if (!Array.isArray(messagesIds) || messagesIds.length === 0) {
    return (
      <>
        <div className="no-msg-container flex justify-center items-center flex-col">
          <p>
            You don't have any messages at the moment. Select a person from a
            post/comment and message them to get started.
          </p>
          <img
            src="../src/components/Messages/media/no-messages.png"
            alt="No available messages"
          />
        </div>
      </>
    );
  }

  const navigate = useNavigate();

  const handleClick = (messId) => {
    setActiveChat(messId);
    navigate(`/messages/${messId}`);
  };

  return (
    <div className={`flex flex-col gap-2`}>
      {messagesIds.map((messId) => (
        <div
          key={messId}
          className={`chat-list-item flex justify-between px-10 py-4 ${
            activeChat === messId ? "active-chat" : ""
          }`}
          onClick={() => handleClick(messId)}
        >
          <div className="chat-list-item-info">
            <div className="chat-list-item-name">Conversatia {messId}</div>
            <div className="chat-list-item-mess">FillerLastMessage</div>
          </div>
          <div className="chat-list-item-time">5m</div>
        </div>
      ))}
    </div>
  );
}

export default ChatList;
