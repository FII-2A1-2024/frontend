import { useMessages } from './MessageContext';

export const useMessageUpdate = () => {
    const { updateMessages } = useMessages();

    const addMessage = (receiver_id, newMessage) => {
        const storedMessages = JSON.parse(localStorage.getItem('messages')) || {};
        if (!storedMessages[receiver_id]) {
            storedMessages[receiver_id] = { username: 'Unknown', messages: [] };
        }
        storedMessages[receiver_id].messages.push(newMessage);
        updateMessages(storedMessages);
    };

    return { addMessage };
};
