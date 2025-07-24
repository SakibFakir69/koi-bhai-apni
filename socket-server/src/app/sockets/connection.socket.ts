import { Socket, Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";


const users = new Map<string, string>();

// confustion
// array.from 
// entris

// all - user take unique id
// step
//   1 -> send all real-time active user
//   2 -> show user and side have click button
//  3 -> connect button click user get notifaction accpet or reject
//  4 -> if accpet user share location

export const initSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log(`new user add on server ${socket.id}`);

    users.set(socket.id, "Sakib")

    // active users

    io.emit("active-users",Array.from(users.entries()));


    // // recive location

    socket.on("send-location", ({ lat, lng, id }) => {
      console.log(lat, lng, " -> ", id);

      socket.emit("recive-location", { lat, lng });

      // ai id ra abr location patao

      socket.to(id).emit("recive-location", { lat, lng });
    });

    console.log(users.size);

    socket.on("disconnect", () => {
      users.delete(socket.id);
      console.log("disconnected");
       io.emit("active-users", Array.from(users.entries()));
    });
  });

  // connection lost
};
