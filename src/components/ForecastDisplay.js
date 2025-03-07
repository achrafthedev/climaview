import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const ForecastDisplay = () => {
  const { data } = useSelector((state) => state.weather);
  console.log("Forecast Data (Full):", data?.daily); // Debugging Log

  if (!data || !data.daily || !Array.isArray(data.daily) || data.daily.length === 0) {
    return <Typography align="center" sx={{ mt: 2 }}>Aucune prévision disponible</Typography>;
  }

  // ✅ Group forecast by unique dates
  const groupedForecast = {};
  data.daily.forEach((entry) => {
    const date = new Date(entry.dt * 1000).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
    if (!groupedForecast[date]) {
      groupedForecast[date] = entry;
    }
  });

  const forecastArray = Object.values(groupedForecast).slice(1, 6); // Show next 5 days

  return (
    <Grid container spacing={2} sx={{ mt: 3 }}>
      {forecastArray.map((day, index) => (
        <Grid item xs={12} sm={4} md={3} key={index}>
          <Card sx={{ textAlign: "center", p: 2 }}>
            <CardContent>
              <Typography variant="h6">
                {new Date(day.dt * 1000).toLocaleDateString("fr-FR", { weekday: "long" })}
              </Typography>
              <Typography variant="body1">
                🌡 Temp: {day.temp?.day ?? day.main?.temp ?? 'N/A'}°C
              </Typography>
              <Typography variant="body2">
                🌥 {day.weather?.[0]?.description ?? 'N/A'}
              </Typography>
              <Typography variant="body2">
                💧 Humidité: {day.humidity ?? day.main?.humidity ?? 'N/A'}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ForecastDisplay;
