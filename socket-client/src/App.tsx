import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Map from "./Maps/Map";
import SearchContacts from "./page/SearchContacts";

export const socket = io("http://localhost:5000");

function App() {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      const engine = socket.io.engine;

      if (engine) {
        console.log("socket is connected");
      }

      // active user

      socket.on("active-users", (users) => {
        console.log(users, " active users");

        setUserList(users);
      });

      engine.on("close", (reason) => {
        console.log(`server is closed ${reason}`);
      });
    });
  }, []);

  // show user

  console.log( `total user ${userList.length} `);

  return (
    <div className="p-10 flex gap-x-7 w-full">
      <section className="border-2 min-h-40 w-full">
        <SearchContacts />
      </section>

      <section className="border-2 w-full">
        <Map />
      </section>
    </div>
  );
}

export default App;
