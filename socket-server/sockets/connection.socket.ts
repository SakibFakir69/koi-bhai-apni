import { Socket, Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";

const users = new Map<string, string>();



export const initSocket = (io: Server) => {

  io.on("connection", (socket: Socket) => {
    console.log(`new user add on server ${socket.id}`);

    users.set(socket.id, uuidv4());



    // recive location 

    socket.on('send-location', ({lat, lng,id})=>{
      console.log(lat, lng, " -> ",id);

      socket.emit('recive-location',{lat,lng});

      // ai id ra abr location patao

      socket.to(id).emit('recive-location',{lat,lng});

      

    })


    console.log(users.size);

   

    socket.on("disconnect", () => {
      users.delete(socket.id);
      console.log("disconnected");
    });
  });

  // connection lost
};
