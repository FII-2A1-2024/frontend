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

// Use a beacon to assure the info is sent, regardless of optimizations made by the broswer
// Send the socket only if you are not on the auth page
// Ideally you would use useLocation, not window.href but location needs to be in a component
// I don't want to surround the page in another component just for this workaround
export const removeLoggedUser = (socket_id) => {
    if (window.location.pathname !== '/') {
        const token = localStorage.getItem("token");
        const url = `${import.meta.env.VITE_URL_BACKEND}/socket/delete`;

        const data = new Blob([JSON.stringify({ socket: socket_id })], { type: 'application/json' });

        // Use sendBeacon to send the data
        if (!navigator.sendBeacon(url, data)) {
            axios.delete(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params: { socket: socket_id }
            }).catch(error => {
                console.error("Error at deleting a user from LoggedUsers", error);
            });
        }
    }
};


export const addLoggedUser = async (socketId) => {
    if (window.location.pathname !== '/') {
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
