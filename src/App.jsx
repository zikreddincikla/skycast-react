import { useState } from 'react'
import './App.css'
import axios from 'axios'
import CurrentWeather from './CurrentWeather'
import WeatherForecast from './WeatherForecast'

function App() {
  const API_KEY = `&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`   
  const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?q="
  const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast?q="
  
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [error, setError] = useState(null);
  const [selectedCity, setSelectedCity] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!selectedCity.trim()) return;

    try {
      const weatherResponse = await axios.get(BASE_URL + selectedCity + API_KEY);
      setWeatherData(weatherResponse.data);

      const forecastResponse = await axios.get(FORECAST_URL + selectedCity + API_KEY);
      const dailyForecasts = forecastResponse.data.list.filter(item => 
        item.dt_txt.includes("12:00:00")
      );
      setForecastData(dailyForecasts);
      setError(null);
    }
    catch (err) {
      setWeatherData(null);
      setForecastData([]);
      setError("City not found");
    }
  }

  return (
    <div className="container">
      <nav id='navbar'>
        <h1 id='author'>Zikreddin</h1>
        <form onSubmit={handleSearch}>
          <input 
            type="text" 
            placeholder='Search city...' 
            value={selectedCity} 
            onChange={(e) => setSelectedCity(e.target.value)}
          />
          <button type='submit'>Search</button>
        </form>
        <ul id="navbar-list">
          <li>
            <a href='https://github.com/zikreddincikla' target='_blank' rel='noopener noreferrer' className='navbar-item'>
              GitHub
            </a>
          </li>
          <li>
            <a href='https://www.linkedin.com/in/zikreddin-%C3%A7%C4%B1klasa%C4%9F%C4%B1rc%C4%B1o%C4%9Flu-64667a395/' target='_blank' rel='noopener noreferrer' className='navbar-item'>
              LinkedIn
            </a>
          </li>
        </ul>
      </nav>
      <main>
        <article>
          <CurrentWeather weatherData={weatherData} />
        </article>
        <article>
          <WeatherForecast forecastData={forecastData} />
        </article>
      </main>

      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
      
      <p id='rights'>&copy; 2026 Zikreddin | All rights reserved</p>
    </div>
  )
}

export default App