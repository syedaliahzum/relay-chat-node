import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";

type Message = { room: string; author: string; body: string; sentAt: string };
const messages: Message[] = [];
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

app.get("/health", (_req, res) => res.json({ status: "ok", service: "relay-chat" }));
app.get("/rooms/:room/messages", (req, res) => res.json(messages.filter((m) => m.room === req.params.room).slice(-50)));

io.on("connection", (socket) => {
  socket.on("room:join", ({ room, name }: { room: string; name: string }) => {
    socket.join(room);
    socket.to(room).emit("presence:joined", { name });
  });
  socket.on("message:send", ({ room, author, body }: Omit<Message, "sentAt">) => {
    if (!room || !author || !body?.trim()) return socket.emit("error", { message: "room, author and body are required" });
    const message = { room, author, body: body.trim(), sentAt: new Date().toISOString() };
    messages.push(message);
    io.to(room).emit("message:new", message);
  });
});

httpServer.listen(process.env.PORT || 3000, () => console.log("Relay Chat listening"));
