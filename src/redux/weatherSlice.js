import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org";

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (city) => {
    console.log("Fetching weather for:", city);

    // First request to get city coordinates
    const geoResponse = await axios.get(
      `${BASE_URL}/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    console.log("Geo Response:", geoResponse.data);

    const { lat, lon } = geoResponse.data.coord;

    // Second request to get 7-day forecast (Updated to One Call API 3.0)
    const weatherResponse = await axios.get(
      `${BASE_URL}/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${API_KEY}&units=metric`
    );
    console.log("Forecast Response:", weatherResponse.data);

    return { current: geoResponse.data, daily: weatherResponse.data.daily };
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
