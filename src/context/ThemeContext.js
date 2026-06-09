import React, { createContext, useState, useMemo, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

export const ColorModeContext = createContext();

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: { main: "#0EA5E9", dark: "#0284C7", light: "#38BDF8" },
          secondary: { main: "#8B5CF6" },
          background: {
            default: "#F0F9FF",
            paper: "rgba(255,255,255,0.85)",
          },
          text: { primary: "#0F172A", secondary: "#475569" },
          divider: "rgba(14,165,233,0.12)",
        }
      : {
          primary: { main: "#38BDF8", dark: "#0EA5E9", light: "#7DD3FC" },
          secondary: { main: "#A78BFA" },
          background: {
            default: "#0B1426",
            paper: "rgba(15,23,42,0.85)",
          },
          text: { primary: "#F1F5F9", secondary: "#94A3B8" },
          divider: "rgba(56,189,248,0.12)",
        }),
  },
  typography: {
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    h1: { fontWeight: 800, letterSpacing: "-0.025em" },
    h2: { fontWeight: 700, letterSpacing: "-0.02em" },
    h3: { fontWeight: 700, letterSpacing: "-0.015em" },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { fontWeight: 600, letterSpacing: "0.02em" },
  },
  shape: { borderRadius: 16 },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: `1px solid ${
            mode === "light"
              ? "rgba(255,255,255,0.6)"
              : "rgba(56,189,248,0.1)"
          }`,
          boxShadow:
            mode === "light"
              ? "0 8px 32px rgba(14,165,233,0.12), 0 2px 8px rgba(0,0,0,0.06)"
              : "0 8px 32px rgba(0,0,0,0.4), 0 2px 8px rgba(56,189,248,0.08)",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow:
              mode === "light"
                ? "0 16px 48px rgba(14,165,233,0.18), 0 4px 16px rgba(0,0,0,0.08)"
                : "0 16px 48px rgba(0,0,0,0.5), 0 4px 16px rgba(56,189,248,0.12)",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: "10px 24px",
          textTransform: "none",
          fontSize: "0.95rem",
          boxShadow: "none",
          "&:hover": { boxShadow: "0 4px 16px rgba(14,165,233,0.35)" },
        },
        containedPrimary: {
          background:
            mode === "light"
              ? "linear-gradient(135deg, #0EA5E9 0%, #8B5CF6 100%)"
              : "linear-gradient(135deg, #38BDF8 0%, #A78BFA 100%)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 12,
            backdropFilter: "blur(10px)",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 8, fontWeight: 600 },
      },
    },
  },
});

const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState("dark");

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    if (mode === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [mode]);

  const theme = useMemo(
    () => createTheme(getDesignTokens(mode)),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={{ mode, toggleColorMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ThemeContextProvider;
