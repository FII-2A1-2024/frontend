import io from 'socket.io-client';

// const socket = io(`${import.meta.env.VITE_URL_BACKEND}`, 
//     {
//         rejectUnauthorized: false
//     }
// );

const socket = io('http://localhost:3000');

socket.on('connect', () => {
    console.log('Connected to server, Socket ID:', socket.id);
});

export default socket;