import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const ForecastDisplay = () => {
  const { data } = useSelector((state) => state.weather);

  if (!data || !data.daily) return null;

  return (
    <Grid container spacing={2} sx={{ mt: 3 }}>
      {data.daily.slice(1, 8).map((day, index) => (
        <Grid item xs={12} sm={4} md={3} key={index}>
          <Card sx={{ textAlign: "center", p: 2 }}>
            <CardContent>
              <Typography variant="h6">
                {new Date(day.dt * 1000).toLocaleDateString("en-US", { weekday: "long" })}
              </Typography>
              <Typography variant="body1">🌡 Temp: {day.temp.day}°C</Typography>
              <Typography variant="body2">🌥 {day.weather[0].description}</Typography>
              <Typography variant="body2">💧 Humidity: {day.humidity}%</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ForecastDisplay;
