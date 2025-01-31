import { io, Socket } from "socket.io-client";

const socket: Socket = io(process.env.SOCKET_IO_URL);

export { socket };