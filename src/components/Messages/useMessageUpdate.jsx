import { useContext } from 'react';
import { MessageContext } from './MessageContext';

export const useMessageUpdate = () => {
    const { updateMessages, addMessage } = useContext(MessageContext);

    if (!updateMessages || !addMessage) {
        throw new Error("useMessageUpdate must be used within a MessageProvider");
    }

    return { updateMessages, addMessage };
};
