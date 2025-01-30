import { io, Socket } from "socket.io-client";

const socket: Socket = io("https://replit.com/@MuratOfficial/NumbTestyInsurance");

export { socket };