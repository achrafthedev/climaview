import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const ForecastDisplay = () => {
  const { data } = useSelector((state) => state.weather);

  // ✅ FIX: Check if data exists before rendering
  if (!data || !data.daily || data.daily.length === 0) {
    return <Typography align="center" sx={{ mt: 2 }}>Aucune prévision disponible</Typography>;
  }

  return (
    <Grid container spacing={2} sx={{ mt: 3 }}>
      {data.daily.slice(1, 6).map((day, index) => (
        <Grid item xs={12} sm={4} md={3} key={index}>
          <Card sx={{ textAlign: "center", p: 2 }}>
            <CardContent>
              <Typography variant="h6">
                {new Date(day.dt * 1000).toLocaleDateString("fr-FR", { weekday: "long" })}
              </Typography>
              <Typography variant="body1">🌡 Temp: {day.temp.day}°C</Typography>
              <Typography variant="body2">🌥 {day.weather[0].description}</Typography>
              <Typography variant="body2">💧 Humidité: {day.humidity}%</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ForecastDisplay;
