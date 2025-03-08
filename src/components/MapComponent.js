// Not used for now!

import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useDispatch } from "react-redux";
import { fetchWeather } from "../redux/weatherSlice";


import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

const defaultIcon = L.icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const MapComponent = () => {
  const dispatch = useDispatch();
  const [position, setPosition] = useState([48.8566, 2.3522]); // Paris

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
        dispatch(fetchWeather(`${e.latlng.lat},${e.latlng.lng}`));
      },
    });

    return position === null ? null : (
      <Marker position={position} icon={defaultIcon}>
        <Popup>
          📍 Vous êtes ici <br /> Cliquez ailleurs pour voir la météo d'un autre lieu.
        </Popup>
      </Marker>
    );
  };

  return (
    <MapContainer center={position} zoom={5} style={{ height: "400px", width: "100%", borderRadius: "10px", marginTop: "20px" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LocationMarker />
    </MapContainer>
  );
};

export default MapComponent;


// Not used for now!