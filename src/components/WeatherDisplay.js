import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from '../redux/weatherSlice';
import { Card, CardContent, Typography, TextField, Button, CircularProgress, Container } from '@mui/material';

const WeatherDisplay = () => {
  const [city, setCity] = useState('');
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.weather);

  const handleFetchWeather = () => {
    if (city) dispatch(fetchWeather(city));
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        🌤️ Dashboard Météo
      </Typography>

      <TextField
        fullWidth
        label="Entrez une ville..."
        variant="outlined"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Button variant="contained" color="primary" fullWidth onClick={handleFetchWeather}>
        Rechercher
      </Button>

      {status === 'loading' && (
        <Container sx={{ textAlign: "center", mt: 2 }}>
          <CircularProgress />
        </Container>
      )}

      {status === 'failed' && (
        <Typography color="error" align="center" sx={{ mt: 2 }}>
          Erreur : {error}
        </Typography>
      )}

      {data && (
        <Card sx={{ mt: 3, textAlign: "center", p: 2 }}>
          <CardContent>
            <Typography variant="h5">{data.name}, {data.sys.country}</Typography>
            <Typography variant="h6">🌡 Température : {data.main.temp}°C</Typography>
            <Typography variant="body1">🌥 Conditions : {data.weather[0].description}</Typography>
            <Typography variant="body1">💧 Humidité : {data.main.humidity}%</Typography>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default WeatherDisplay;
