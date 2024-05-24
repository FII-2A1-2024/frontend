import io from 'socket.io-client';

// Line commented due to sockets being absent
// If uncommented, errors will show up in the console


// const socket = io(`${import.meta.env.VITE_URL_BACKEND}`);
const socket = {
    id: "temp"
}

export default socket;