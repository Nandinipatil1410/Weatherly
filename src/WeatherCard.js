import React from 'react';

const WeatherCard = ({ data }) => {
  const { name: city, main: { temp, humidity }, weather: [{ description, id }] } = data;

  const getWeatherEmoji = (weatherId) => {
    switch (true) {
      case (weatherId >= 200 && weatherId < 300):
        return "☈";
      case (weatherId >= 300 && weatherId < 600):
        return "🌧️";
      case (weatherId >= 600 && weatherId < 700):
        return "❄️";
      case (weatherId >= 700 && weatherId < 800):
        return "🌫️";
      case (weatherId >= 801 && weatherId < 810):
        return "☁️";
      default:
        return "☁️";
    }
  };

  return (
    <div className="weatherCard">
      <h1>{city}</h1>
      <p>{(temp - 273.15).toFixed(1)}°C</p>
      <p>Humidity: {humidity}%</p>
      <p>{description}</p>
      <h1>{getWeatherEmoji(id)}</h1>
    </div>
  );
};

export default WeatherCard;
