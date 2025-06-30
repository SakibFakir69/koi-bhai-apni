import { useEffect, useState } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:5000");

function App() {

  useEffect(() => {
    socket.on("connect", () => {
      const engine = socket.io.engine;
      
      if(engine)
      {
        console.log("socket is connected");
      }




      engine.on("close", (reason) => {
        console.log(`server is closed ${reason}`);
      });
    });
  }, []);

  return <div>

    <h1>Oi bhai koi tui</h1>


  </div>;
}

export default App;
