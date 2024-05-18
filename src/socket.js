import io from 'socket.io-client';

const socket = io(`localhost:3000`);
//const socket = io(`${import.meta.env.VITE_URL_BACKEND}`);

console.log(socket);

socket.on('connect', () => {
    console.log('Connected to server, Socket ID:', socket.id);
});


export default socket;