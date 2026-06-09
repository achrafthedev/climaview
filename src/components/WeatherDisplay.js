import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather, clearError } from "../redux/weatherSlice";
import {
  Typography,
  TextField,
  Button,
  CircularProgress,
  Box,
  IconButton,
  Chip,
  Alert,
  Collapse,
  InputAdornment,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ColorModeContext } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import SearchIcon from "@mui/icons-material/Search";
import WaterDrop from "@mui/icons-material/WaterDrop";
import Air from "@mui/icons-material/Air";
import Visibility from "@mui/icons-material/Visibility";
import Speed from "@mui/icons-material/Speed";
import WbSunny from "@mui/icons-material/WbSunny";
import Brightness3 from "@mui/icons-material/Brightness3";

const getWeatherGradient = (weatherMain, mode) => {
  const gradients = {
    Clear: mode === "dark"
      ? "linear-gradient(135deg, #1a3a5c 0%, #0f2744 100%)"
      : "linear-gradient(135deg, #60a5fa 0%, #fbbf24 100%)",
    Clouds: mode === "dark"
      ? "linear-gradient(135deg, #1e293b 0%, #334155 100%)"
      : "linear-gradient(135deg, #94a3b8 0%, #cbd5e1 100%)",
    Rain: mode === "dark"
      ? "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)"
      : "linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)",
    Drizzle: mode === "dark"
      ? "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)"
      : "linear-gradient(135deg, #67e8f9 0%, #93c5fd 100%)",
    Thunderstorm: mode === "dark"
      ? "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)"
      : "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
    Snow: mode === "dark"
      ? "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)"
      : "linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 100%)",
  };
  return gradients[weatherMain] || (mode === "dark"
    ? "linear-gradient(135deg, #0B1426 0%, #1e293b 100%)"
    : "linear-gradient(135deg, #F0F9FF 0%, #e0f2fe 100%)");
};

const StatCard = ({ icon, label, value }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 0.5,
        p: 1.5,
        borderRadius: 2,
        background: theme.palette.mode === "dark"
          ? "rgba(255,255,255,0.05)"
          : "rgba(255,255,255,0.5)",
        border: `1px solid ${theme.palette.divider}`,
        minWidth: 80,
      }}
    >
      <Box sx={{ color: theme.palette.primary.main, display: "flex" }}>{icon}</Box>
      <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
        {label}
      </Typography>
      <Typography variant="body2" fontWeight={700} color="text.primary">
        {value}
      </Typography>
    </Box>
  );
};

const WeatherDisplay = () => {
  const [city, setCity] = useState("");
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.weather);
  const colorMode = useContext(ColorModeContext);
  const { t, lang, toggleLanguage } = useLanguage();
  const theme = useTheme();

  const handleFetchWeather = () => {
    if (city.trim() !== "") {
      dispatch(fetchWeather(city.trim()));
      setCity("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleFetchWeather();
  };

  const weatherMain = data?.current?.weather?.[0]?.main;
  const gradient = getWeatherGradient(weatherMain, colorMode.mode);

  const formatTime = (unix) => {
    if (!unix) return "—";
    return new Date(unix * 1000).toLocaleTimeString(lang === "fr" ? "fr-FR" : "en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getErrorMessage = (code) => {
    if (code === "CITY_NOT_FOUND") return t.errorCity;
    return t.errorGeneric;
  };

  return (
    <Box>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 3 }}
      >
        <Box>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              background: "linear-gradient(135deg, #0EA5E9 0%, #8B5CF6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              lineHeight: 1.1,
            }}
          >
            {t.appTitle}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
            {t.appSubtitle}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1}>
          <Chip
            label={t.toggleLang}
            onClick={toggleLanguage}
            size="small"
            variant="outlined"
            sx={{ fontWeight: 700, cursor: "pointer", fontSize: "0.8rem" }}
          />
          <IconButton
            aria-label="toggle-dark-mode"
            onClick={colorMode.toggleColorMode}
            size="small"
            sx={{
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 2,
              p: 0.75,
            }}
          >
            {colorMode.mode === "light" ? (
              <DarkModeIcon fontSize="small" />
            ) : (
              <LightModeIcon fontSize="small" />
            )}
          </IconButton>
        </Box>
      </Box>

      {/* Search */}
      <Box display="flex" gap={1.5} sx={{ mb: 3 }}>
        <TextField
          label={t.searchPlaceholder}
          variant="outlined"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyDown}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" fontSize="small" />
              </InputAdornment>
            ),
          }}
          sx={{ flex: 1 }}
        />
        <Button
          data-testid="search-button"
          variant="contained"
          size="large"
          onClick={handleFetchWeather}
          disabled={status === "loading"}
          sx={{ whiteSpace: "nowrap", minWidth: 130 }}
        >
          {status === "loading" ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            t.searchButton
          )}
        </Button>
      </Box>

      {/* Error */}
      <Collapse in={status === "failed"}>
        <Alert
          severity="error"
          onClose={() => dispatch(clearError())}
          sx={{ mb: 2, borderRadius: 2 }}
        >
          {getErrorMessage(error)}
        </Alert>
      </Collapse>

      {/* Weather Card */}
      {data?.current?.sys && (
        <Box
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            background: gradient,
            border: `1px solid ${theme.palette.divider}`,
            backdropFilter: "blur(20px)",
            boxShadow:
              colorMode.mode === "dark"
                ? "0 8px 32px rgba(0,0,0,0.5)"
                : "0 8px 32px rgba(14,165,233,0.15)",
            animation: "fadeInUp 0.5s ease",
            "@keyframes fadeInUp": {
              from: { opacity: 0, transform: "translateY(16px)" },
              to: { opacity: 1, transform: "translateY(0)" },
            },
          }}
        >
          {/* Main info */}
          <Box
            sx={{
              p: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Box>
              <Typography
                variant="h4"
                data-testid="weather-title"
                fontWeight={700}
                color="text.primary"
              >
                {data.current.name}, {data.current.sys.country}
              </Typography>
              <Box display="flex" alignItems="center" gap={1} sx={{ mt: 0.5 }}>
                <Typography
                  variant="h1"
                  sx={{ fontSize: "4rem", fontWeight: 800, lineHeight: 1, color: "text.primary" }}
                >
                  {Math.round(data.current.main.temp)}°C
                </Typography>
              </Box>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5, textTransform: "capitalize" }}>
                {data.current.weather[0].description}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {t.feelsLike}: {Math.round(data.current.main.feels_like)}°C
              </Typography>
            </Box>

            <Box sx={{ textAlign: "center" }}>
              <img
                src={`https://openweathermap.org/img/wn/${data.current.weather[0].icon}@4x.png`}
                alt={data.current.weather[0].description}
                style={{ width: 120, height: 120, filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.3))" }}
              />
            </Box>
          </Box>

          {/* Stats row */}
          <Box
            sx={{
              px: 3,
              pb: 3,
              display: "flex",
              flexWrap: "wrap",
              gap: 1.5,
            }}
          >
            <StatCard
              icon={<WaterDrop fontSize="small" />}
              label={t.humidity}
              value={`${data.current.main.humidity}%`}
            />
            <StatCard
              icon={<Air fontSize="small" />}
              label={t.wind}
              value={`${Math.round(data.current.wind?.speed * 3.6)} km/h`}
            />
            <StatCard
              icon={<Speed fontSize="small" />}
              label={t.pressure}
              value={`${data.current.main.pressure} hPa`}
            />
            <StatCard
              icon={<Visibility fontSize="small" />}
              label={t.visibility}
              value={`${Math.round((data.current.visibility || 0) / 1000)} km`}
            />
            <StatCard
              icon={<WbSunny fontSize="small" />}
              label={t.sunrise}
              value={formatTime(data.current.sys.sunrise)}
            />
            <StatCard
              icon={<Brightness3 fontSize="small" />}
              label={t.sunset}
              value={formatTime(data.current.sys.sunset)}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default WeatherDisplay;
