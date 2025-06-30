


import App from "./app";
const port = 5000;
import { createServer } from "http";
import { Server } from "socket.io";
import { initSocket } from "../../sockets/connection.socket";

const httpServer = createServer(App);

const io = new Server(httpServer, {
  cors: {
    origin: ['http://localhost:5173'],  // <-- Correct frontend origin here
    credentials: true
  }
});


// get socket connection
initSocket(io);







httpServer.listen(port,()=> {
    console.log(`Server run on this port ${port}`)
})