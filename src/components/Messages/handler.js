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


export const removeLoggedUser = async (socket_id) => {
    if (localStorage.getItem('UserName') != null) {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_URL_BACKEND}/socket/delete`, {
                params: { socket: socket_id },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error at deleting a user from LoggedUsers", error);
            throw error;
        }
    }
};


export const addLoggedUser = async (socketId) => {
    if (localStorage.getItem('UserName') != null) {
        try {
            const response = await axios.post(`${import.meta.env.VITE_URL_BACKEND}/socket/add`, {
                uid: parseInt(localStorage.getItem("UserId"), 10),
                username: localStorage.getItem('UserName'),
                socket: socketId
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error at adding a user to LoggedUsers", error);
            throw error;
        }
    }
};
