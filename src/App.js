import React from 'react';
import WeatherDisplay from './components/WeatherDisplay';
import ForecastDisplay from './components/ForecastDisplay';
import { Container } from '@mui/material';

function App() {
  return (
    <Container>
      <WeatherDisplay />
      <ForecastDisplay />
    </Container>
  );
}

export default App;
