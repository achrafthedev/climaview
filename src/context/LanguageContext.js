import React, { createContext, useContext, useState } from "react";

export const LanguageContext = createContext();

export const translations = {
  en: {
    appTitle: "ClimaView",
    appSubtitle: "Weather Dashboard",
    searchPlaceholder: "Search a city...",
    searchButton: "Search",
    currentWeather: "Current Weather",
    forecast: "5-Day Forecast",
    feelsLike: "Feels like",
    humidity: "Humidity",
    wind: "Wind",
    temperature: "Temperature",
    noForecast: "No forecast available. Search for a city above.",
    noData: "Unavailable",
    darkMode: "Dark mode",
    lightMode: "Light mode",
    mapTitle: "Interactive Map",
    mapHint: "Click anywhere on the map to get the weather at that location",
    mapPopupHere: "📍 You are here",
    mapPopupClick: "Click elsewhere to get the weather at another location.",
    errorCity: "City not found. Please check the name and try again.",
    errorGeneric: "Failed to fetch weather data. Please try again.",
    loading: "Loading...",
    toggleLang: "FR",
    high: "High",
    low: "Low",
    pressure: "Pressure",
    visibility: "Visibility",
    sunrise: "Sunrise",
    sunset: "Sunset",
  },
  fr: {
    appTitle: "ClimaView",
    appSubtitle: "Dashboard Météo",
    searchPlaceholder: "Rechercher une ville...",
    searchButton: "Rechercher",
    currentWeather: "Météo Actuelle",
    forecast: "Prévisions sur 5 Jours",
    feelsLike: "Ressenti",
    humidity: "Humidité",
    wind: "Vent",
    temperature: "Température",
    noForecast: "Aucune prévision disponible. Recherchez une ville ci-dessus.",
    noData: "Indisponible",
    darkMode: "Mode sombre",
    lightMode: "Mode clair",
    mapTitle: "Carte Interactive",
    mapHint: "Cliquez sur la carte pour obtenir la météo à cet endroit",
    mapPopupHere: "📍 Vous êtes ici",
    mapPopupClick: "Cliquez ailleurs pour voir la météo d'un autre lieu.",
    errorCity: "Ville introuvable. Vérifiez le nom et réessayez.",
    errorGeneric: "Impossible de récupérer les données météo. Réessayez.",
    loading: "Chargement...",
    toggleLang: "EN",
    high: "Max",
    low: "Min",
    pressure: "Pression",
    visibility: "Visibilité",
    sunrise: "Lever",
    sunset: "Coucher",
  },
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState("fr");

  const toggleLanguage = () => {
    setLang((prev) => (prev === "fr" ? "en" : "fr"));
  };

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
