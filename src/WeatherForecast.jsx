import React from 'react';

function WeatherForecast({ forecastData }) {
  if (!forecastData || forecastData.length === 0) return null;

  const getDayName = (dateText) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const date = new Date(dateText);
    return days[date.getDay()];
  };

  return (
    <div className="forecast-area">
      <h4>5-Day Weather Forecast</h4>
      <div className="forecast-cards">
        {forecastData.map((day, index) => (
          <div key={index} className="forecast-card">
            <p className="forecast-day">{getDayName(day.dt_txt)}</p>
            <img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`} alt={day.weather[0].description} />
            <p className="forecast-temp">{Math.round(day.main.temp)}°C</p>
            <p className="forecast-condition">{day.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherForecast;