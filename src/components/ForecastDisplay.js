import React from "react";
import { useSelector } from "react-redux";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Chip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useLanguage } from "../context/LanguageContext";
import WaterDrop from "@mui/icons-material/WaterDrop";

const weatherIconBg = {
  Clear: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)",
  Clouds: "linear-gradient(135deg, #64748b 0%, #94a3b8 100%)",
  Rain: "linear-gradient(135deg, #2563eb 0%, #60a5fa 100%)",
  Drizzle: "linear-gradient(135deg, #06b6d4 0%, #67e8f9 100%)",
  Thunderstorm: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
  Snow: "linear-gradient(135deg, #bfdbfe 0%, #e0f2fe 100%)",
  Mist: "linear-gradient(135deg, #9ca3af 0%, #d1d5db 100%)",
  Fog: "linear-gradient(135deg, #9ca3af 0%, #d1d5db 100%)",
};

const ForecastCard = ({ day, index, t, lang }) => {
  const weatherMain = day.weather?.[0]?.main || "Clear";
  const bg = weatherIconBg[weatherMain] || "linear-gradient(135deg, #0EA5E9 0%, #8B5CF6 100%)";

  const dateLabel = day.date.toLocaleDateString(
    lang === "fr" ? "fr-FR" : "en-US",
    { weekday: "short", day: "numeric", month: "short" }
  );

  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        textAlign: "center",
        animation: `fadeInUp 0.4s ease ${index * 0.08}s both`,
        "@keyframes fadeInUp": {
          from: { opacity: 0, transform: "translateY(20px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
      }}
    >
      <CardContent sx={{ p: "16px !important" }}>
        {/* Date header */}
        <Box
          sx={{
            background: bg,
            borderRadius: 2,
            py: 0.5,
            px: 1,
            mb: 1.5,
          }}
        >
          <Typography
            variant="caption"
            fontWeight={700}
            sx={{ color: "#fff", fontSize: "0.75rem", textTransform: "capitalize" }}
          >
            {dateLabel}
          </Typography>
        </Box>

        {/* Icon */}
        <Box sx={{ mb: 1 }}>
          <img
            src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
            alt={day.description}
            style={{ width: 56, height: 56, filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.2))" }}
          />
        </Box>

        {/* Temperature */}
        <Typography
          data-testid="forecast-temp"
          variant="h5"
          fontWeight={800}
          color="text.primary"
          sx={{ lineHeight: 1 }}
        >
          {day.temp !== null ? `${Math.round(day.temp)}°` : t.noData}
        </Typography>

        {/* High / Low */}
        {(day.tempMax !== null || day.tempMin !== null) && (
          <Box display="flex" justifyContent="center" gap={1} sx={{ mt: 0.5 }}>
            {day.tempMax !== null && (
              <Typography variant="caption" color="error.main" fontWeight={600}>
                ↑{Math.round(day.tempMax)}°
              </Typography>
            )}
            {day.tempMin !== null && (
              <Typography variant="caption" color="primary.main" fontWeight={600}>
                ↓{Math.round(day.tempMin)}°
              </Typography>
            )}
          </Box>
        )}

        {/* Description */}
        <Typography
          data-testid="forecast-description"
          variant="caption"
          color="text.secondary"
          display="block"
          sx={{ mt: 0.75, textTransform: "capitalize", lineHeight: 1.3, minHeight: 30 }}
        >
          {day.description}
        </Typography>

        {/* Humidity */}
        <Chip
          data-testid="forecast-humidity"
          icon={<WaterDrop sx={{ fontSize: "0.75rem !important" }} />}
          label={day.humidity !== null ? `${day.humidity}%` : t.noData}
          size="small"
          sx={{ mt: 1, fontSize: "0.7rem", height: 22 }}
          color="primary"
          variant="outlined"
        />
      </CardContent>
    </Card>
  );
};

const ForecastDisplay = () => {
  const { data } = useSelector((state) => state.weather);
  const { t, lang } = useLanguage();
  const theme = useTheme();

  if (!data || !data.daily || !Array.isArray(data.daily) || data.daily.length === 0) {
    return (
      <Box
        sx={{
          mt: 4,
          p: 4,
          borderRadius: 3,
          textAlign: "center",
          border: `1px dashed ${theme.palette.divider}`,
        }}
      >
        <Typography variant="h6" sx={{ fontSize: "2rem", mb: 1 }}>
          🌍
        </Typography>
        <Typography color="text.secondary">{t.noForecast}</Typography>
      </Box>
    );
  }

  const forecastArray = data.daily
    .map((entry) => ({
      date: new Date(entry.dt * 1000),
      temp: entry.temp?.day ?? entry.main?.temp ?? null,
      tempMax: entry.temp?.max ?? entry.main?.temp_max ?? null,
      tempMin: entry.temp?.min ?? entry.main?.temp_min ?? null,
      humidity: entry.humidity ?? entry.main?.humidity ?? null,
      description: entry.weather?.[0]?.description ?? t.noData,
      icon: entry.weather?.[0]?.icon ?? "01d",
      weather: entry.weather,
    }))
    .filter((entry, index, self) =>
      index === self.findIndex((e) => e.date.toDateString() === entry.date.toDateString())
    )
    .slice(1, 6);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography
        variant="h5"
        fontWeight={700}
        sx={{ mb: 2.5, color: "text.primary" }}
      >
        {t.forecast}
      </Typography>

      <Grid container spacing={2}>
        {forecastArray.map((day, index) => (
          <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
            <ForecastCard day={day} index={index} t={t} lang={lang} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ForecastDisplay;
