import io from 'socket.io-client';
import { addLoggedUser } from './components/Messages/handler';

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

function handleUnload(event) {
    if (socket.id) {
        console.log('Removing logged user with socket id:', socket.id);
        socket.emit('removeLoggedUser', {
            socketId: socket.id,
            token: localStorage.getItem("token")
        });
    }
}

window.addEventListener('beforeunload', handleUnload);
window.addEventListener('unload', handleUnload);

export default socket;
