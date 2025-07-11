import React, { useState, useEffect, useCallback } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";

// Fix default marker icon issue with Leaflet + React
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

function LocationMarker({ position, setPosition }) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  return position === null ? null : <Marker position={position}></Marker>;
}

export default function LocationPicker({ onLocationSelect }) {
  const [position, setPosition] = useState(null);

  // Stable callback to prevent unnecessary re-renders
  const stableOnLocationSelect = useCallback(onLocationSelect, []);

  // Notify parent only when position changes
  useEffect(() => {
    if (position) {
      stableOnLocationSelect({
        lat: position.lat,
        lng: position.lng,
      });
    }
  }, [position, stableOnLocationSelect]);

  return (
    <div className="w-full h-64 sm:h-96 rounded-xl overflow-hidden border border-gray-300">
      <MapContainer
        center={[27.7172, 85.324]} // Kathmandu center coordinates
        zoom={12}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker position={position} setPosition={setPosition} />
      </MapContainer>
      <p className="text-center mt-2 text-sm text-gray-600">
        Click on the map to select your delivery location
      </p>
    </div>
  );
}
