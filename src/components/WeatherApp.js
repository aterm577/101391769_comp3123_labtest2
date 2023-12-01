import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WeatherApp.css'; 

const API_KEY = '9863448114274fb0fee550e233bba350';

const WeatherApp = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState('Toronto');
  const [searchInput, setSearchInput] = useState('Toronto')

  const handleSearch = (e) => {
    e.preventDefault();
    setLocation(searchInput);
  };

  useEffect(() => {
    const API_URL = `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;

    axios.get(API_URL).then((res) => {
      setData(res.data);
    });
  }, [location]);


  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return `${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`;
  };

  const getWeatherIconUrl = (iconCode) => {
    return `http://openweathermap.org/img/wn/${iconCode}.png`;
  };


// WeatherApp.js
return (
    <div className="weather-app-container">

      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter city name"
          defaultValue="Toronto"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
  
      <div className="weather-card">
        <div className="weather-icon">
          {data?.weather[0]?.icon && (
            <img
              src={getWeatherIconUrl(data.weather[0].icon)}
              alt={data.weather[0].description}
            />
          )}

    
          <div className="city-info">
            <div className="city-name">{data?.name}, {data?.sys?.country}</div>
            <div className="date">{formatDate(data?.dt)}</div>
          </div>
        </div>
  

        <div className="temperature-container">
            <div className="temperature-wrapper">
                <div className="temperature">{parseInt(data?.main?.temp)}</div>
                <div className="celsius-icon">°C</div>
            </div>
            <div className="weather-description">{data?.weather[0]?.description}</div>
        </div>
  

        <div className="additional-info">
          <div className="info-item">Visibility: {data?.visibility / 1000} km</div>
          <div className="info-item">Humidity: {data?.main?.humidity}%</div>
          <div className="info-item">Feels Like: {parseInt(data?.main?.feels_like)}°C</div>
          <div className="info-item">Wind Speed: {data?.wind?.speed} m/s</div>
        </div>
      </div>
    </div>
  )
}
export default WeatherApp;  













