import { io, Socket } from "socket.io-client";

const socket: Socket = io("https://lms-itc.netlify.app");

export { socket };