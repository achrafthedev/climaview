import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org";

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (city) => {
    console.log("Recherche des données météo pour:", city);

    try {
      const geoResponse = await axios.get(
        `${BASE_URL}/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      console.log("Coordonnées obtenues:", geoResponse.data);

      const { lat, lon } = geoResponse.data.coord;

      try {
        const weatherResponse = await axios.get(
          `${BASE_URL}/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${API_KEY}&units=metric`
        );
        console.log("Données météo (One Call API v3.0) :", weatherResponse.data);

        return { current: geoResponse.data, daily: weatherResponse.data.daily };
      } catch {
        console.warn("Échec de One Call API v3.0, tentative avec Forecast 5 jours...");

        const forecastResponse = await axios.get(
          `${BASE_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        console.log("Données météo (Forecast 5 jours):", forecastResponse.data);

        return { current: geoResponse.data, daily: forecastResponse.data.list };
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données météo:", error.response?.data || error.message);
      throw error;
    }
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: { data: null, status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        console.log("Mise à jour du store Redux:", action.payload);
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        console.error("Erreur Redux:", action.error.message);
      });
  },
});

export default weatherSlice.reducer;
