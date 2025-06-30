import { Socket, Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";

const users = new Map<string, string>();

export const initSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log(`new user add on server ${socket.id}`);
    users.set(socket.id, uuidv4());
    users.set("user", socket.id);

    console.log(users.size);

    users.forEach((id, uuid) => {
      console.log(id, uuid);
    });

    socket.on("disconnect", () => {
      users.delete(socket.id);
      console.log("disconnected");
    });
  });

  // connection lost
};
