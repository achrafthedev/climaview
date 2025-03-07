import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from '../redux/weatherSlice';
import { Card, CardContent, Typography, TextField, Button, CircularProgress, Container, Box } from '@mui/material';

const WeatherDisplay = () => {
  const [city, setCity] = useState('');
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.weather);

  const handleFetchWeather = () => {
    if (city) dispatch(fetchWeather(city));
  };

  return (
    <Container maxWidth="md" sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold", color: "#1976D2" }}>
        🌤️ Dashboard Météo
      </Typography>

      <Box display="flex" justifyContent="center" sx={{ mb: 3 }}>
        <TextField
          label="Entrez une ville..."
          variant="outlined"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          sx={{ width: "60%", mr: 2 }}
        />
        <Button variant="contained" size="large" sx={{ bgcolor: "#1976D2" }} onClick={handleFetchWeather}>
          Rechercher
        </Button>
      </Box>

      {status === 'loading' && <CircularProgress />}
      {status === 'failed' && <Typography color="error">{error}</Typography>}

      {data && data.current && data.current.sys && (
        <Card elevation={4} sx={{ mt: 3, borderRadius: 3, p: 2, bgcolor: "#E3F2FD" }}>
          <CardContent>
            <Typography variant="h4">{data.current.name}, {data.current.sys.country}</Typography>
            <Typography variant="h5" sx={{ fontWeight: "bold", color: "#D32F2F" }}>
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
