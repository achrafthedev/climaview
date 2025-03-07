import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, Typography, Grid, Container } from '@mui/material';

const ForecastDisplay = () => {
  const { data } = useSelector((state) => state.weather);
  console.log("Forecast Data:", data?.daily);

  if (!data || !data.daily || !Array.isArray(data.daily) || data.daily.length === 0) {
    return <Typography align="center" sx={{ mt: 2 }}>Aucune prévision disponible</Typography>;
  }

  // Group forecast by unique dates
  const groupedForecast = {};
  data.daily.forEach((entry) => {
    const date = new Date(entry.dt * 1000).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
    if (!groupedForecast[date]) {
      groupedForecast[date] = entry;
    }
  });

  const forecastArray = Object.values(groupedForecast).slice(1, 6);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ textAlign: "center", color: "#1976D2", fontWeight: "bold", mb: 3 }}>
        🔮 Prévisions Météo
      </Typography>
      
      <Grid container spacing={3} justifyContent="center">
        {forecastArray.map((day, index) => (
          <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
            <Card elevation={4} sx={{ textAlign: "center", p: 2, borderRadius: 3, bgcolor: "#E1F5FE" }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#0288D1" }}>
                  {new Date(day.dt * 1000).toLocaleDateString("fr-FR", { weekday: "long" })}
                </Typography>
                <img src={`https://openweathermap.org/img/wn/${day.weather?.[0]?.icon}.png`} alt="weather icon" />
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
    </Container>
  );
};

export default ForecastDisplay;
