import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../redux/weatherSlice";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Container,
  Box,
  IconButton,
} from "@mui/material";
import { ColorModeContext } from "../context/ThemeContext";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const WeatherDisplay = () => {
  const [city, setCity] = useState("");
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.weather);
  const colorMode = useContext(ColorModeContext);

  const handleFetchWeather = () => {
    if (city.trim() !== "") {
      dispatch(fetchWeather(city));
      setCity(""); // Réinitialiser le champ après la recherche
    }
  };
  

  return (
    <Container maxWidth="md" sx={{ textAlign: "center", mt: 4 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Typography variant="h3" sx={{ fontWeight: "bold", color: "primary.main" }}>
          🌤️ Dashboard Météo
        </Typography>
        <IconButton aria-label="toggle-dark-mode" onClick={colorMode.toggleColorMode} color="inherit">
          {colorMode.mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </Box>

      <Box display="flex" justifyContent="center" sx={{ mb: 3 }}>
        <TextField
          label="Entrez une ville..."
          variant="outlined"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          sx={{ width: "60%", mr: 2 }}
        />
        <Button data-testid="search-button"variant="contained" size="large" onClick={handleFetchWeather}>
          Rechercher
        </Button>
      </Box>

      {status === "loading" && <CircularProgress />}
      {status === "failed" && <Typography color="error">{error}</Typography>}

      {data?.current?.sys && (
        <Card elevation={4} sx={{ mt: 3, borderRadius: 3, p: 2 }}>
          <CardContent>
            <Typography variant="h4" data-testid="weather-title">
              {data.current.name}, {data.current.sys.country}
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              🌡 Température : {data.current.main.temp}°C
            </Typography>
            <Typography variant="h6">🌥 {data.current.weather[0].description}</Typography>
            <Typography variant="h6">💧 Humidité : {data.current.main.humidity}%</Typography>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default WeatherDisplay;
