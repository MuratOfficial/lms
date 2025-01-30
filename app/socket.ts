import { io, Socket } from "socket.io-client";

const socket: Socket = io("https://lms-itc.netlify.app/.netlify/functions/socket");

export { socket };