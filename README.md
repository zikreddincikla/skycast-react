<div align="center">

# SkyCast

**A dark-mode weather app built with React — real-time conditions and a 5-day forecast, powered by the OpenWeatherMap API.**

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![OpenWeatherMap](https://img.shields.io/badge/OpenWeatherMap-API-EB6E4B?style=for-the-badge&logo=openweathermap&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)

[Live Demo](https://skycast-react.vercel.app) · [Report a Bug](https://github.com/zikreddincikla) · [Author](https://github.com/zikreddincikla)

</div>

---

## Overview

SkyCast is a weather forecast app that lets you search any city and instantly see its current conditions along with a 5-day outlook. It's built with React on the front end and talks directly to the OpenWeatherMap API via `axios` — no backend of its own, just a clean UI layered over a solid weather API.

The interface follows a dark, minimal aesthetic: a search bar in the navbar, a hero-style current-conditions card, and a row of forecast cards below it.

> [!TIP]
> The app needs an OpenWeatherMap API key to function. Add it to a `.env` file as `VITE_WEATHER_API_KEY` before running — see [Getting started](#getting-started).

## Features

- **City search** — look up current weather for any city by name
- **Current conditions** — temperature, weather description, and icon for the searched city
- **5-day forecast** — daily forecast cards (day name, icon, temperature, condition)
- **Error handling** — a clear "City not found" message for invalid searches
- **Country-aware display** — city name shown alongside its country code (e.g. `London (GB)`)
- **Responsive forecast grid** — forecast cards wrap and grow to fill the available width
- **Dark theme with hover feedback** — subtle scale and background transitions across navbar, cards, and links
- **SEO-ready markup** — Open Graph and Twitter Card meta tags wired up with a real preview image for link previews

## Tech stack

| Layer | Technology | Notes |
|---|---|---|
| Library | React 19 | Function components, `useState` |
| Build tool | Vite 8 | Dev server + production bundling |
| HTTP client | Axios | Requests to the OpenWeatherMap API |
| Data source | [OpenWeatherMap API](https://openweathermap.org/api) | Current weather + 5 day / 3 hour forecast endpoints |
| Linting | oxlint | `react` + `oxc` plugins, `rules-of-hooks` enforced as an error |
| Styling | CSS3 | Flexbox-based layout, no CSS framework |
| Package manager | npm | — |

## Getting started

You'll need a free API key from [OpenWeatherMap](https://openweathermap.org/api) to run this project.

```bash
git clone https://github.com/zikreddincikla/skycast-react.git
cd skycast-react
npm install
```

Create a `.env` file in the project root and add your API key:

```env
VITE_WEATHER_API_KEY=your_openweathermap_api_key
```

```bash
npm run dev
```

The dev server runs at `http://localhost:5173` by default.

```bash
npm run build     # production build (dist/)
npm run preview   # preview the production build locally
npm run lint       # run oxlint
```

<details>
<summary><b>Project structure</b></summary>

```
skycast-react/
├── image/
│   ├── icon.ico            # Favicon
│   └── image.png            # Open Graph / Twitter Card preview image
├── public/
├── src/
│   ├── App.jsx               # Root component — search state, API calls, layout
│   ├── App.css                # Navbar, cards, and forecast styling
│   ├── CurrentWeather.jsx      # Current conditions card
│   ├── WeatherForecast.jsx      # 5-day forecast cards
│   ├── main.jsx                  # React entry point
│   └── index.css                  # Global styles
├── index.html
├── vite.config.js
└── .oxlintrc.json
```

</details>

<details>
<summary><b>How the data flows</b></summary>

Submitting the search form triggers `handleSearch()` in `App.jsx`, which fires two parallel-in-spirit requests[^1]: one to the `/weather` endpoint for current conditions, and one to the `/forecast` endpoint for the 5-day outlook. The forecast response returns data in 3-hour steps, so it's filtered down to just the `12:00:00` entry per day before being passed to `WeatherForecast`. Both `CurrentWeather` and `WeatherForecast` are presentational components — they render `null` until real data arrives, and have no state or API logic of their own.

[^1]: The two requests are `await`-ed one after another rather than run truly in parallel with `Promise.all` — functionally fine for this use case, but worth knowing if you're optimizing for speed.

</details>

## Author

Built and maintained by **Zikreddin**.

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat-square&logo=github&logoColor=white)](https://github.com/zikreddincikla)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/zikreddin-%C3%A7%C4%B1klasa%C4%9F%C4%B1rc%C4%B1o%C4%9Flu-64667a395/)

## License

Distributed under the MIT License. See `LICENSE` for details.

---

<div align="center">

© 2026 Zikreddin — All rights reserved.

</div>
