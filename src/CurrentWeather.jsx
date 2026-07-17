import React from 'react';

function CurrentWeather({ weatherData }) {
  if (!weatherData) return null;

  return (
    <div className="current-weather">
      <h3 id="city">{weatherData.name.replace(/\s*province/gi, "")} ({weatherData.sys.country})</h3>
      <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt={weatherData.weather[0].description} />
      <p className="temperature">{Math.round(weatherData.main.temp)}°C</p>
      <p className="condition">{weatherData.weather[0].description}</p>
    </div>
  );
}

export default CurrentWeather;