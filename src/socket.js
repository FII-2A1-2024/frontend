import io from 'socket.io-client';

const socket = io(import.meta.env.VITE_URL_SITE, {
    path: import.meta.env.VITE_SOCKET_PATH,
});

socket.on('connect', () => {
    console.log('Connected to server, Socket ID:', socket.id);
});

socket.on('connect_error', (err) => {
    console.error('Connection error:', err);
});

socket.on('disconnect', (reason) => {
    console.log('Disconnected:', reason);
});

export default socket;
