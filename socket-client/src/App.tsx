import { useEffect, useState } from "react";

import "leaflet/dist/leaflet.css";
import Map from "./Maps/Map";
import SearchContacts from "./page/SearchContacts";
import Navbar from "./layouts/Navbar";

import { SocketConnection } from "./utils/SocketConnection";

export const socket = SocketConnection();

function App() {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      const engine = socket.io.engine;

      if (engine) {
        console.log("socket is connected");
      }
      // location access

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

  console.log(`total user ${userList.length} `);

  // connect

  const handelConnect = (userId: any) => {
    socket.emit("send-request-Id", userId);
  };

  useEffect(() => {
    socket.on("share-location-access", (data) => {
      console.log(data.fromUserId, " accpet or reject");

      // accpet send location both user

      if (data) {
        const isConfirm = window.confirm("Send Location Shareing Request");
        //  confirm 1

        // location share and recive

        if (isConfirm) {
          window.navigator.geolocation.getCurrentPosition((pos) => {
            console.log(pos);
            const { longitude, latitude } = pos.coords;

            socket.emit('share-location',{longitude,latitude , reciver_Id:data.fromUserId});

          });
        }
      }
    });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="p-10 flex gap-x-7 w-full">
        <section className="border-2 min-h-40 w-full">
          {/* <SearchContacts /> */}

          {userList.map((user: any, key) => (
            <div key={key} className=" flex gap-y-2 p-3 ">
              <div className="border w-full p-1 rounded bg-amber-50 border-white/30 flex justify-between">
                <div>
                  <p>{user?.name}</p>
                  <p>{user?.userId}</p>
                </div>
                <div>
                  <button
                    onClick={() => handelConnect(user.userId)}
                    className="btn btn-primary"
                    disabled={!user.userId}
                  >
                    Connect
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className="border-2 w-full">
          <Map />
        </section>
      </div>
    </div>
  );
}

export default App;
