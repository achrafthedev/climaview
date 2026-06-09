import React, { useState, useContext } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeatherByCoords } from "../redux/weatherSlice";
import { ColorModeContext } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import { Typography, Box, CircularProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

const defaultIcon = L.icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// Dark mode map tile: CartoDB Dark Matter
// Light mode map tile: OpenStreetMap
const DARK_TILE = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
const LIGHT_TILE = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

const LocationMarker = ({ position, setPosition, t }) => {
  const dispatch = useDispatch();

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      dispatch(fetchWeatherByCoords({ lat, lon: lng }));
    },
  });

  if (!position) return null;

  return (
    <Marker position={position} icon={defaultIcon}>
      <Popup>
        <strong>{t.mapPopupHere}</strong>
        <br />
        <span style={{ fontSize: "0.8rem" }}>{t.mapPopupClick}</span>
      </Popup>
    </Marker>
  );
};

const MapComponent = () => {
  const { mode } = useContext(ColorModeContext);
  const { t } = useLanguage();
  const theme = useTheme();
  const { status } = useSelector((state) => state.weather);
  const [position, setPosition] = useState([48.8566, 2.3522]); // Paris default

  const tileUrl = mode === "dark" ? DARK_TILE : LIGHT_TILE;
  const tileAttribution =
    mode === "dark"
      ? '&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

  return (
    <Box sx={{ mt: 4 }}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Typography variant="h5" fontWeight={700} color="text.primary">
          {t.mapTitle}
        </Typography>
        {status === "loading" && (
          <Box display="flex" alignItems="center" gap={1}>
            <CircularProgress size={16} />
            <Typography variant="caption" color="text.secondary">
              {t.loading}
            </Typography>
          </Box>
        )}
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {t.mapHint}
      </Typography>

      <Box
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          border: `1px solid ${theme.palette.divider}`,
          boxShadow:
            mode === "dark"
              ? "0 8px 32px rgba(0,0,0,0.5)"
              : "0 8px 32px rgba(14,165,233,0.12)",
          "& .leaflet-container": {
            background: mode === "dark" ? "#0B1426" : "#F0F9FF",
          },
        }}
      >
        <MapContainer
          center={position}
          zoom={5}
          style={{ height: "420px", width: "100%" }}
          key={mode} // remount on theme change to update tiles
        >
          <TileLayer url={tileUrl} attribution={tileAttribution} />
          <LocationMarker position={position} setPosition={setPosition} t={t} />
        </MapContainer>
      </Box>
    </Box>
  );
};

export default MapComponent;