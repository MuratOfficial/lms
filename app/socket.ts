import { io, Socket } from "socket.io-client";

const socket: Socket = io("http://localhost:3000");

export { socket };