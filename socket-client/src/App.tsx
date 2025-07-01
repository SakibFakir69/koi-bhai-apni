import { useEffect } from "react";
import { io } from "socket.io-client";
import { MapContainer, TileLayer, Marker, Popup ,Polygon} from "react-leaflet";
import "leaflet/dist/leaflet.css";

const socket = io("http://localhost:5000");

function App() {
  useEffect(() => {
    socket.on("connect", () => {
      const engine = socket.io.engine;

      if (engine) {
        console.log("socket is connected");
      }

      engine.on("close", (reason) => {
        console.log(`server is closed ${reason}`);
      });
    });
  }, []);


const gulshanArea = [
  [23.778, 90.410],
  [23.779, 90.420],
  [23.772, 90.425],
  [23.770, 90.415],
];



  return (
    <div className="p-10">
      
    </div>
  );
}

export default App;
