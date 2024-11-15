import React, {useState} from "react";
import './App.css'


const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const [error, setError] = useState('');

  const apikey = process.env.REACT_APP_API_KEY;



  const getWeatherData = async (city) => {
    try {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Could not fetch weather data for this city");
      }
      const data = await response.json();
      setWeatherData(data);
      setError('');
    } catch (error) {
      setWeatherData(null);
      setError(error.message);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (city) {
      getWeatherData(city);
    } else {
      setError('Please Enter a City');
    }
  };

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
      case (weatherId === 801 || weatherId === 802):
        return "⛅";
      case (weatherId === 803 || weatherId === 804):
        return "☁️";
      default:
        return "🌤️"; 
    }
  };

  return (
    <div className="app-container">
      <h1>Welcome to Weatherly</h1>
      <form className="weatherForm" onSubmit={handleSubmit}>
        <input
          type="text"
          className="cityInput"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter City"
        />
        <button type="submit">Get Weather</button>
      </form>

      <div className="weatherCard" style={{ display: (weatherData || error) ? 'block' : 'none' }}>
        {error && <p className="error">{error}</p>}
        {weatherData && (
          <div>
            <h1>{weatherData.name}</h1>
            <p>{(weatherData.main.temp - 273.15).toFixed(1)}°C</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <h1>{getWeatherEmoji(weatherData.weather[0].id)}</h1> 
            <p>{weatherData.weather[0].description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;