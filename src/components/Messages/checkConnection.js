import axios from "axios";

export const checkConnection = async (uid) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}/socket/${uid}`);
        return response.data;
    } catch (error) {
        console.error("Error getting the socket id", error);
        throw error;
    }
};