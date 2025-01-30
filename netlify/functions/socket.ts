import { Server } from "socket.io";
import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

interface User {
  id: string;
  name: string;
  points: number;
}

let io: Server;
let users: User[] = [];
let cards = Array.from({ length: 20 }, (_, index) => ({
  id: index,
  name: `Card ${index + 1}`,
  info: `Information about Card ${index + 1}`,
}));

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  if (!io) {
    io = new Server(context.clientContext as any, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    io.on("connection", (socket) => {
      console.log("New client connected");

      const userId = socket.id;
      users.push({ id: userId, name: userId, points: 0 });
      io.emit("updateUsers", users);

      socket.on("selectCard", (cardIndex: number) => {
        io.emit("updateCards", cardIndex);
      });

      socket.on("changeName", (newName: string) => {
        users = users.map((user) =>
          user.id === socket.id ? { ...user, name: newName } : user
        );
        io.emit("updateUsers", users);
      });

      socket.on("updatePoints", ({ userId, points }: { userId: string; points: number }) => {
        users = users.map((user) =>
          user.id === userId ? { ...user, points } : user
        );
        io.emit("updateUsers", users);
      });

      socket.on("updateCardDetails", (updatedCard) => {
        cards = cards.map((card) =>
          card.id === updatedCard.id ? updatedCard : card
        );
        io.emit("updateCardDetails", updatedCard);
      });

      socket.on("resetCardColor", (cardIndex: number) => {
        io.emit("resetCardColor", cardIndex);
      });

      socket.on("disconnect", () => {
        console.log("Client disconnected");
        users = users.filter((user) => user.id !== socket.id);
        io.emit("updateUsers", users);
      });
    });
  }

  return {
    statusCode: 200,
    body: "WebSocket server is running",
  };
};

export { handler };