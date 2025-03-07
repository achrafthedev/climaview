import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org";

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (city) => {
    console.log("Fetching weather for:", city);

    try {
      // 🌍 First request to get city coordinates
      const geoResponse = await axios.get(
        `${BASE_URL}/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      console.log("Geo Response:", geoResponse.data);

      const { lat, lon } = geoResponse.data.coord;

      try {
        // 🌤️ First attempt: Fetch 7-day forecast using One Call API v3.0
        const weatherResponse = await axios.get(
          `${BASE_URL}/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${API_KEY}&units=metric`
        );
        console.log("One Call API v3.0 Response:", weatherResponse.data);

        return { current: geoResponse.data, daily: weatherResponse.data.daily };
      } catch (error) {
        console.error("One Call API v3.0 failed! Trying 5-day forecast API...");

        // 🔄 Fallback: Fetch 5-day forecast if One Call API fails (401 error)
        const forecastResponse = await axios.get(
          `${BASE_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        console.log("5-Day Forecast API Response:", forecastResponse.data);

        return { current: geoResponse.data, daily: forecastResponse.data.list };
      }
    } catch (error) {
      console.error("Error fetching weather data:", error.response?.data || error.message);
      throw error;
    }
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState: { data: null, status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default weatherSlice.reducer;
