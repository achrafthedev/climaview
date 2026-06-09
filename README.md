# 🌤️ ClimaView — Weather Dashboard

<div align="center">

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Redux](https://img.shields.io/badge/Redux_Toolkit-2.x-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![MUI](https://img.shields.io/badge/Material_UI-6.x-007FFF?style=for-the-badge&logo=mui&logoColor=white)](https://mui.com/)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9-199900?style=for-the-badge&logo=leaflet&logoColor=white)](https://leafletjs.com/)
[![Cypress](https://img.shields.io/badge/Cypress-14.x-17202C?style=for-the-badge&logo=cypress&logoColor=white)](https://www.cypress.io/)
[![Docker](https://img.shields.io/badge/Docker-ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](./Dockerfile)
[![Deploy](https://img.shields.io/badge/GitHub_Pages-deployed-222222?style=for-the-badge&logo=github&logoColor=white)](https://achrafthedev.github.io/climaview)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](./LICENSE)

**A modern, bilingual (FR/EN) weather dashboard built with React, Redux Toolkit, and the OpenWeatherMap API.**

*Un dashboard météo moderne et bilingue (FR/EN) construit avec React, Redux Toolkit et l'API OpenWeatherMap.*

</div>

---

## ✨ Features / Fonctionnalités

| Feature | EN | FR |
|---|---|---|
| 🌡️ Current weather | Temperature, humidity, wind, pressure, visibility, sunrise & sunset | Température, humidité, vent, pression, visibilité, lever & coucher du soleil |
| 📅 5-day forecast | Daily cards with high/low temps and weather icons | Cartes journalières avec min/max et icônes météo |
| 🗺️ Interactive map | Click anywhere to get local weather | Cliquez sur la carte pour obtenir la météo locale |
| 🌓 Dark / Light mode | Glassmorphism UI that adapts to theme | Interface glassmorphisme adaptée au thème |
| 🌐 Bilingual | Toggle between French and English instantly | Basculer entre le français et l'anglais |
| 🔍 City search | Search any city worldwide with keyboard support | Recherche de ville mondiale avec support clavier |
| ✅ E2E tests | Cypress test suite for core flows | Suite de tests Cypress pour les flux principaux |

---

## 🛠️ Tech Stack / Technologies

| Layer | Technology |
|---|---|
| Frontend | React 19, React Router |
| State management | Redux Toolkit, React-Redux |
| UI components | Material UI v6, Emotion |
| Maps | Leaflet, React-Leaflet |
| HTTP | Axios |
| API | OpenWeatherMap (current + forecast) |
| Tests | Cypress 14 |

---

## 🚀 Getting Started / Installation

### 1. Clone the repo / Cloner le repo

```bash
git clone https://github.com/achrafthedev/climaview.git
cd climaview
```

### 2. Install dependencies / Installer les dépendances

```bash
npm install
```

### 3. Configure environment / Configurer l'environnement

Create a `.env` file at the project root (copy from `.env.example`):

```bash
cp .env.example .env
```

Then add your OpenWeatherMap API key:

```env
REACT_APP_WEATHER_API_KEY=your_openweathermap_api_key_here
```

> 🔑 Get a free API key at [openweathermap.org/api](https://openweathermap.org/api)

### 4. Run locally / Lancer en local

```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

### 5. 🐳 Run with Docker / Lancer avec Docker

> Make sure [Docker](https://www.docker.com/) is installed and running.

**Build the image / Construire l'image :**

```bash
docker build \
  --build-arg REACT_APP_WEATHER_API_KEY=your_api_key_here \
  -t climaview .
```

**Run the container / Lancer le conteneur :**

```bash
docker run -p 8080:80 climaview
```

The app will be available at [http://localhost:8080](http://localhost:8080)

> 🔒 The API key is baked in at **build time** — no `.env` file is needed inside the container.

---

## 🧪 Testing / Tests


This project uses **Cypress** for end-to-end testing.

```bash
# Open Cypress UI / Interface Cypress
npx cypress open

# Run headless / Exécution headless
npx cypress run
```

### Test coverage / Couverture des tests

- ✅ Weather data display after city search
- ✅ Error handling for invalid city names
- ✅ Weather update when switching cities
- ✅ 5-day forecast display
- ✅ Dark mode toggle

---

## 📁 Project Structure / Structure du projet

```
climaview/
├── src/
│   ├── components/
│   │   ├── WeatherDisplay.js    # Current weather card
│   │   ├── ForecastDisplay.js   # 5-day forecast grid
│   │   └── MapComponent.js      # Interactive Leaflet map
│   ├── context/
│   │   ├── ThemeContext.js      # MUI dark/light theme
│   │   └── LanguageContext.js   # FR/EN translations
│   ├── redux/
│   │   ├── store.js
│   │   └── weatherSlice.js      # Async thunks + state
│   ├── services/
│   │   └── weatherAPI.js
│   └── App.js
├── cypress/
│   └── e2e/                    # End-to-end tests
├── .env.example
└── README.md
```

---

## 🔮 Roadmap / Améliorations futures

- [ ] 📍 Geolocation — auto-detect user's current location
- [ ] 📊 Analytics charts — temperature trend graphs (Recharts)
- [ ] ⚡ Caching — avoid redundant API calls
- [ ] 🔔 Weather alerts — push notifications for severe weather
- [ ] 🌍 More languages — Spanish, Arabic...

---

## 📝 Author / Auteur

<div align="center">

**Achraf Chardoudi**

Étudiant HETIC — Concepteur Développeur de Solutions Digitales  
RNCP 36146 · Bloc 3

[![GitHub](https://img.shields.io/badge/GitHub-achrafthedev-181717?style=flat-square&logo=github)](https://github.com/achrafthedev)

</div>

---

## 📄 License / Licence

This project is licensed under the [MIT License](./LICENSE).

Ce projet est sous licence [MIT](./LICENSE).
