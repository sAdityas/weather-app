import React , { useState } from 'react';
import axios from 'axios';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);

    const getWeather = async () => {
        try{
            setError(null);
            const response = await axios.get(`http://localhost:3001/api/weather` , { params: {city} });
            setWeather(response.data);
        }catch(error){
            setWeather(null);
            setError('City not found');
        }
    };

    const getWeatherClass = () => {
        if (!weather) return "default-weather";
        const condition = weather.weather[0].main.toLowerCase();
      
        switch (condition) {
          case "clouds":
            return "cloudy-weather";
          case "rain":
            return "rainy-weather";
          case "clear":
            return "sunny-weather";
          case "snow":
            return "snowy-weather";
          case "thunderstorm":
            return "thunderstorm-weather";
          case "drizzle":
            return "drizzle-weather";
          case "mist":
            return "mist-weather";
          case "smoke":
            return "smoke-weather";
          case "haze":
            return "haze-weather";
          case "dust":
            return "dust-weather";
          case "fog":
            return "fog-weather";
          case "sand":
            return "sand-weather";
          case "ash":
            return "ash-weather";
          case "squall":
            return "squall-weather";
          case "tornado":
            return "tornado-weather";
          default:
            return "default-weather";
        }
      };
      

    return (
        <div className={`{weather-app ${getWeatherClass()}`}>
            <div className='weather-container'>
                <h1>Weather App</h1>

            <input type="text" placeholder='Enter City' value={city} onChange={(e) => setCity(e.target.value)} />
            <button onClick={getWeather} className='weather-button'>Get Weather</button>

            {weather && (
                <div className={`weather-info ${getWeatherClass()}`}>
                    <h2 className="city-name">{weather.name}</h2>
                    <p className="weather-desc">
                    {weather.weather[0].description.charAt(0).toUpperCase() +
                        weather.weather[0].description.slice(1)}
                    </p>
                    <p className="weather-temp">
                    Temperature: {weather.main.temp}°C
                    </p>
                    <p className="weather-humidity">
                    Humidity: {weather.main.humidity}%
                    </p>
                    <p className="weather-wind">
                    Wind Speed: {weather.wind.speed} m/s
                    </p>
                </div>
            )}
            {error && <p className="error-message">{error}</p>}

            </div>
        </div>
    );
}

export default Weather;