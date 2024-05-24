import axios from 'axios';

export const sendMessage = async (sender_id, receiver_id, content) => {
    try {
        const response = await axios.post('http://localhost:3000/messages', {
            sender_id: sender_id,
            receiver_id: receiver_id,
            content: content
        });
        console.log("Message sent response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error sending the message", error);
        throw error;
    }
};