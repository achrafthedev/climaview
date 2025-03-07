import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (city) => {
    const response = await axios.get(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
    return response.data;
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
