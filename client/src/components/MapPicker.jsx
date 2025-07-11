// components/MapPicker.jsx
import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  Popup,
} from "react-leaflet";
import L from "leaflet";

// Fix marker icon paths
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function LocationMarker({ onSelect }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition({ lat, lng });
      onSelect({ lat, lng });
    },
  });

  return position ? (
    <Marker position={position}>
      <Popup>
        Selected Location
        <br />
        Lat: {position.lat.toFixed(5)}, Lng: {position.lng.toFixed(5)}
      </Popup>
    </Marker>
  ) : null;
}

export default function MapPicker({ onLocationSelect }) {
  return (
    <MapContainer
      center={[27.7172, 85.324]} // Default: Kathmandu
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "400px", width: "100%", borderRadius: "16px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker onSelect={onLocationSelect} />
    </MapContainer>
  );
}
