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

socket.on('message', (data) => {
    console.log('Event received from server:', data);
    alert(data);
});

export default socket;