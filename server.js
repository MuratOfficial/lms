const { createServer } = require("http");
const next = require("next");
const { Server } = require("socket.io");
const { v4: uuidv4 } = require("uuid");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

let users = [];
let cards = Array.from({ length: 20 }, (_, index) => ({
  id: index,
  name: `Card ${index + 1}`,
  info: `Information about Card ${index + 1}`,
}));

app.prepare().then(() => {
  const server = createServer((req, res) => {
    handle(req, res);
  });

  const io = new Server(server);

  io.on("connection", (socket) => {
    console.log("New client connected");
    const userId = uuidv4();
    users.push({ id: socket.id, name: userId, points: 0 });
    io.emit("updateUsers", users);

    socket.on("selectCard", (cardIndex) => {
      io.emit("updateCards", cardIndex);
    });

    socket.on("changeName", (newName) => {
      users = users.map((user) =>
        user.id === socket.id ? { ...user, name: newName } : user
      );
      io.emit("updateUsers", users);
    });

    socket.on("updatePoints", ({ userId, points }) => {
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

    socket.on("resetCardColor", (cardIndex) => {
      io.emit("resetCardColor", cardIndex);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
      users = users.filter((user) => user.id !== socket.id);
      io.emit("updateUsers", users);
    });
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});