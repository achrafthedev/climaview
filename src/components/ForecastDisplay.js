import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, Typography, Grid, Container } from '@mui/material';

const ForecastDisplay = () => {
  const { data } = useSelector((state) => state.weather);

  if (!data || !data.daily || !Array.isArray(data.daily) || data.daily.length === 0) {
    return <Typography align="center" sx={{ mt: 2 }}>Aucune prévision disponible</Typography>;
  }

  // 🔍 Debugging: Vérifions si les données sont bien reçues
  console.log("🔍 Prévisions météo complètes :", data.daily);

  // Extraire les prévisions des 5 prochains jours avec correction des doublons
  const forecastArray = data.daily
    .map((entry) => ({
      date: new Date(entry.dt * 1000),
      temp: entry.temp?.day ?? entry.main?.temp ?? null,
      humidity: entry.humidity ?? entry.main?.humidity ?? null,
      description: entry.weather?.[0]?.description ?? "Donnée indisponible",
      icon: entry.weather?.[0]?.icon ?? "01d"
    }))
    .filter((entry, index, self) =>
      index === self.findIndex((e) => e.date.toDateString() === entry.date.toDateString())
    )
    .slice(1, 6); // On garde uniquement les 5 prochains jours

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ textAlign: "center", fontWeight: "bold", mb: 3 }}>
        🔮 Prévisions Météo
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {forecastArray.map((day, index) => (
          <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
            <Card elevation={4} sx={{ textAlign: "center", p: 2, borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {day.date.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
                </Typography>
                <img src={`https://openweathermap.org/img/wn/${day.icon}.png`} alt="weather icon" />
                <Typography variant="body1">
                  🌡 Temp: {day.temp !== null ? `${day.temp}°C` : "Donnée indisponible"}
                </Typography>
                <Typography variant="body2">
                  🌥 {day.description}
                </Typography>
                <Typography variant="body2">
                  💧 Humidité: {day.humidity !== null ? `${day.humidity}%` : "Donnée indisponible"}
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
