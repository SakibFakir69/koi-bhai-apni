import { Socket, Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";
import { User } from "../models/User";
interface ActiveUser {
  userId: string;
  name: string;
  email: string;
}

const users = new Map<string, ActiveUser>();
const userIdtoSocketId = new Map<string, string>();

// confustion
// array.from
// entris

// all - user take unique id
// step
//   1 -> send all real-time active user
//   2 -> show user and side have click button
//  3 -> connect button click user get notifaction accpet or reject
//  4 -> if accpet user share location

export const initSocket = async (io: Server) => {
  io.on("connection", async (socket: Socket) => {
    console.log(`new user add on server ${socket.id}`);

    const userId = socket.handshake.auth.userId;
    console.log(userId, " userId ");
    if (!userId) {
      return socket.disconnect();
    }
    try {
      const user = await User.findOne({ userId });
      console.log(user);
      if (!user) {
        console.log("User not found");
        return socket.disconnect();
      }

      users.set(socket.id, {
        userId: user.userId,
        name: user.name,
        email: user.email,
        // Add any other data you want to send to clients
      });
      // user socket id
      userIdtoSocketId.set(user.userId, socket.id);
    } catch (error) {
      console.log(error);
    }

    // active users

    io.emit("active-users", Array.from(users.values()));

    socket.on("send-request-Id", (targetUserId: string) => {
      const targetSocketId = userIdtoSocketId.get(targetUserId);

      console.log("Sender:", userId, "Receiver:", targetUserId);
      console.log(targetSocketId, " t id");

      if (targetSocketId) {
        io.to(targetSocketId).emit("share-location-access", {
          fromUserId: userId,
          message: "accept or reasdasdject",
        });
      } else {
        console.log(`Target user not connected: ${targetUserId}`);
      }
    });

    // // recive location

    socket.on("send-location", ({ lat, lng, id }) => {
      console.log(lat, lng, " -> ", id);

      socket.emit("recive-location", { lat, lng });

      // ai id ra abr location patao

      socket.to(id).emit("recive-location", { lat, lng });
    });

    // share location

    socket.on("share-location", (data) => {
      const { longitude, latitude, reciver_Id } = data;
      io.to(reciver_Id).emit("share-location-recive",{longitude, latitude});
    });

    console.log(users.size);

    socket.on("disconnect", () => {
      users.delete(socket.id);
      console.log("disconnected");
      io.emit("active-users", Array.from(users.entries()));
    });
  });

  // connection
};
