import axios from 'axios';

export const sendMessage = async (sender_id, receiver_id, content) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_URL_BACKEND}/messages`, {
            sender_id: sender_id,
            receiver_id: receiver_id,
            content: content
        });
        return response.data;
    } catch (error) {
        console.error("Error sending the message", error);
        throw error;
    }
};