import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

const icon = L.icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
});

interface Position {
  lat: number;
  lng: number;
}

const MyLiveMap = () => {
  const [position, setPosition] = useState<Position | null>(null);

  useEffect(() => {
    console.log("insid")
    if ("geolocation" in navigator) {

        console.log("ok")
      navigator.geolocation.watchPosition(
        (pos) => {
            console.log("ok2")
          const { latitude, longitude } = pos.coords;
          setPosition({ lat: latitude, lng: longitude });

          const watchId = navigator.geolocation.watchPosition(
            (pos) => {
              const { latitude, longitude } = pos.coords;
              console.log(latitude, longitude);
              setPosition({ lat: latitude, lng: longitude });
            },
            (err) => {
              console.error("watchPosition error:", err);
            },
            {
              enableHighAccuracy: true,
              timeout: 30000,
           
            }
          );

          return () => navigator.geolocation.clearWatch(watchId);
        },
        (err) => {
          console.error("Initial getCurrentPosition error:", err);
        }
      );
    } else {
      console.error("Geolocation not supported");
    }
  }, []);
  const defaultPosition = { lat: 23.8103, lng: 90.4125 }; // Dhaka, Bangladesh

  console.log(position, "pos");

  return (
    <>
      {position ? (
        <MapContainer
        
          center={[position.lat, position.lng]}
          zoom={13}
          style={{ height: "100vh" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <Marker position={[position.lat, position.lng]} icon={icon}>
            <Popup>You are here!</Popup>
          </Marker>
        </MapContainer>
      ) : (
        <p>Getting location...</p>
      )}
    </>
  );
};

export default MyLiveMap;
