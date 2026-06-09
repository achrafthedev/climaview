import React from "react";
import WeatherDisplay from "./components/WeatherDisplay";
import ForecastDisplay from "./components/ForecastDisplay";
import MapComponent from "./components/MapComponent";
import { Box, Container, Typography, Link } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useContext } from "react";
import { ColorModeContext } from "./context/ThemeContext";

function App() {
  const theme = useTheme();
  const { mode } = useContext(ColorModeContext);

  const bgStyle =
    mode === "dark"
      ? {
          background:
            "radial-gradient(ellipse at top left, rgba(56,189,248,0.08) 0%, transparent 50%), radial-gradient(ellipse at bottom right, rgba(139,92,246,0.08) 0%, transparent 50%), #0B1426",
          minHeight: "100vh",
        }
      : {
          background:
            "radial-gradient(ellipse at top left, rgba(14,165,233,0.12) 0%, transparent 50%), radial-gradient(ellipse at bottom right, rgba(139,92,246,0.08) 0%, transparent 50%), #F0F9FF",
          minHeight: "100vh",
        };

  return (
    <Box sx={bgStyle}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <WeatherDisplay />
        <ForecastDisplay />
        <MapComponent />

        {/* Footer */}
        <Box
          component="footer"
          sx={{
            mt: 6,
            pt: 3,
            borderTop: `1px solid ${theme.palette.divider}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <Typography variant="caption" color="text.secondary">
            © {new Date().getFullYear()}{" "}
            <Link
              href="https://github.com/achrafthedev"
              target="_blank"
              rel="noopener noreferrer"
              color="primary"
              underline="hover"
            >
              Achraf Chardoudi
            </Link>{" "}
            — HETIC · RNCP 36146 · Bloc 3
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Powered by{" "}
            <Link
              href="https://openweathermap.org/"
              target="_blank"
              rel="noopener noreferrer"
              color="primary"
              underline="hover"
            >
              OpenWeatherMap
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default App;
