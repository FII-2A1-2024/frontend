import io from 'socket.io-client';
import { removeLoggedUser, addLoggedUser } from './components/Messages/handler';

const socket = io(import.meta.env.VITE_URL_SITE, {
    path: import.meta.env.VITE_SOCKET_PATH,
});

socket.on('connect', () => {
    console.log('Connected to server, Socket ID:', socket.id);
    addLoggedUser(socket.id);
});

socket.on('connect_error', (err) => {
    console.error('Connection error:', err);
});

window.addEventListener('beforeunload', (event) => {
    if (socket.id) {
        removeLoggedUser(socket.id);
    }
});

export default socket;
