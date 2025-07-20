import App from "./app";

import { createServer } from "http";
import { Server } from "socket.io";
import { initSocket } from "../../sockets/connection.socket";
import mongoose from "mongoose";
import { profile } from "console";

const httpServer = createServer(App);

const port = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL;

const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5173"], // <-- Correct frontend origin here
    credentials: true,
  },
});

// get socket connection
initSocket(io);

// use iff
const startServer = async () => {
  try {
    if (!DB_URL) {
      return;
    }

    await mongoose.connect(DB_URL);
    httpServer.listen(port, () => {
      console.log(`Server run on this port ${port}`);
    });
    console.log("connecteed");
  } catch (error) {
    console.log(error);
  }
};


// production
process.on("SIGINT", async () => {
  await mongoose.disconnect();
  httpServer.close(() => {
    console.log("server closed");
    process.exit(1);
  });
});
