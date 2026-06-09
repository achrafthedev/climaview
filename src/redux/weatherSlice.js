import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org";

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (city, { rejectWithValue }) => {
    try {
      const geoResponse = await axios.get(
        `${BASE_URL}/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=fr`
      );

      const { lat, lon } = geoResponse.data.coord;

      try {
        const weatherResponse = await axios.get(
          `${BASE_URL}/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${API_KEY}&units=metric&lang=fr`
        );
        return { current: geoResponse.data, daily: weatherResponse.data.daily };
      } catch {
        // Fallback to free 5-day forecast endpoint
        const forecastResponse = await axios.get(
          `${BASE_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=fr`
        );
        return { current: geoResponse.data, daily: forecastResponse.data.list };
      }
    } catch (error) {
      const status = error.response?.status;
      if (status === 404) {
        return rejectWithValue("CITY_NOT_FOUND");
      }
      return rejectWithValue("FETCH_ERROR");
    }
  }
);

export const fetchWeatherByCoords = createAsyncThunk(
  "weather/fetchWeatherByCoords",
  async ({ lat, lon }, { rejectWithValue }) => {
    try {
      const currentResponse = await axios.get(
        `${BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=fr`
      );

      try {
        const weatherResponse = await axios.get(
          `${BASE_URL}/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${API_KEY}&units=metric&lang=fr`
        );
        return { current: currentResponse.data, daily: weatherResponse.data.daily };
      } catch {
        const forecastResponse = await axios.get(
          `${BASE_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=fr`
        );
        return { current: currentResponse.data, daily: forecastResponse.data.list };
      }
    } catch (error) {
      return rejectWithValue("FETCH_ERROR");
    }
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: { data: null, status: "idle", error: null },
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.status = "loading";
      state.error = null;
    };
    const handleFulfilled = (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
    };
    const handleRejected = (state, action) => {
      state.status = "failed";
      state.error = action.payload ?? "FETCH_ERROR";
    };

    builder
      .addCase(fetchWeather.pending, handlePending)
      .addCase(fetchWeather.fulfilled, handleFulfilled)
      .addCase(fetchWeather.rejected, handleRejected)
      .addCase(fetchWeatherByCoords.pending, handlePending)
      .addCase(fetchWeatherByCoords.fulfilled, handleFulfilled)
      .addCase(fetchWeatherByCoords.rejected, handleRejected);
  },
});

export const { clearError } = weatherSlice.actions;
export default weatherSlice.reducer;
