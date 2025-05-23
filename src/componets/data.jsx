import React from 'react';

function data({ icon, main, city, temperature, humidity, wind_speed }) {
  return (
    <div className="weather-info">
      <img src={icon} alt="Weather Icon" />
      <h1>{main}</h1>
      <h2>City Name: {city}</h2>
      <p>Temperature: {temperature}°C</p>
      <div className='flex'>
      <div className='items'>
      <img src="https://cdn-icons-png.flaticon.com/512/5664/5664982.png" alt="humidity" />
      <p>Humidity: {humidity}%</p>
      </div>
      <div className='items'>
      <img src="https://cdn-icons-png.flaticon.com/512/1532/1532254.png" alt="wind speed" />
      <p>Wind Speed: {wind_speed} km/h</p>
      </div>
      </div>
    </div>
  );
}

export default data;
